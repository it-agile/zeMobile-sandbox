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

      test('should have saved the month JSON into local storage', () => expect(storage['month'], equals(monthJSON)));
      test('should have saved the description of the month into local storage', () => expect(storage['monthDesc'], equals('20122')));
      test('should have the month after importing it', () => expect(timeEntryRespository.hasMonth(2, 2012), isTrue));
      test('should have another month after importing the new month', () => expect(timeEntryRespository.hasMonth(1, 2012), isFalse));
      test('should extract the month from the JSON', () {
        var expectedTimeEntry1 = new TimeEntry(1, 3, new ZeDate(8,2,2012), new ZeTime(9,0), new ZeTime(12,0), 'bla');
        var expectedTimeEntry2 = new TimeEntry(2, 4, new ZeDate(9,2,2012), new ZeTime(10,15), new ZeTime(13,0), 'blub');
        var expectedMonth = new Month(2012, 2, -106.0, 8.0, 6.25, 120.25, [expectedTimeEntry1, expectedTimeEntry2]);
        expect(timeEntryRespository.loadMonth(), equals(expectedMonth));
      });
    });
  });

}