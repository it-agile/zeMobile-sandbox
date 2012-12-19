part of zemobileLib;

class TimeEntryRepository extends Repository {
  Month loadMonth() {
    var monthJSONString = storage[MONTHDATA_KEY];
    var monthJSON = monthJSONString != null ? JSON.parse(monthJSONString) : null;
    return extractMonth(monthJSON);
  }

  void saveMonth(Month month) {
    storage[MONTHDATA_KEY] = serializeMonth(month);
  }

  bool hasMonth(int month, int year) {
    return storage[MONTH_KEY] == '$month'
      && storage[YEAR_KEY] == '$year';
  }

  void importMonthFromJSON(String monthJSON) {
    var monthMap = JSON.parse(monthJSON);
    var year = monthMap['jahr'];
    var month = monthMap['monat'];
    storage[MONTHDATA_KEY] = monthJSON;
    storage[MONTH_KEY] = '$month';
    storage[YEAR_KEY] = '$year';
  }

  void rememberChangedTimeEntry(TimeEntry entry) {
    var slotKey = entry.changeSlot != null ? entry.changeSlot : findNextFreeSlot(entry.date);
    entry.changeSlot = slotKey;
    storage[slotKey] = serializeTimeEntry(entry);
  }

  List<TimeEntry> changedTimeEntriesForMonth() {
    var result = [];
    if (storage[MONTH_KEY] != null) {
      int month =  parseInt(storage[MONTH_KEY]);
      int year =  parseInt(storage[YEAR_KEY]);
      new ZeDate(1, month, year).forEachDayOfMonth((day) => result.addAll(changedTimeEntries(day)));
    }
    return result;
  }

  List<TimeEntry> changedTimeEntries(ZeDate date) {
    var slot = 1;
    var results = [];
    while(storage[createSlotKey(date, slot)] != null) {
      var timeEntry = deserializeTimeEntry(storage[createSlotKey(date, slot)]);
      timeEntry.changeSlot = createSlotKey(date, slot);
      results.add(timeEntry);
      slot++;
    }
    return results;
  }

  void removeChangedTimeEntry(TimeEntry entry) {
    storage.remove(entry.changeSlot);
  }

  void removeAllChangedTimeEntriesForMonth() {
    changedTimeEntriesForMonth().forEach((entry) => removeChangedTimeEntry(entry));
  }

  bool hasChangedTimeEntriesForMonth() {
    return changedTimeEntriesForMonth().length > 0;
  }

  String findNextFreeSlot(ZeDate date) {
    var slot = 1;
    while (storage[createSlotKey(date, slot)] != null) slot++;
    return createSlotKey(date, slot);
  }

  String createSlotKey(ZeDate date, int slot) => '$date-$slot';

  String serializeMonth(Month month) {
    var jsonMap = {};

    jsonMap[MONTH_YEAR_KEY] = month.year;
    jsonMap[MONTH_MONTH_KEY] = month.month;
    jsonMap[MONTH_BALANCE_KEY] = '${month.balance}';
    jsonMap[MONTH_HOURS_TO_WORK_KEY] = '${month.hoursToWork}';
    jsonMap[MONTH_HOURS_WORKED_KEY] = '${month.hoursWorked}';
    jsonMap[MONTH_VACATION_KEY] = '${month.vacation}';

    var timeEntries = new List.from(month.timeEntries.map(createTimeEntryJsonMap));
    jsonMap[MONTH_TIME_ENTRIES_KEY] = timeEntries;

    return JSON.stringify(jsonMap);
  }

  String serializeTimeEntry(TimeEntry entry) {
    return JSON.stringify(createTimeEntryJsonMap(entry));
  }

