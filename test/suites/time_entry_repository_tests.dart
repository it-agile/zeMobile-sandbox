part of testSuites;

void timeEntryRepositoryTests() {
  var storage = window.localStorage;

  group('A time entry repository', () {
    var timeEntryRespository = new TimeEntryRepository();

    setUp(() => storage.clear());

    test("shouldn't initially have the month", () => expect(timeEntryRespository.loadMonth(), isNull));
    group('after importing a month JSON', () {
      var monthJSON = '''
      {
            "status": "offen",
            "jahr": 2012,
            "zeiten": [
                {
                  "taetigkeit": {
                      "id": 3
                  },
                  "start": "09:00:00",
                  "tag": "2012-02-08",
                  "ende": "12:00:00",
                  "id": 1,
                  "kommentar": "bla"
                },
                {
                  "taetigkeit": {
                      "id": 4
                  },
                  "start": "10:15:00",
                  "tag": "2012-02-09",
                  "ende": "13:00:00",
                  "id": 2,
                  "kommentar": "blub"
                }
            ],
            "saldo": "-106,00",
            "monat": 2,
            "urlaub": "8,00",
            "ist_arbeitszeit": "6,25",
            "soll_arbeitszeit": "120,25"
        }
       ''';
      setUp(() {
        timeEntryRespository.importMonthFromJSON(monthJSON);
      });

      test('should have saved the month JSON into local storage', () => expect(storage['monthData'], equals(monthJSON)));
      test('should have saved the number of the month into local storage', () => expect(storage['month'], equals('2')));
      test('should have saved the number of the year into local storage', () => expect(storage['year'], equals('2012')));
      test('should have the month after importing it', () => expect(timeEntryRespository.hasMonth(2, 2012), isTrue));
      test('should have another month after importing the new month', () => expect(timeEntryRespository.hasMonth(1, 2012), isFalse));
      test('should extract the month from the JSON', () {
        var expectedTimeEntry1 = new TimeEntry(id: 1, activityId: 3, date: new ZeDate(8,2,2012), start: new ZeTime(9,0),   end: new ZeTime(12,0), comment: 'bla');
        var expectedTimeEntry2 = new TimeEntry(id: 2, activityId: 4, date: new ZeDate(9,2,2012), start: new ZeTime(10,15), end: new ZeTime(13,0), comment: 'blub');
        var expectedMonth = new Month(year: 2012, month: 2, balance: -106.0, vacation: 8.0, hoursWorked: 6.25, hoursToWork: 120.25, timeEntries: [expectedTimeEntry1, expectedTimeEntry2]);
        expect(timeEntryRespository.loadMonth(), equals(expectedMonth));
      });
    });

    group('saving a month', () {
      var month = null;
      setUp(() {
        storage.clear();
        var timeEntry = new TimeEntry(id: 42, activityId: 3, date: new ZeDate(2,2,2012),
          start: new ZeTime(9,30), end: new ZeTime(12,40), comment: 'comment', currentlyBeingEdited: true);
        month = new Month(year:2012, month:2, balance:2, vacation: 3, hoursWorked: 5, hoursToWork: 7, timeEntries: [timeEntry]);

        timeEntryRespository.saveMonth(month);
      });

      test('should be able to load it again', () => expect(timeEntryRespository.loadMonth(), equals(month)));
    });
  });

  group('A time entry repository remembering changed time entries', () {
    var timeEntryRespository = new TimeEntryRepository();
    var timeEntry = null;

    setUp(() {
      storage.clear();
      timeEntry = new TimeEntry(id: 42, activityId: 3, date: new ZeDate(2,2,2012),
                                    start: new ZeTime(9,30), end: new ZeTime(12,40),
                                    comment: 'comment', currentlyBeingEdited: true);
    });

    test('should serialize a time entry into a string and deserialize it from the string', () {
      var serializedTimeEntry = timeEntryRespository.serializeTimeEntry(timeEntry);
      var deserializedTimeEntry = timeEntryRespository.deserializeTimeEntry(serializedTimeEntry);
      expect(deserializedTimeEntry, equals(timeEntry));
    });
    test('should remember a changed time entry in a free slot for the day of the time entry', () {
      storage['2012-02-02-1'] = 'some other entry';
      timeEntryRespository.rememberChangedTimeEntry(timeEntry);
      expect(storage['2012-02-02-2'], isNotNull);
    });
    test('should return the previously remembered time entry for the given day', () {
      timeEntryRespository.rememberChangedTimeEntry(timeEntry);
      expect(timeEntryRespository.changedTimeEntries(timeEntry.date), contains(timeEntry));
    });
    test('should return the previously remembered time entry for the given month', () {
      storage['month'] = '2';
      storage['year'] = '2012';
      timeEntryRespository.rememberChangedTimeEntry(timeEntry);
      expect(timeEntryRespository.changedTimeEntriesForMonth(), contains(timeEntry));
    });
    test('should set the id of the change slot on the original remembered time entry', () {
      timeEntryRespository.rememberChangedTimeEntry(timeEntry);
      expect(timeEntry.changeSlot, equals('2012-02-02-1'));
    });
    test('should set the id of the change slot on a loaded remembered time entry', () {
      timeEntryRespository.rememberChangedTimeEntry(timeEntry);
      expect(timeEntryRespository.changedTimeEntries(timeEntry.date)[0].changeSlot, equals('2012-02-02-1'));
    });
    test('should remember a the time entry at the change slot of the time entry if one is defined', () {
      timeEntry.changeSlot = '2012-02-02-7';
      timeEntryRespository.rememberChangedTimeEntry(timeEntry);
      expect(storage['2012-02-02-7'], isNotNull);
    });
    test('should remove the serialized time entry from the storage upon when told to remove it', () {
      storage['2012-02-02-7'] = 'some entry';
      timeEntry.changeSlot = '2012-02-02-7';
      timeEntryRespository.removeChangedTimeEntry(timeEntry);
      expect(storage['2012-02-02-7'], isNull);
    });
    test('should have no changed time entries if no where added', () {
      storage['month'] = '2';
      storage['year'] = '2012';
      expect(timeEntryRespository.hasChangedTimeEntriesForMonth(), isFalse);
    });
    test('should have changed time entries if one was added', () {
      storage['month'] = '2';
      storage['year'] = '2012';
      timeEntryRespository.rememberChangedTimeEntry(timeEntry);
      expect(timeEntryRespository.hasChangedTimeEntriesForMonth(), isTrue);
    });
    test('should remove all changed entries for a month', () {
      storage['month'] = '2';
      storage['year'] = '2012';
      timeEntryRespository.rememberChangedTimeEntry(timeEntry);
      timeEntry.changeSlot = null;
      timeEntryRespository.rememberChangedTimeEntry(timeEntry);
      timeEntryRespository.removeAllChangedTimeEntriesForMonth();
      expect(timeEntryRespository.hasChangedTimeEntriesForMonth(), isFalse);
    });
  });
}