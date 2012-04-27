void dateTests() {
  describe('a ze date based on a string', () {
    ZeDate date = new ZeDate.fromString('2012-11-03');
    
    it('should extract the day from the string', () => expect(date.day).to(equal(3)));
    it('should extract the month from the string', () => expect(date.month).to(equal(11)));
    it('should extract the year from the string', () => expect(date.year).to(equal(2012)));
    it('should equal the same date created from 3 ints', () => expect(date).to(equal(new ZeDate(3, 11, 2012))));
  });
  
  describe('a ze date based on a german string', () {
    ZeDate date = new ZeDate.fromGermanString('03.11.2012');
    
    it('should extract the day from the string', () => expect(date.day).to(equal(3)));
    it('should extract the month from the string', () => expect(date.month).to(equal(11)));
    it('should extract the year from the string', () => expect(date.year).to(equal(2012)));
    it('should equal the same date created from 3 ints', () => expect(date).to(equal(new ZeDate(3, 11, 2012))));
  });
  
}
