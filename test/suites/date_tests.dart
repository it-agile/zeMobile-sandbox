void dateTests() {
  group('A ze date based on a string', () {
    var date = new ZeDate.fromString('2012-11-03');
    
    test('should extract the day from the string', () => expect(date.day, equals(3)));
    test('should extract the month from the string', () => expect(date.month, equals(11)));
    test('should extract the year from the string', () => expect(date.year, equals(2012)));
    test('should equal the same date created from 3 ints', () => expect(date, equals(new ZeDate(3, 11, 2012))));
  });
  
  group('A ze date based on a german string', () {
    var date = new ZeDate.fromGermanString('03.11.2012');
    
    test('should extract the day from the string', () => expect(date.day, equals(3)));
    test('should extract the month from the string', () => expect(date.month, equals(11)));
    test('should extract the year from the string', () => expect(date.year, equals(2012)));
    test('should equal the same date created from 3 ints', () => expect(date, equals(new ZeDate(3, 11, 2012))));
  });
  
  group('A ze date based on parameters for the three components', () {
    var date = new ZeDate(1,2,2012);
    
    test('should have the correct string representation', () => expect(date.toString(), equals('2012-02-01')));
    test('should have the correct german string representation', () => expect(date.toGermanString(), equals('01.02.2012')));
  });
  
  group('Calling nextDay() on a ze date', () {
    test('should return 2012-02-29 for 2012-02-28', () =>
      expect(new ZeDate.fromString('2012-02-28').nextDay().toString(), equals('2012-02-29')));
    test('should return 2011-03-01 for 2011-02-28', () =>
      expect(new ZeDate.fromString('2011-02-28').nextDay().toString(), equals('2011-03-01')));
    test('should return 2011-03-02 for 2011-03-01', () =>
      expect(new ZeDate.fromString('2011-03-01').nextDay().toString(), equals('2011-03-02')));
  });

  group('A ze date', () {
    var date = new ZeDate(14,2,2012);

    test('should return the first day of its month', () => expect(date.firstOfMonth(), equals(new ZeDate(1,2,2012))));
    test('should return the first day of the month before its month', () =>
      expect(date.firstOfPreviousMonth(), equals(new ZeDate(1,1,2012))));
    test('should return the next day', () =>
      expect(date.nextDay(), equals(new ZeDate(15,2,2012))));
    test('should return true for isWeekend() if the day is on a weekend', () =>
      expect(new ZeDate(18,2,2012).isWeekend(), isTrue));
    test('should return false for isWeekend() if the day is not on a weekend', () =>
      expect(new ZeDate(15,2,2012).isWeekend(), isFalse));
    test('should iterate over all days of the month of the day', () {
      var iterResult = new StringBuffer();
      date.forEachDayOfMonth((day) => iterResult.add(day.day));
      expect(iterResult.toString(), equals('1234567891011121314151617181920212223242526272829'));
    });


  });
  
}
