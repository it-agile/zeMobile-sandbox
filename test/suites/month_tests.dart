void monthTests() {
  describe('A month based on a JSON string', () {
    Month month = new Month(JSON.parse('''
      {
      "status": "offen", 
      "jahr": 2012, 
      "zeiten": [
          {}, 
          {}
      ], 
      "saldo": "-106,00", 
      "monat": 2, 
      "urlaub": "8,00", 
      "ist_arbeitszeit": "6,25", 
      "soll_arbeitszeit": "120,25"
  }'''));
    
    it('should extract the year', () =>  expect(month.year).to(equal(2012)));
    it('should extract the month', () => expect(month.month).to(equal(2)));
    it('should extract the balance', () => expect(month.balance).to(equal(-106.00)));
    it('should extract the vacation', () => expect(month.vacation).to(equal(8.00)));
    it('should extract the hours worked', () => expect(month.hoursWorked).to(equal(6.25)));
    it('should extract the hours to work', () => expect(month.hoursToWork).to(equal(120.25)));
    it('should extract two time entries', () => expect(month.timeEntries.length).to(equal(2)));
  });
}
