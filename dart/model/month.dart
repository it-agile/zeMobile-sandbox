class Month {
  int year;
  int month;
  num balance;
  num vacation;
  num hoursWorked;
  num hoursToWork;
  List<TimeEntry> timeEntries;

  Month([this.year, this.month, this.balance, this.vacation, this.hoursWorked, this.hoursToWork, this.timeEntries]);

  List<TimeEntry> timeEntriesFor(ZeDate day) => new List.from(timeEntries.filter((entry) => entry.date == day));

  bool operator ==(Month other) {
    if (other == null) return false;
    if (other === this) return true;
    if (other.year != year || other.month != month || other.balance != balance
      || other.vacation != vacation || other.hoursToWork != hoursToWork || other.hoursWorked != hoursWorked) return false;
    if(timeEntries == null) return other.timeEntries == null;
    if(other.timeEntries == null) return false;
    if (timeEntries.length != other.timeEntries.length) return false;

    for(int i=0; i<timeEntries.length; i++) {
      if (timeEntries[i] != other.timeEntries[i]) return false;
    }

    return true;
  }

  String toString() {
    return 'Month($year, $month, $balance, $vacation, $hoursWorked, $hoursToWork, $timeEntries)';
  }
}