class TimeEntry {
  Map<String, Dynamic> timeEntryJSON;
  TimeEntry(this.timeEntryJSON);
  TimeEntry.fresh() : timeEntryJSON = new Map<String, Dynamic>();

  int get id() => timeEntryJSON[ID];
      set id(int id) => timeEntryJSON[ID] = id;
  int get activityId() => timeEntryJSON[ACTIVITY] != null ? timeEntryJSON[ACTIVITY][ID] : null;
      set activityId(int activityId) {
        if (timeEntryJSON[ACTIVITY] == null) {
          timeEntryJSON[ACTIVITY] = new Map<String, Dynamic>();
        }
        timeEntryJSON[ACTIVITY][ID] = activityId;
      }
  ZeDate get date() => new ZeDate.fromString(timeEntryJSON[DAY]);
         set date(ZeDate aDate) => timeEntryJSON[DAY] = aDate.toString();
  ZeTime get start() => new ZeTime.fromString(timeEntryJSON[START]);
         set start(ZeTime time) => timeEntryJSON[START] = time.toString();
  ZeTime get end() => new ZeTime.fromString(timeEntryJSON[END]);
         set end(ZeTime time) => timeEntryJSON[END] = time.toString(); 
  String get comment() => timeEntryJSON[COMMENT];
         set comment(String aComment) => timeEntryJSON[COMMENT] = aComment; 
  
  static final String ID = "id";
  static final String ACTIVITY = "taetigkeit";
  static final String DAY = "tag";
  static final String START = "start";
  static final String END = "ende";
  static final String COMMENT = "kommentar";
}