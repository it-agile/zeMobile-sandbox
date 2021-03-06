part of zemobileLib;

class ZeDate {
  static final DAY_DURATION = const Duration(days:1, hours:10);
  static final MONTH_DURATION = const Duration(days:30);
  final int day; 
  final int month; 
  final int year;
  
  const ZeDate(this.day, this.month, this.year);
  
  factory ZeDate.fromGermanString(String dateString)  {
    RegExp dateReg = new RegExp(r'(\d*)\.(\d*)\.(\d*)');
    for(Match m in dateReg.allMatches(dateString)) {
      return new ZeDate(parseInt(m.group(1)), parseInt(m.group(2)), parseInt(m.group(3)));
    }
  }
  
  factory ZeDate.fromString(String dateString)  {
    RegExp dateReg = new RegExp(r'(\d*)-(\d*)-(\d*)');
    for(Match m in dateReg.allMatches(dateString)) {
      return new ZeDate(parseInt(m.group(3)), parseInt(m.group(2)), parseInt(m.group(1)));
    }
  }
  
  factory ZeDate.fromDate(Date date)  {
    return new ZeDate(date.day, date.month, date.year);
  }
  
  factory ZeDate.currentDay()  {
    return new ZeDate.fromDate(new Date.now());
  }
  
  ZeDate nextDay() {
    var thisDay = new Date(year, month, day);
    return new ZeDate.fromDate(thisDay.add(DAY_DURATION));
  }
  
  ZeDate firstOfMonth() {
    return new ZeDate(1, month, year);
  }
  
  ZeDate firstOfPreviousMonth() {
    return new ZeDate.fromDate(new Date(year, month, 1).subtract(MONTH_DURATION)).firstOfMonth();
  }
  
  bool isWeekend() {
    var date = new Date(year, month, day);
    var weekday = date.weekday;
    return weekday == Date.SAT || weekday == Date.SUN;
  }

  void forEachDayOfMonth(void each(ZeDate day)) {
    var date = firstOfMonth();
    while(date.month == month) {
      each(date);
      date = date.nextDay();
    }
  }

  bool operator ==(ZeDate other) => !(other == null) && equals(other);
  bool equals(ZeDate other) => (day == other.day) && (month == other.month) && (year == other.year);
  
  String toString() {
    return '$year-${_toStringWithLeadingZeros(month)}-${_toStringWithLeadingZeros(day)}';
  }

  String toGermanString() {
    return '${_toStringWithLeadingZeros(day)}.${_toStringWithLeadingZeros(month)}.$year';
  }
  
  String _toStringWithLeadingZeros(int number) => number < 10 ? '0$number' : '$number'; 
}
