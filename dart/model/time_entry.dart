class TimeEntry {
  Map<String, Dynamic> timeEntryJSON;
  TimeEntry(this.timeEntryJSON);

  int get id() => timeEntryJSON["id"];
  int get activityId() => timeEntryJSON["taetigkeit"]['id'];
  Date get date() => new Date.fromString('${timeEntryJSON["tag"]} 00:00:00');
  Date get start() => new Date.fromString('${timeEntryJSON["tag"]} ${timeEntryJSON["start"]}');
  Date get end() => new Date.fromString('${timeEntryJSON["tag"]} ${timeEntryJSON["ende"]}');
  String get comment() => timeEntryJSON["kommentar"];
}