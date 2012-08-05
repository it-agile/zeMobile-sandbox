void timeEntryProviderTests() {
  var errorDisplay = new ErrorDisplayMock();
  var webServiceRequester = new WebServiceRequesterMock();
  var timeEntryRepository = new TimeEntryRepositoryMock();
  var timeEntryProvider = new TimeEntryProvider(errorDisplay, timeEntryRepository, webServiceRequester);
  group('A time entry provider fetching a new month', () {

    setUp(() {
      clearMocks([errorDisplay, webServiceRequester, timeEntryRepository]);
      timeEntryRepository.when(callsTo('hasMonth', 4, 2012)).thenReturn(false);
      webServiceRequester.when(callsTo('sendGet')).thenReturn(new Future.immediate('resultJSON'));
    });

    test('should import the JSON into the repository', () {
      timeEntryProvider.fetchTimeEntries(4, 2012);
      timeEntryRepository.getLogs(callsTo('importMonthFromJSON', 'resultJSON')).verify(happenedOnce);
    });

    test('should return the month loaded from the repository', () {
      var month = new Month();
      timeEntryRepository.when(callsTo('loadMonth')).thenReturn(month);
      var timeEntryFuture = timeEntryProvider.fetchTimeEntries(4, 2012);
      expect(timeEntryFuture.value, same(month));
    });
  });

  group('A time entry provider fetching an existing month', () {
    setUp(() {
      clearMocks([errorDisplay, webServiceRequester, timeEntryRepository]);
      timeEntryRepository.when(callsTo('hasMonth', 4, 2012)).thenReturn(true);
    });

    test('should return the month loaded from the repository if it is not already cached', () {
      var month = new Month();
      timeEntryProvider.cachedMonth = null;
      timeEntryRepository.when(callsTo('loadMonth')).thenReturn(month);
      var timeEntryFuture = timeEntryProvider.fetchTimeEntries(4, 2012);
      expect(timeEntryFuture.value, same(month));
    });

    test('should return the cached month if it exists', () {
      var month = new Month();
      timeEntryProvider.cachedMonth = month;
      var timeEntryFuture = timeEntryProvider.fetchTimeEntries(4, 2012);
      expect(timeEntryFuture.value, same(month));
    });

  });

  group('A time entry provider', () {
    var timeEntry = null;
    var expectedParameters =
      {'taetigkeit': 3,
       'tag' : '02.10.2012',
       'start': '09:00',
       'ende': '12:00',
       'kommentar': 'test'};
    setUp(() {
      clearMocks([errorDisplay, webServiceRequester, timeEntryRepository]);
      timeEntry = new TimeEntry(1, 3, new ZeDate(2,10,2012), new ZeTime(9,0), new ZeTime(12,0), 'test');
      webServiceRequester.when(callsTo('sendRequest')).thenReturn(new Future.immediate('test'));
    });

    test('should save a new time entry by posting it on the correct url', () {
      timeEntry.id = null;
      timeEntryProvider.save(timeEntry);

      var expectedUrl = '/api/zeiten/2012/10/${WebServiceRequester.USER_MARKER}/';
      webServiceRequester.getLogs(callsTo('sendRequest', 'POST', expectedUrl, expectedParameters)).verify(happenedOnce);
    });

    test('should save a changed time entry by putting it on the correct url', () {
      timeEntryProvider.save(timeEntry);

      var expectedUrl = '/api/zeiten/2012/10/${WebServiceRequester.USER_MARKER}/1/';
      webServiceRequester.getLogs(callsTo('sendRequest', 'PUT', expectedUrl, expectedParameters)).verify(happenedOnce);
    });

    test('should delete a time entry by deleting it on the correct url', () {
      timeEntryProvider.delete(timeEntry);

      var expectedUrl = '/api/zeiten/2012/10/${WebServiceRequester.USER_MARKER}/1/';
      webServiceRequester.getLogs(callsTo('sendRequest', 'DELETE', expectedUrl)).verify(happenedOnce);
    });

  });
  
}
