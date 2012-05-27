typedef void OnMonthFetched(Month fetchedMonth);
typedef void OnActionSucceeded();

class TimeEntryProvider {
  ErrorDisplay errorDisplay;
  WebServiceRequester webServiceRequester;
  
  TimeEntryProvider(this.errorDisplay, this.webServiceRequester);
  
  void fetchTimeEntries(int month, int year, OnMonthFetched onMonthFetched) {
    webServiceRequester.sendGet('/api/monat/$year/$month/${WebServiceRequester.USER_MARKER}/',
      (response) => _processFetchedMonth(response, onMonthFetched), 
      (int statusCode, String response) => errorDisplay.showWebServiceError(statusCode, response));  
  }
  
  void _processFetchedMonth(String response, OnMonthFetched onMonthFetched) {
    Month month = new Month(JSON.parse(response));
    if(onMonthFetched != null) {
      onMonthFetched(month);
    }
  }
  
  void save(TimeEntry timeEntry, OnActionSucceeded onSuccess) {
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
    webServiceRequester.sendRequest(method, url, parameters, 
      (response) {print(response); onSuccess();}, 
      (int statusCode, String response) => errorDisplay.showWebServiceError(statusCode, response));
    
  }
  
  void delete(TimeEntry timeEntry, OnActionSucceeded onSuccess) {
    webServiceRequester.sendRequest('DELETE', '/api/zeiten/${timeEntry.date.year}/${timeEntry.date.month}/${WebServiceRequester.USER_MARKER}/${timeEntry.id}/', null, 
      (response) {print(response); onSuccess();}, 
      (int statusCode, String response) => errorDisplay.showWebServiceError(statusCode, response));
  }
}