  Map createTimeEntryJsonMap(TimeEntry entry) {
    var jsonMap = {};

    var activityMap = {};
    activityMap[TIME_ENTRY_ID_KEY] = entry.activityId;

    jsonMap[TIME_ENTRY_ACTIVITY_KEY] = activityMap;
    jsonMap[TIME_ENTRY_ID_KEY] = entry.id;
    jsonMap[TIME_ENTRY_COMMENT_KEY] = entry.comment;
    jsonMap[TIME_ENTRY_START_KEY] = entry.start != null ? entry.start.toString() : null;
    jsonMap[TIME_ENTRY_END_KEY] = entry.end != null ? entry.end.toString() : null;
    jsonMap[TIME_ENTRY_DAY_KEY] = entry.date.toString();
    jsonMap[TIME_ENTRY_CURRENTLY_BEING_EDITED_KEY] = entry.currentlyBeingEdited;

    return jsonMap;
  }

  TimeEntry deserializeTimeEntry(String timeEntryString) {
    var jsonMap = JSON.parse(timeEntryString);
    return extractTimeEntry(jsonMap);
  }

  Month extractMonth(Map<String, dynamic> monthJSON) {
    if (monthJSON ==  null) return null;

    Month month = new Month();
    month.year = monthJSON[MONTH_YEAR_KEY];
    month.month = monthJSON[MONTH_MONTH_KEY];
    month.balance = convertToDoubleFromGermanFormat(monthJSON[MONTH_BALANCE_KEY]);
    month.vacation = convertToDoubleFromGermanFormat(monthJSON[MONTH_VACATION_KEY]);
    month.hoursWorked = convertToDoubleFromGermanFormat(monthJSON[MONTH_HOURS_WORKED_KEY]);
    month.hoursToWork = convertToDoubleFromGermanFormat(monthJSON[MONTH_HOURS_TO_WORK_KEY]);
    month.timeEntries = new List.from(monthJSON[MONTH_TIME_ENTRIES_KEY].map(extractTimeEntry));

    return month;
  }

  TimeEntry extractTimeEntry(Map<String, dynamic> timeEntryJSON) {
    if (timeEntryJSON == null) return null;

    TimeEntry entry = new TimeEntry();
    entry.id = timeEntryJSON[TIME_ENTRY_ID_KEY];
    entry.activityId = timeEntryJSON[TIME_ENTRY_ACTIVITY_KEY] != null ?
      timeEntryJSON[TIME_ENTRY_ACTIVITY_KEY][TIME_ENTRY_ID_KEY] : null;
    entry.date = new ZeDate.fromString(timeEntryJSON[TIME_ENTRY_DAY_KEY]);
    entry.start = new ZeTime.fromString(timeEntryJSON[TIME_ENTRY_START_KEY]);
    entry.end = new ZeTime.fromString(timeEntryJSON[TIME_ENTRY_END_KEY]);
    entry.comment = timeEntryJSON[TIME_ENTRY_COMMENT_KEY];
    entry.currentlyBeingEdited = timeEntryJSON[TIME_ENTRY_CURRENTLY_BEING_EDITED_KEY];

    return entry;
  }

  num convertToDoubleFromGermanFormat(String doubleString) => parseDouble(doubleString.replaceAll(',', '.'));


  static const MONTHDATA_KEY = 'monthData';
  static const MONTH_KEY = 'month';
  static const YEAR_KEY = 'year';

  static const MONTH_YEAR_KEY = 'jahr';
  static const MONTH_MONTH_KEY = 'monat';

  static const MONTH_BALANCE_KEY = 'saldo';
  static const MONTH_VACATION_KEY = 'urlaub';
  static const MONTH_HOURS_WORKED_KEY = 'ist_arbeitszeit';
  static const MONTH_HOURS_TO_WORK_KEY = 'soll_arbeitszeit';
  static const MONTH_TIME_ENTRIES_KEY = 'zeiten';


  static const TIME_ENTRY_ACTIVITY_KEY = 'taetigkeit';
  static const TIME_ENTRY_DAY_KEY = 'tag';
  static const TIME_ENTRY_START_KEY = 'start';
  static const TIME_ENTRY_END_KEY = 'ende';
  static const TIME_ENTRY_COMMENT_KEY = 'kommentar';
  static const TIME_ENTRY_ID_KEY = 'id';
  static const TIME_ENTRY_CURRENTLY_BEING_EDITED_KEY = 'currentlyBeingEdited';
}