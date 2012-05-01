typedef void OnMonthFetched(Month fetchedMonth);

class TimeEntryProvider {
  TimeEntryProviderModel model;
  TimeEntryProviderView view;
  
  TimeEntryProvider(this.model, this.view);
  
  void fetchTimeEntries(int month, int year, OnMonthFetched onMonthFetched) {
    model.fetchTimeEntries(month, year, onMonthFetched, (int statusCode, String response) => view.handleError(statusCode, response));
  }    
}

class TimeEntryProviderModel {
  WebServiceRequester webServiceRequester;
  
  TimeEntryProviderModel(this.webServiceRequester);
  
  void fetchTimeEntries(int month, int year, OnMonthFetched onMonthFetched, OnWebServiceRequestFailed onMonthFetchFailed) {
    webServiceRequester.sendGet('/api/monat/$year/$month/${WebServiceRequester.USER_MARKER}/',
      (response) => _processFetchedMonth(response, onMonthFetched), onMonthFetchFailed);  
  }
  
  void _processFetchedMonth(String response, OnMonthFetched onMonthFetched) {
    Month month = new Month(JSON.parse(response));
    if(onMonthFetched != null) {
      onMonthFetched(month);
    }
  }
}

class TimeEntryProviderView {
  void handleError(int statusCode, String response) {
    print('$statusCode : $response');  
  }
}
