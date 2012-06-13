class ZeTime {
  int hour;
  int minutes;
  
  ZeTime(this.hour, this.minutes);
  ZeTime.fromString(String timeString) {
    if (timeString == null) return;
    RegExp timeReg = const RegExp(@'^(\d*):(\d*)(:(\d*))?$');
    Iterable<Match> matches = timeReg.allMatches(timeString);
    for(Match m in matches) {
      hour = Math.parseInt(m.group(1));
      minutes = Math.parseInt(m.group(2));
    }
    
    if (hour == null && minutes == null) {
      timeReg = const RegExp(@'^(\d{1,2})(\d{2})$');
      Iterable<Match> matches = timeReg.allMatches(timeString);
      for(Match m in matches) {
        hour = Math.parseInt(m.group(1));
        minutes = Math.parseInt(m.group(2));
      }
    }
  }
  
  bool operator ==(ZeTime other) => !(other == null) && equals(other);
  bool equals(ZeTime other) => (hour == other.hour) 
      && (minutes == other.minutes);
  
  String toString() {
    return '${_toStringWithLeadingZeros(hour)}:${_toStringWithLeadingZeros(minutes)}';
  }
  String _toStringWithLeadingZeros(int number) => number < 10 ? '0$number' : '$number'; 
  
}
