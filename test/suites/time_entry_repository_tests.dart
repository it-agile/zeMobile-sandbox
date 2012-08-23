void timeEntryRepositoryTests() {
  var storage = document.window.localStorage;

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
        var expectedTimeEntry1 = new TimeEntry(1, 3, new ZeDate(8,2,2012), new ZeTime(9,0), new ZeTime(12,0), 'bla');
        var expectedTimeEntry2 = new TimeEntry(2, 4, new ZeDate(9,2,2012), new ZeTime(10,15), new ZeTime(13,0), 'blub');
        var expectedMonth = new Month(2012, 2, -106.0, 8.0, 6.25, 120.25, [expectedTimeEntry1, expectedTimeEntry2]);
        expect(timeEntryRespository.loadMonth(), equals(expectedMonth));
      });
    });

    group('saving a month', () {
      var month = null;
      setUp(() {
        storage.clear();
        var timeEntry = new TimeEntry(42, 3, new ZeDate(2,2,2012),
          new ZeTime(9,30), new ZeTime(12,40), 'comment', true);
        month = new Month(2012, 2, 2, 3, 5, 7, [timeEntry]);

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
      timeEntry = new TimeEntry(42, 3, new ZeDate(2,2,2012),
        new ZeTime(9,30), new ZeTime(12,40), 'comment', true);
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
  });
}