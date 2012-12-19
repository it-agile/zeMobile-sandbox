part of testSuites;

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
      timeEntryRepository.when(callsTo('changedTimeEntriesForMonth')).thenReturn([]);
    });

    test('should import the JSON into the repository', () {
      timeEntryProvider.fetchTimeEntries(4, 2012);
      timeEntryRepository.getLogs(callsTo('importMonthFromJSON', 'resultJSON')).verify(happenedOnce);
    });

    test('should return the month loaded from the repository', () {
      var month = new Month();
      timeEntryRepository.when(callsTo('loadMonth')).thenReturn(month);
      timeEntryRepository.when(callsTo('changedTimeEntriesForMonth')).thenReturn([]);
      var timeEntryFuture = timeEntryProvider.fetchTimeEntries(4, 2012);
      expect(timeEntryFuture.value, same(month));
    });

    test('should remove saved changed time entries from previously loaded month', () {
      timeEntryProvider.fetchTimeEntries(4, 2012);
      timeEntryRepository.getLogs(callsTo('removeAllChangedTimeEntriesForMonth')).verify(happenedOnce);
    });
  });

  group('A time entry provider fetching an existing month', () {
    setUp(() {
      clearMocks([errorDisplay, webServiceRequester, timeEntryRepository]);
    });

    test('should return the month loaded from the repository', () {
      timeEntryRepository.when(callsTo('hasMonth', 4, 2012)).thenReturn(true);
      var month = new Month(year: 2012, month: 4);
      timeEntryRepository.when(callsTo('loadMonth')).thenReturn(month);
      timeEntryRepository.when(callsTo('changedTimeEntriesForMonth')).thenReturn([]);
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
      timeEntry = new TimeEntry(id: 1, activityId: 3, date: new ZeDate(2,10,2012), start: new ZeTime(9,0), end: new ZeTime(12,0), comment: 'test');
      webServiceRequester.when(callsTo('sendRequest')).thenReturn(new Future.immediate('{"url":"test/1/", "message":"OK"}'));
    });

    test('should save a new time entry by posting it on the correct url', () {
      timeEntry.id = null;
      timeEntryProvider.save(timeEntry);

      var expectedUrl = '/api/zeiten/2012/10/${WebServiceRequester.USER_MARKER}/';
      webServiceRequester.getLogs(callsTo('sendRequest', 'POST', expectedUrl, expectedParameters)).verify(happenedOnce);
    });

    test('should add the saved time entry to the month and save the month', () {
      timeEntry.id = null;
      var month = new Month(timeEntries: []);
      timeEntryRepository.when(callsTo('loadMonth')).thenReturn(month);

      timeEntryProvider.save(timeEntry).value;

      expect(month.timeEntries, equals([timeEntry]));
      timeEntryRepository.getLogs(callsTo('saveMonth')).verify(happenedOnce);
    });

    test('should assimilate the changed time entry into the month and save the month', () {
      var oldEntry = new TimeEntry(id:1);
      var month = new Month(timeEntries: [oldEntry]);
      timeEntryRepository.when(callsTo('loadMonth')).thenReturn(month);

      timeEntryProvider.save(timeEntry).value;

      expect(month.timeEntries, equals([timeEntry]));
      timeEntryRepository.getLogs(callsTo('saveMonth')).verify(happenedOnce);
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

    test('should delete the time entry in the month and save the month', () {
      var month = new Month(timeEntries: [timeEntry]);
      timeEntryRepository.when(callsTo('loadMonth')).thenReturn(month);

      timeEntryProvider.delete(timeEntry).value;

      expect(month.timeEntries, isEmpty);
      timeEntryRepository.getLogs(callsTo('saveMonth')).verify(happenedOnce);
    });
  });

  group('A time entry provider', () {
    TimeEntry timeEntry = null;
    setUp(() {
      clearMocks([errorDisplay, webServiceRequester, timeEntryRepository]);
      timeEntry = new TimeEntry(id: 1, activityId: 3, date: new ZeDate(2,10,2012), start: new ZeTime(9,0), end: new ZeTime(12,0), comment:'test', currentlyBeingEdited:true);
    });

    test('should pass a changed time entry to be remembered to the repository', () {
      timeEntryProvider.rememberChangedTimeEntry(timeEntry);
      timeEntryRepository.getLogs(callsTo('rememberChangedTimeEntry', timeEntry)).verify(happenedOnce);
    });
    test('should substitute fetched entries with changed entries where available and add new entries', () {
      timeEntryRepository.when(callsTo('hasMonth', 10, 2012)).thenReturn(true);
      var otherOldTimeEntry = new TimeEntry(id: 2);
      timeEntryRepository.when(callsTo('loadMonth')).thenReturn(new Month(year: 2012, month: 10, timeEntries: [timeEntry, otherOldTimeEntry]));
      var changedTimeEntry = new TimeEntry(id: 1, activityId: 8, date: new ZeDate(2,10,2012), start: new ZeTime(9,0), end: new ZeTime(12,0), comment: 'test', currentlyBeingEdited: true);
      var newTimeEntry = new TimeEntry(activityId: 8);
      timeEntryRepository.when(callsTo('changedTimeEntriesForMonth')).thenReturn([changedTimeEntry, newTimeEntry]);

      var month = timeEntryProvider.fetchTimeEntries(10,2012).value;

      expect(month.timeEntries, equals([changedTimeEntry, otherOldTimeEntry, newTimeEntry]));
    });
  });

  group('A time entry provider refetching a month', () {
    TimeEntry timeEntry = null;
    TimeEntry otherOldTimeEntry = null;
    TimeEntry editedTimeEntry = null;
    TimeEntry notEditedTimeEntry = null;
    TimeEntry noLongerExistingEntry = null;
    TimeEntry newEntry = null;
    Month processedMonth = null;

    setUp(() {
      clearMocks([errorDisplay, webServiceRequester, timeEntryRepository]);

      timeEntry = new TimeEntry(id: 1, activityId: 3, date: new ZeDate(2,10,2012), start: new ZeTime(9,0), end: new ZeTime(12,0), comment: 'test', currentlyBeingEdited: true);
      otherOldTimeEntry = new TimeEntry(id: 2);
      editedTimeEntry = new TimeEntry(id: 1, currentlyBeingEdited: true);
      notEditedTimeEntry = new TimeEntry(id: 2, currentlyBeingEdited: false);
      noLongerExistingEntry = new TimeEntry(id: 3, currentlyBeingEdited: true);
      newEntry = new TimeEntry(currentlyBeingEdited: true);

      webServiceRequester.when(callsTo('sendGet')).thenReturn(new Future.immediate('resultJSON'));
      timeEntryRepository.when(callsTo('loadMonth')).thenReturn(new Month(year: 2012, month: 10, timeEntries: [timeEntry, otherOldTimeEntry]));
      timeEntryRepository.when(callsTo('changedTimeEntriesForMonth')).thenReturn([editedTimeEntry,
        notEditedTimeEntry, noLongerExistingEntry, newEntry]);
      timeEntryRepository.when(callsTo('changedTimeEntriesForMonth')).thenReturn([editedTimeEntry, newEntry]);
      processedMonth = timeEntryProvider.refetchTimeEntries(10, 2012).value;
    });

    test('should remove changed entries currently not being edited', () =>
      timeEntryRepository.getLogs(callsTo('removeChangedTimeEntry', notEditedTimeEntry)).verify(happenedOnce));
    test('should remove changed entries no longer existing in the fetched month', () =>
      timeEntryRepository.getLogs(callsTo('removeChangedTimeEntry', noLongerExistingEntry)).verify(happenedOnce));
    test('should substitute changed entries and add new entries to the fetched month', () =>
      expect(processedMonth.timeEntries, equals([editedTimeEntry, otherOldTimeEntry, newEntry])));
  });
  
}
