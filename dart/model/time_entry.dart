part of zemobileLib;

class TimeEntry {
  int id;
  int activityId;
  ZeDate date;
  ZeTime start;
  ZeTime end;
  String comment;
  String changeSlot;
  bool currentlyBeingEdited;
  
  TimeEntry({this.id, this.activityId, this.date, this.start, this.end, this.comment, this.currentlyBeingEdited});

  void assimilate(TimeEntry otherEntry) {
    activityId = otherEntry.activityId;
    date = otherEntry.date;
    start = otherEntry.start;
    end = otherEntry.end;
    comment = otherEntry.comment;
    changeSlot = otherEntry.changeSlot;
    currentlyBeingEdited = otherEntry.currentlyBeingEdited;
  }

  bool operator ==(TimeEntry other) {
    if (other == null) return false;
    if (identical(this, other)) return true;
    return id == other.id && activityId == other.activityId && date == other.date
      && start == other.start && end == other.end && comment == other.comment
      && currentlyBeingEdited == other.currentlyBeingEdited;
  }

  String toString() {
    return 'TimeEntry($id, $activityId, $date, $start, $end, $comment, $currentlyBeingEdited)';
  }
}