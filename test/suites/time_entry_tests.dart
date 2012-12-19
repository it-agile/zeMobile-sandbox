part of testSuites;

void timeEntryTests() {
  group('A time entry', () {
    final date1 = const ZeDate(1,2,2010);
    final date2 = const ZeDate(4,2,2010);
    final time1 = const ZeTime(9, 0);
    final time2 = const ZeTime(12, 15);
    final comment1 = 'c1';
    final comment2 = 'c2';
    final timeEntry = new TimeEntry(id: 1, activityId: 2, date: date1, start: time1, end: time2, comment: comment1);

    test('should equal itself', () => expect(timeEntry == timeEntry, isTrue));
    test('should equal a time entry containing the same properties', () =>
      expect(timeEntry == new TimeEntry(id:1, activityId:2, date: date1, start: time1, end: time2, comment: comment1), isTrue));
    test('should not equal null', () =>
      expect(timeEntry == null, isFalse));
    test('should not equal a time entry with a different id', () =>
      expect(timeEntry == new TimeEntry(id:2, activityId:2, date: date1, start: time1, end: time2, comment: comment1), isFalse));
    test('should not equal a time entry with a different activityId', () =>
      expect(timeEntry == new TimeEntry(id:1, activityId:3, date: date1, start: time1, end: time2, comment: comment1), isFalse));
    test('should not equal a time entry with a different date', () =>
      expect(timeEntry == new TimeEntry(id:1, activityId:2, date: date2, start: time1, end: time2, comment: comment1), isFalse));
    test('should not equal a time entry with a different start', () =>
      expect(timeEntry == new TimeEntry(id:1, activityId:2, date: date1, start: time2, end: time2, comment: comment1), isFalse));
    test('should not equal a time entry with a different end', () =>
      expect(timeEntry == new TimeEntry(id:1, activityId:2, date: date1, start: time1, end: time1, comment: comment1), isFalse));
    test('should not equal a time entry with a different comment', () =>
      expect(timeEntry == new TimeEntry(id:1, activityId:2, date: date1, start: time1, end: time2, comment: comment2), isFalse));
    test('should assimilate all data from another time entry except the id', () {
      var assimilator = new TimeEntry(id:3, activityId:7, date: date2, start: time2, end: time1, comment: comment2, currentlyBeingEdited: true);
      assimilator.assimilate(timeEntry);
      expect(assimilator.id, equals(3));
      assimilator.id = 1;
      expect(assimilator, equals(timeEntry));
    });
  });
}
