void timeEntryProviderTests() {
  group('time entry provider when fetching a month', () {
    var errorDisplay = new ErrorDisplayMock();
    var webServiceRequester = new WebServiceRequesterMock();
    var timeEntryRepository = new TimeEntryRepositoryMock();
    var timeEntryProvider = new TimeEntryProvider(errorDisplay, timeEntryRepository, webServiceRequester);

    setUp(() => webServiceRequester.when(callsTo('sendGet')).thenReturn(new Future.immediate('resultJSON')));

    test('should import the JSON into the repository', () {
      timeEntryProvider.fetchTimeEntries(4, 2012);
      timeEntryRepository.getLogs(callsTo('importMonthFromJSON', 'resultJSON')).verify(happenedOnce);
    });

    test('should return the month loaded from the repository', () {
      var month = new Month();
      timeEntryRepository.when(callsTo('loadMonth', 2012, 4)).thenReturn(month);
      var timeEntryFuture = timeEntryProvider.fetchTimeEntries(4, 2012);
      expect(timeEntryFuture.value, same(month));
    });
  });
  
}
