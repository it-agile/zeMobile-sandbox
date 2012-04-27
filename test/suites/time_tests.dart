void timeTests() {
  describe('a ze time based on a string', () {
    ZeTime time = new ZeTime.fromString('09:34:01');
    
    it('should extract the hour from the string', () => expect(time.hour).to(equal(9)));
    it('should extract the minutes from the string', () => expect(time.minutes).to(equal(34)));
    it('should extract the seconds from the string', () => expect(time.seconds).to(equal(1)));
    it('should equal the same time created from 3 ints', () => expect(time).to(equal(new ZeTime(9, 34,1))));
  });
  
}
