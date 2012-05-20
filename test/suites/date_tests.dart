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
  
  describe('a ze date based on parameters for the three components', () {
    ZeDate date = new ZeDate(1,2,2012);
    
    it('should have the correct string representation', () => expect(date.toString()).to(equal('2012-02-01')));
    it('should have the correct german string representation', () => expect(date.toGermanString()).to(equal('01.02.2012')));
  });
  
  describe('calling nextDay() on a ze date', () {
    it('should return 2012-02-29 for 2012-02-28', () => expect(new ZeDate.fromString('2012-02-28').nextDay().toString()).to(equal('2012-02-29')));
    it('should return 2011-03-01 for 2011-02-28', () => expect(new ZeDate.fromString('2011-02-28').nextDay().toString()).to(equal('2011-03-01')));
    it('should return 2011-03-02 for 2011-03-01', () => expect(new ZeDate.fromString('2011-03-01').nextDay().toString()).to(equal('2011-03-02')));
  });
  
}
