void timeTests() {
  var describe = group;
  var it = test;
  
  describe('a ze time based on a string with the format hh:mm', () {
    ZeTime time = new ZeTime.fromString('09:34');
    
    it('should extract the hour from the string', () => expect(time.hour, equals(9)));
    it('should extract the minutes from the string', () => expect(time.minutes, equals(34)));
    it('should equal the same time created from 3 ints', () => expect(time, equals(new ZeTime(9, 34))));
  });
  
  describe('a ze time based on a string with the format hhmm', () {
    ZeTime time = new ZeTime.fromString('0934');
    
    it('should equal the same time created from 3 ints', () => expect(time, equals(new ZeTime(9, 34))));
  });
  
  describe('a ze time based on a string with the format hmm', () {
    ZeTime time = new ZeTime.fromString('934');
    
    it('should equal the same time created from 3 ints', () => expect(time, equals(new ZeTime(9, 34))));
  });
  
}
