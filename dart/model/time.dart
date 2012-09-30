class ZeTime {
  final int hour;
  final int minutes;
  
  const ZeTime(this.hour, this.minutes);

  factory ZeTime.fromString(String timeString) {
    var result = new ZeTime._fromStringWithColon(timeString);

    if (result == null) {
      result = new ZeTime._fromStringWithoutColon(timeString);
    }

    return result;
  }

  factory ZeTime._fromStringWithColon(String timeString) {
    if (timeString == null) return;

    var parsedHour = null;
    var parsedMinutes = null;

    var timeReg = const RegExp(@'^(\d*):(\d*)(:(\d*))?$');
    for(Match m in timeReg.allMatches(timeString)) {
      parsedHour = parseInt(m.group(1));
      parsedMinutes = parseInt(m.group(2));
    }

    if (parsedHour == null || parsedMinutes == null) return null;

    return new ZeTime(parsedHour, parsedMinutes);
  }

  factory ZeTime._fromStringWithoutColon(String timeString) {
    if (timeString == null) return;

    var parsedHour = null;
    var parsedMinutes = null;

    var timeReg = const RegExp(@'^(\d{1,2})(\d{2})$');
    for(Match m in timeReg.allMatches(timeString)) {
      parsedHour = parseInt(m.group(1));
      parsedMinutes = parseInt(m.group(2));
    }

    if (parsedHour == null || parsedMinutes == null) return null;

    return new ZeTime(parsedHour, parsedMinutes);
  }


  
  bool operator ==(ZeTime other) => !(other == null) && equals(other);
  bool equals(ZeTime other) => (hour == other.hour) 
      && (minutes == other.minutes);
  
  String toString() {
    return '${_toStringWithLeadingZeros(hour)}:${_toStringWithLeadingZeros(minutes)}';
  }
  String _toStringWithLeadingZeros(int number) => number < 10 ? '0$number' : '$number'; 
  
}
