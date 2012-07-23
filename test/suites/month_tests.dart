void monthTests() {
  final timeEntry1 = new TimeEntry(1,2, new ZeDate(1,2,2012), new ZeTime(9,0), new ZeTime(12,0), 'c1');
  final timeEntry2 = new TimeEntry(1,2, new ZeDate(1,5,2012), new ZeTime(9,0), new ZeTime(12,0), 'c2');
  group('A month', () {
    final month = new Month(2012, 2, 10.5, 12, 108, 40, [timeEntry1]);
    
    test('should equal itself', () =>  expect(month == month, isTrue));
    test('should equal a month with the same properties', () =>
      expect(month == new Month(2012, 2, 10.5, 12, 108, 40, [timeEntry1]), isTrue));
    test('should not equal null', () =>
      expect(month == null, isFalse));
    test('should not equal a month with a different year', () =>
      expect(month == new Month(2011, 2, 10.5, 12, 108, 40, [timeEntry1]), isFalse));
    test('should not equal a month with a different month', () =>
      expect(month == new Month(2012, 3, 10.5, 12, 108, 40, [timeEntry1]), isFalse));
    test('should not equal a month with a different balance', () =>
      expect(month == new Month(2012, 2, 12.5, 12, 108, 40, [timeEntry1]), isFalse));
    test('should not equal a month with different vacation', () =>
      expect(month == new Month(2012, 2, 10.5, 14, 108, 40, [timeEntry1]), isFalse));
    test('should not equal a month with different hoursWorked', () =>
      expect(month == new Month(2012, 2, 10.5, 12, 140, 40, [timeEntry1]), isFalse));
    test('should not equal a month with a different hoursToWork', () =>
      expect(month == new Month(2012, 2, 10.5, 12, 108, 50, [timeEntry1]), isFalse));
    test('should not equal a month with no time entries', () =>
      expect(month == new Month(2012, 2, 10.5, 12, 108, 40, null), isFalse));
    test('should not equal a month with a different time entry', () =>
      expect(month == new Month(2012, 2, 10.5, 12, 108, 40, [timeEntry2]), isFalse));
    test('should not equal a month with an additional time entry', () =>
      expect(month == new Month(2012, 2, 10.5, 12, 108, 40, [timeEntry1, timeEntry2]), isFalse));
    test('should return all time entries for a date', () =>
      expect(month.timeEntriesFor(new ZeDate(1,2,2012)), contains(timeEntry1)));
  });

  group('A month when asked for the time entries on a specified date', () {
    final month = new Month(2012, 2, 10.5, 12, 108, 40, [timeEntry1, timeEntry2]);
    test('should return a list containing all time entries  on that date', () =>
      expect(month.timeEntriesFor(new ZeDate(1,2,2012)), contains(timeEntry1)));
    test('should return a list with no other entries', () =>
      expect(month.timeEntriesFor(new ZeDate(1,2,2012)).length, equals(1)));
    test('should return an empty list if no time entries on that date exist', () =>
      expect(month.timeEntriesFor(new ZeDate(3,2,2012)), isEmpty));
  });
}
