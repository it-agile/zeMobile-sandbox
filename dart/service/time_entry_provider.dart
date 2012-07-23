class TimeEntryProvider {
  final ErrorDisplay errorDisplay;
  final WebServiceRequester webServiceRequester;
  final TimeEntryRepository repository;
  int fetchedMonth;
  int fetchedYear;
  
  TimeEntryProvider(this.errorDisplay, this.repository, this.webServiceRequester);
  
  Future<Month> fetchTimeEntries(int month, int year) {
    fetchedMonth = month;
    fetchedYear = year;
    var requestFuture = webServiceRequester.sendGet('/api/monat/$year/$month/${WebServiceRequester.USER_MARKER}/');
    requestFuture.handleException(errorDisplay.showWebServiceError);
    return requestFuture.transform(_processFetchedMonth);
  }

  Month _processFetchedMonth(String response) {
    repository.importMonthFromJSON(response);
    Month month = repository.loadMonth(fetchedYear, fetchedMonth);
    return month;
  }

  Future<String> save(TimeEntry timeEntry) {
    Map<String, Dynamic> parameters = 
      {'taetigkeit': timeEntry.activityId,
       'tag' : timeEntry.date.toGermanString(),
       'start': timeEntry.start.toString(),
       'ende': timeEntry.end.toString(),
       'kommentar': timeEntry.comment};
    String url = '/api/zeiten/${timeEntry.date.year}/${timeEntry.date.month}/${WebServiceRequester.USER_MARKER}/';
    String method = 'POST';
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
