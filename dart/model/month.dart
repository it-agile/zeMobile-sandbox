class Month {
  Map<String, Dynamic> monthJSON;
  
  Month(this.monthJSON);
  
  int get year() => monthJSON["jahr"];
  int get month() => monthJSON["monat"]; 
  double get balance() => _convertToDoubleFromGermanFormat(monthJSON["saldo"]);
  double get vacation() => _convertToDoubleFromGermanFormat(monthJSON["urlaub"]);
  double get hoursWorked() => _convertToDoubleFromGermanFormat(monthJSON["ist_arbeitszeit"]);
  double get hoursToWork() => _convertToDoubleFromGermanFormat(monthJSON["soll_arbeitszeit"]);
  Collection<TimeEntry> get timeEntries() => monthJSON['zeiten'].map((Map<String, Object> timeEntryJSON) => new TimeEntry(timeEntryJSON));
  Collection<TimeEntry> timeEntriesFor(ZeDate day) => timeEntries.filter((TimeEntry entry) => entry.date == day);
  
  double _convertToDoubleFromGermanFormat(String doubleString) => Math.parseDouble(doubleString.replaceAll(',', '.'));
}