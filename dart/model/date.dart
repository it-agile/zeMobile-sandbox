class ZeDate {
  int day; 
  int month; 
  int year;
  
  ZeDate(this.day, this.month, this.year);
  
  ZeDate.fromGermanString(String dateString)  {
    RegExp dateReg = const RegExp(@'(\d*)\.(\d*)\.(\d*)');
    Iterable<Match> matches = dateReg.allMatches(dateString);
    for(Match m in matches) {
      day = Math.parseInt(m.group(1));
      month = Math.parseInt(m.group(2));
      year = Math.parseInt(m.group(3));
    }
  }
  
  ZeDate.fromString(String dateString)  {
    RegExp dateReg = const RegExp(@'(\d*)-(\d*)-(\d*)');
    Iterable<Match> matches = dateReg.allMatches(dateString);
    for(Match m in matches) {
      day = Math.parseInt(m.group(3));
      month = Math.parseInt(m.group(2));
      year = Math.parseInt(m.group(1));
    }
  }
  
  bool operator ==(ZeDate other) => !(other == null) && equals(other);
  bool equals(ZeDate other) => (day == other.day) && (month == other.month) && (year == other.year);
  
  String toString() {
    return '$year-$month-$day';
  }

  String toGermanString() {
    return '$day.$month.$year';
  }

}
