class TimeEntryRepository {
  final Storage storage;

  TimeEntryRepository(): storage = document.window.localStorage;

  Month loadMonth() {
    var monthJSONString = storage[MONTH_KEY];
    var monthJSON = monthJSONString != null ? JSON.parse(monthJSONString) : null;
    return extractMonth(monthJSON);
  }

  bool hasMonth(int month, int year) {
    return window.localStorage[MONTH_DESC_KEY] == '$year$month';
  }

  void importMonthFromJSON(String monthJSON) {
    var monthMap = JSON.parse(monthJSON);
    var year = monthMap['jahr'];
    var month = monthMap['monat'];
    storage[MONTH_KEY] = monthJSON;
    storage[MONTH_DESC_KEY] = '$year$month';
  }

  void rememberTimeEntryInEditing(TimeEntry entry) {
    storage[findNextFreeSlot(entry.date)] = serializeTimeEntry(entry);
  }

  List<TimeEntry> rememberedTimeEntries(ZeDate date) {
    var slot = 1;
    var results = [];
    while(storage['$date-$slot'] != null) {
      results.add(deserializeTimeEntry(storage['$date-$slot']));
      slot++;
    }
    return results;
  }

  String findNextFreeSlot(ZeDate date) {
    var slot = 1;
    while (storage['$date-$slot'] != null) slot++;
    return '$date-$slot';
  }

  String serializeTimeEntry(TimeEntry entry) {
    var jsonMap = {};

    var activityMap = {};
    activityMap[TIME_ENTRY_ID_KEY] = entry.activityId;

    jsonMap[TIME_ENTRY_ACTIVITY_KEY] = activityMap;
    jsonMap[TIME_ENTRY_ID_KEY] = entry.id;
    jsonMap[TIME_ENTRY_COMMENT_KEY] = entry.comment;
    jsonMap[TIME_ENTRY_START_KEY] = entry.start != null ? entry.start.toString() : null;
    jsonMap[TIME_ENTRY_END_KEY] = entry.end != null ? entry.end.toString() : null;
    jsonMap[TIME_ENTRY_DAY_KEY] = entry.date.toString();

    return JSON.stringify(jsonMap);
  }

  TimeEntry deserializeTimeEntry(String timeEntryString) {
    var jsonMap = JSON.parse(timeEntryString);
    return extractTimeEntry(jsonMap);
  }

  Month extractMonth(Map<String, Dynamic> monthJSON) {
    if (monthJSON ==  null) return null;

    Month month = new Month();
    month.year = monthJSON[MONTH_YEAR_KEY];
    month.month = monthJSON[MONTH_MONTH_KEY];
    month.balance = convertToDoubleFromGermanFormat(monthJSON[MONTH_BALANCE_KEY]);
    month.vacation = convertToDoubleFromGermanFormat(monthJSON[MONTH_VACATION_KEY]);
    month.hoursWorked = convertToDoubleFromGermanFormat(monthJSON[MONTH_HOURS_WORKED_KEY]);
    month.hoursToWork = convertToDoubleFromGermanFormat(monthJSON[MONTH_HOURS_TO_WORK_KEY]);
    month.timeEntries = new List.from(monthJSON['zeiten'].map(extractTimeEntry));

    return month;
  }

  TimeEntry extractTimeEntry(Map<String, Dynamic> timeEntryJSON) {
    if (timeEntryJSON == null) return null;

    TimeEntry entry = new TimeEntry();
    entry.id = timeEntryJSON[TIME_ENTRY_ID_KEY];
    entry.activityId = timeEntryJSON[TIME_ENTRY_ACTIVITY_KEY] != null ?
      timeEntryJSON[TIME_ENTRY_ACTIVITY_KEY][TIME_ENTRY_ID_KEY] : null;
    entry.date = new ZeDate.fromString(timeEntryJSON[TIME_ENTRY_DAY_KEY]);
    entry.start = new ZeTime.fromString(timeEntryJSON[TIME_ENTRY_START_KEY]);
    entry.end = new ZeTime.fromString(timeEntryJSON[TIME_ENTRY_END_KEY]);
    entry.comment = timeEntryJSON[TIME_ENTRY_COMMENT_KEY];

    return entry;
  }

  num convertToDoubleFromGermanFormat(String doubleString) => Math.parseDouble(doubleString.replaceAll(',', '.'));


  static final MONTH_KEY = 'month';
  static final MONTH_DESC_KEY = 'monthDesc';

  static final MONTH_YEAR_KEY = 'jahr';
  static final MONTH_MONTH_KEY = 'monat';

  static final MONTH_BALANCE_KEY = 'saldo';
  static final MONTH_VACATION_KEY = 'urlaub';
  static final MONTH_HOURS_WORKED_KEY = 'ist_arbeitszeit';
  static final MONTH_HOURS_TO_WORK_KEY = 'soll_arbeitszeit';

  static final TIME_ENTRY_ACTIVITY_KEY = 'taetigkeit';
  static final TIME_ENTRY_DAY_KEY = 'tag';
  static final TIME_ENTRY_START_KEY = 'start';
  static final TIME_ENTRY_END_KEY = 'ende';
  static final TIME_ENTRY_COMMENT_KEY = 'kommentar';
  static final TIME_ENTRY_ID_KEY = 'id';
}