class TimeEntry {
  Map<String, Dynamic> timeEntryJSON;
  TimeEntry(this.timeEntryJSON);
  TimeEntry.fresh() : timeEntryJSON = new Map<String, Dynamic>();

  int get id() => timeEntryJSON[ID];
  int get activityId() => timeEntryJSON[ACTIVITY] != null ? timeEntryJSON[ACTIVITY][ID] : null;
  ZeDate get date() => new ZeDate.fromString(timeEntryJSON[DAY]);
  ZeTime get start() => new ZeTime.fromString(timeEntryJSON[START]);
  ZeTime get end() => new ZeTime.fromString(timeEntryJSON[END]);
  String get comment() => timeEntryJSON[COMMENT];
  
  static final String ID = "id";
  static final String ACTIVITY = "taetigkeit";
  static final String DAY = "tag";
  static final String START = "start";
  static final String END = "ende";
  static final String COMMENT = "kommentar";
}