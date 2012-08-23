class TimeEntryProvider {
  final ErrorDisplay errorDisplay;
  final WebServiceRequester webServiceRequester;
  final TimeEntryRepository repository;

  TimeEntryProvider(this.errorDisplay, this.repository, this.webServiceRequester);
  
  Future<Month> fetchTimeEntries(int month, int year) {
    if (repository.hasMonth(month, year)) {
      var loadedMonth = repository.loadMonth();
      _mergeChangesIntoLoadedMonth(loadedMonth);
      return new Future.immediate(loadedMonth);
    } else {
      return refetchTimeEntries(month, year);
    }
  }

  Future<Month> refetchTimeEntries(int month, int year) {
    var requestFuture = webServiceRequester.sendGet('/api/monat/$year/$month/${WebServiceRequester.USER_MARKER}/');
    requestFuture.handleException(errorDisplay.showWebServiceError);
    return requestFuture.transform(_processFetchedMonth);
  }

  void _mergeChangesIntoLoadedMonth(Month loadedMonth) {
    var changedEntries = repository.changedTimeEntriesForMonth();
    var timeEntries = loadedMonth.timeEntries != null ? loadedMonth.timeEntries : [];
    timeEntries.forEach((entry) {
      var matchingEntries = changedEntries.filter((changedEntry) => changedEntry.id == entry.id);
      if (!matchingEntries.isEmpty()) {
        entry.assimilate(matchingEntries[0]);
        changedEntries.removeRange(changedEntries.indexOf(matchingEntries[0]), 1);
      }
    });
    timeEntries.addAll(changedEntries);
    loadedMonth.timeEntries = timeEntries;
  }

  Month _processFetchedMonth(String response) {
    repository.importMonthFromJSON(response);
    var month = repository.loadMonth();
    _removeObsoleteChangedEntries(month);
    _mergeChangesIntoLoadedMonth(month);
    return month;
  }

  void _removeObsoleteChangedEntries(Month month) {
    repository.changedTimeEntriesForMonth().forEach((entry) {
      if (!entry.currentlyBeingEdited && entry.id != null
        || !month.timeEntries.some((fetchedEntry) => fetchedEntry.id == entry.id)) {
        repository.removeChangedTimeEntry(entry);
      }
    });
  }

  void rememberChangedTimeEntry(TimeEntry entry) {
    repository.rememberChangedTimeEntry(entry);
  }

  void revertChanges(TimeEntry entry) {
    repository.removeChangedTimeEntry(entry);

    var loadedMonth = repository.loadMonth();
    _mergeChangesIntoLoadedMonth(loadedMonth);
    // TODO Event für die Aktualisierung abfeuern
  }

  Future<String> save(TimeEntry timeEntry) {
    var parameters =
      {'taetigkeit': timeEntry.activityId,
       'tag' : timeEntry.date.toGermanString(),
       'start': timeEntry.start.toString(),
       'ende': timeEntry.end.toString(),
       'kommentar': timeEntry.comment};
    var url = '/api/zeiten/${timeEntry.date.year}/${timeEntry.date.month}/${WebServiceRequester.USER_MARKER}/';
    var method = 'POST';
    if (timeEntry.id != null) {
      url = '$url${timeEntry.id}/';
      method = 'PUT';
    }

    var requestFuture =  webServiceRequester.sendRequest(method, url, parameters);
    requestFuture.handleException(errorDisplay.showWebServiceError);

    return requestFuture.transform((response) => _handleSaveSuccess(timeEntry, response));
  }

  Future<String> delete(TimeEntry timeEntry) {
    var requestFuture =  webServiceRequester.sendRequest('DELETE',
      '/api/zeiten/${timeEntry.date.year}/${timeEntry.date.month}/${WebServiceRequester.USER_MARKER}/${timeEntry.id}/');
    requestFuture.handleException(errorDisplay.showWebServiceError);

    return requestFuture.transform((response) => _handleDeleteSuccess(timeEntry, response));
  }

  String _handleSaveSuccess(TimeEntry entry, String response) {
    var responseJSON = JSON.parse(response);
    var month = repository.loadMonth();

    if (entry.id == null) {
      String url = responseJSON['url'];
      var idString = url.substring(0, url.length -1);
      idString = idString.substring(idString.lastIndexOf('/') + 1);
      entry.id = parseInt(idString);
      entry.currentlyBeingEdited = false;
      month.timeEntries.add(entry);
    } else {
      month.timeEntries.filter((te) => te.id == entry.id).forEach((te) => te.assimilate(entry));
    }

    repository.saveMonth(month);

    return responseJSON['message'];
  }

  String _handleDeleteSuccess(TimeEntry entry, String response) {
    var responseJSON = JSON.parse(response);
    var month = repository.loadMonth();

    month.timeEntries = month.timeEntries.filter((te) => te.id != entry.id);

    repository.saveMonth(month);

    return responseJSON['message'];
  }
}
