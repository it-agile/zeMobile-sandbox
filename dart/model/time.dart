class ZeTime {
  int hour;
  int minutes;
  int seconds;
  
  ZeTime(this.hour, this.minutes, this.seconds);
  ZeTime.fromString(String timeString) {
    RegExp dateReg = const RegExp(@'(\d*):(\d*):(\d*)');
    Iterable<Match> matches = dateReg.allMatches(timeString);
    for(Match m in matches) {
      hour = Math.parseInt(m.group(1));
      minutes = Math.parseInt(m.group(2));
      seconds = Math.parseInt(m.group(3));
    }
  }
  
  bool operator ==(ZeTime other) => !(other == null) && equals(other);
  bool equals(ZeTime other) => (hour == other.hour) 
      && (minutes == other.minutes) 
      && (seconds == other.seconds);
  
  String toString() {
    return '${_toStringWithLeadingZeros(hour)}:${_toStringWithLeadingZeros(minutes)}';
  }
  String _toStringWithLeadingZeros(int number) => number < 10 ? '0$number' : '$number'; 
  
}
