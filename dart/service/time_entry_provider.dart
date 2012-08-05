class TimeEntryProvider {
  final ErrorDisplay errorDisplay;
  final WebServiceRequester webServiceRequester;
  final TimeEntryRepository repository;
  Month cachedMonth = null;

  TimeEntryProvider(this.errorDisplay, this.repository, this.webServiceRequester);
  
  Future<Month> fetchTimeEntries(int month, int year) {
    if (repository.hasMonth(month, year)) {
      return new Future.immediate(cachedMonth != null ? cachedMonth : repository.loadMonth());
    } else {
      return refetchTimeEntries(month, year);
    }
  }

  Future<Month> refetchTimeEntries(int month, int year) {
    var requestFuture = webServiceRequester.sendGet('/api/monat/$year/$month/${WebServiceRequester.USER_MARKER}/');
    requestFuture.handleException(errorDisplay.showWebServiceError);
    return requestFuture.transform(_processFetchedMonth);
  }

  Month _processFetchedMonth(String response) {
    repository.importMonthFromJSON(response);
    var month = repository.loadMonth();
    cachedMonth = month;
    return month;
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

    return requestFuture;
  }

  Future<String> delete(TimeEntry timeEntry) {
    var requestFuture =  webServiceRequester.sendRequest('DELETE',
      '/api/zeiten/${timeEntry.date.year}/${timeEntry.date.month}/${WebServiceRequester.USER_MARKER}/${timeEntry.id}/');
    requestFuture.handleException(errorDisplay.showWebServiceError);

    return requestFuture;
  }
}
