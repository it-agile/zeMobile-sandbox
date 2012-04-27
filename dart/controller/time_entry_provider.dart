typedef void OnMonthFetched(Month fetchedMonth);

class TimeEntryProvider {
    
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
  
}
