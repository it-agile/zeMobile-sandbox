part of testSuites;

void monthDisplayTests() {
  group('A month display model', () {
    var month = new Month(year: 2012, month: 7);
    var model = new MonthDisplayModel(month);

    test('should return the first day of the month', () => expect(model.firstDayInMonth, equals(new ZeDate(1,7,2012))));
  });

  group('A month display', () {
    var firstDay = new ZeDate(1,7,2012);
    var timeEntry = new TimeEntry(date: firstDay);
    var timeEntryOnAntherDay = new TimeEntry(date: new ZeDate(4,7,2012));
    var month = new Month(year: 2012, month: 7, timeEntries: [timeEntry, timeEntryOnAntherDay]);
    var model = new MonthDisplayModelMock();
    var view = new MonthDisplayViewMock();
    var dayDisplayFactory = new DayDisplayFactoryMock();
    var dayDisplay = new DayDisplayMock();
    var dayDisplayUI = new ElementMock();
    var daysElement = new ElementMock();
    var daysElementNodes = [];
    var monthDisplay = new MonthDisplay(model, view, dayDisplayFactory);
    var firstDayMock = new ZeDateMock();

    setUp(() {
      monthDisplay = new MonthDisplay(model, view, dayDisplayFactory);
      daysElementNodes = [];
      clearMocks([model, view, dayDisplay, dayDisplayFactory, dayDisplayUI, daysElement]);

      model.when(callsTo('get month')).alwaysReturn(month);
      model.when(callsTo('get firstDayInMonth')).thenReturn(firstDayMock);
      firstDayMock.when(callsTo('forEachDayOfMonth')).thenCall((callback) => callback(firstDay));
      dayDisplayFactory.when(callsTo('createDayDisplay', firstDay)).thenReturn(dayDisplay);
      dayDisplay.when(callsTo('createUI')).thenReturn(dayDisplayUI);
      view.when(callsTo('get daysElement')).thenReturn(daysElement);
      daysElement.when(callsTo('get nodes')).thenReturn(daysElementNodes);

      monthDisplay.createUI();
    });

    test('should create day displays for all days of the month', () {
      expect(daysElementNodes.length, equals(1));
      expect(daysElementNodes, contains(dayDisplayUI));
    });
    test('should add each time entry of the same day to the created day display', () =>
      dayDisplay.getLogs(callsTo('addTimeEntry', timeEntry)).verify(happenedOnce));
    test('should not add time entries of other days to the created day display', () =>
      dayDisplay.getLogs(callsTo('addTimeEntry', timeEntryOnAntherDay)).verify(neverHappened));
    test('should update the correct day displays with the updated time entries when updating a month', () {
      dayDisplay.when(callsTo('get day')).thenReturn(firstDay);

      monthDisplay.updateMonth(month);

      dayDisplay.getLogs(callsTo('updateTimeEntries', [timeEntry])).verify(happenedOnce);
    });

    test('should not update day displays with time entries from another day when updating a month', () {
      dayDisplay.when(callsTo('get day')).thenReturn(firstDay);

      monthDisplay.updateMonth(new Month(year: 2012, month: 7, timeEntries: [timeEntryOnAntherDay]));

      dayDisplay.getLogs(callsTo('updateTimeEntries', [])).verify(happenedOnce);
    });
  });
}