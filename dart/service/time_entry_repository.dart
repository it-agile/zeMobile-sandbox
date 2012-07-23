class TimeEntryRepository {
  Month loadMonth(int year, int month) {
    var monthJSONString = document.window.localStorage['$MONTH_KEY_PREFIX$year$month'];
    var monthJSON = monthJSONString != null ? JSON.parse(monthJSONString) : null;
    return extractMonth(monthJSON);
  }

  void importMonthFromJSON(String monthJSON) {
    var monthMap = JSON.parse(monthJSON);
    var year = monthMap['jahr'];
    var month = monthMap['monat'];
    document.window.localStorage['$MONTH_KEY_PREFIX$year$month'] = monthJSON;
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


  static final MONTH_KEY_PREFIX = 'month';
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