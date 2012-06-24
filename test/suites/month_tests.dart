void monthTests() {
  var describe = group;
  var it = test;
  
  describe('A month based on a JSON string', () {
    Month month = new Month(JSON.parse('''
      {
      "status": "offen", 
      "jahr": 2012, 
      "zeiten": [
          {"tag": "2012-02-08"}, 
          {"tag": "2012-02-09"}
      ], 
      "saldo": "-106,00", 
      "monat": 2, 
      "urlaub": "8,00", 
      "ist_arbeitszeit": "6,25", 
      "soll_arbeitszeit": "120,25"
  }'''));
    
    it('should extract the year', () =>  expect(month.year, equals(2012)));
    it('should extract the month', () => expect(month.month, equals(2)));
    it('should extract the balance', () => expect(month.balance, equals(-106.00)));
    it('should extract the vacation', () => expect(month.vacation, equals(8.00)));
    it('should extract the hours worked', () => expect(month.hoursWorked, equals(6.25)));
    it('should extract the hours to work', () => expect(month.hoursToWork, equals(120.25)));
    it('should extract two time entries', () => expect(month.timeEntries.length, equals(2)));
    it('should have one time entry for 2012-02-08', () => expect(month.timeEntriesFor(new ZeDate.fromString('2012-02-08')).length, equals(1)));
  });
}
