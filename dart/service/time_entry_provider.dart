typedef void OnMonthFetched(Month fetchedMonth);

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
}
