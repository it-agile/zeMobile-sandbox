class TimeEntry {
  Map<String, Dynamic> timeEntryJSON;
  TimeEntry(this.timeEntryJSON);

  int get id() => timeEntryJSON["id"];
  int get activityId() => timeEntryJSON["taetigkeit"]['id'];
  ZeDate get date() => new ZeDate.fromString(timeEntryJSON["tag"]);
  ZeTime get start() => new ZeTime.fromString(timeEntryJSON["start"]);
  ZeTime get end() => new ZeTime.fromString(timeEntryJSON["ende"]);
  String get comment() => timeEntryJSON["kommentar"];
}