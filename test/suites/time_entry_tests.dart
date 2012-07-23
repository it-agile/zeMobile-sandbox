void timeEntryTests() {
  group('A time entry', () {
    final date1 = const ZeDate(1,2,2010);
    final date2 = const ZeDate(4,2,2010);
    final time1 = const ZeTime(9, 0);
    final time2 = const ZeTime(12, 15);
    final comment1 = 'c1';
    final comment2 = 'c2';
    final timeEntry = new TimeEntry(1, 2, date1, time1, time2, comment1);
    
    test('should equal itself', () => expect(timeEntry == timeEntry, isTrue));
    test('should equal a time entry containing the same properties', () =>
      expect(timeEntry == new TimeEntry(1, 2, date1, time1, time2, comment1), isTrue));
    test('should not equal null', () =>
      expect(timeEntry == null, isFalse));
    test('should not equal a time entry with a different id', () =>
      expect(timeEntry == new TimeEntry(2, 2, date1, time1, time2, comment1), isFalse));
    test('should not equal a time entry with a different activityId', () =>
      expect(timeEntry == new TimeEntry(1, 3, date1, time1, time2, comment1), isFalse));
    test('should not equal a time entry with a different date', () =>
      expect(timeEntry == new TimeEntry(1, 2, date2, time1, time2, comment1), isFalse));
    test('should not equal a time entry with a different start', () =>
      expect(timeEntry == new TimeEntry(1, 2, date1, time2, time2, comment1), isFalse));
    test('should not equal a time entry with a different end', () =>
      expect(timeEntry == new TimeEntry(1, 2, date1, time1, time1, comment1), isFalse));
    test('should not equal a time entry with a different comment', () =>
      expect(timeEntry == new TimeEntry(1, 2, date1, time1, time2, comment2), isFalse));
  });
}
