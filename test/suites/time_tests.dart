void timeTests() {
  group('a ze time based on a string with the format hh:mm', () {
    var time = new ZeTime.fromString('09:34');
    
    test('should extract the hour from the string', () => expect(time.hour, equals(9)));
    test('should extract the minutes from the string', () => expect(time.minutes, equals(34)));
    test('should equal the same time created from 3 ints', () => expect(time, equals(new ZeTime(9, 34))));
  });
  
  group('a ze time based on a string with the format hhmm', () {
    var time = new ZeTime.fromString('0934');
    
    test('should equal the same time created from 3 ints', () => expect(time, equals(new ZeTime(9, 34))));
  });
  
  group('a ze time based on a string with the format hmm', () {
    var time = new ZeTime.fromString('934');
    
    test('should equal the same time created from 3 ints', () => expect(time, equals(new ZeTime(9, 34))));
  });
  
}
