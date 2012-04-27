void timeEntryProviderTests() {
  describe('time entry provider model', () {
    WebServiceRequesterMock webServiceRequester = new WebServiceRequesterMock();
    TimeEntryProviderModel model = new TimeEntryProviderModel(webServiceRequester);
    Month fetchedMonth = null;
    void onMonthFetched(Month month) {
      fetchedMonth = month;
    }
    
    webServiceRequester.callOnSuccess = true;
    webServiceRequester.response = """
    {
        "status": "offen",
        "jahr": 2012,
        "zeiten": [
            {
                "taetigkeit": {
                    "id": 1
                },
                "start": "09:00:00",
                "tag": "2012-04-05",
                "ende": "12:00:00",
                "id": 1,
                "kommentar": ""
            },
            {
                "taetigkeit": {
                    "id": 1
                },
                "start": "09:00:00",
                "tag": "2012-04-06",
                "ende": "12:00:00",
                "id": 2,
                "kommentar": ""
            },
            {
                "taetigkeit": {
                    "id": 1
                },
                "start": "09:00:00",
                "tag": "2012-04-07",
                "ende": "12:00:00",
                "id": 3,
                "kommentar": ""
            }
        ],
        "saldo": "-131,00",
        "monat": 4,
        "urlaub": "0,00",
        "ist_arbeitszeit": "9,00",
        "soll_arbeitszeit": "140,00"
    }        
""";
    model.fetchTimeEntries(4, 2012, onMonthFetched, null);
    it('should return a month created from the JSON of the request response', () => expect(fetchedMonth.balance).to(equal(-131)));
    
  });
  
}
