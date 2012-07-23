class TimeEntry {
  int id;
  int activityId;
  ZeDate date;
  ZeTime start;
  ZeTime end;
  String comment;
  
  TimeEntry([this.id, this.activityId, this.date, this.start, this.end, this.comment]);

  bool operator ==(TimeEntry other) {
    if (other == null) return false;
    if (other === this) return true;
    return id == other.id && activityId == other.activityId && date == other.date
      && start == other.start && end == other.end && comment == other.comment;
  }

  String toString() {
    return 'TimeEntry($id, $activityId, $date, $start, $end, $comment)';
  }
}