void dayDisplayTests() {
  group('A day display model', () {
    var day = const ZeDate(11, 10, 2011);
    var model = new DayDisplayModel(day);

    test('should have the day passed to the constructor', () => expect(model.day, same(day)));
    test('should have a container id based on the day', () => expect(model.dayContainerId, equals('day2011-10-11')));
    test('should create new time entries based on the day', () =>
      expect(model.createNewEntry(), equals(new TimeEntry(null, null, day, null, null, null))));
  });

  group('A day display', () {
    var model = new DayDisplayModelMock();
    var view = new DayDisplayViewMock();
    var timeEntryEditorFactory = new TimeEntryEditorFactoryMock();
    var dayDisplay = new DayDisplay(model, view, timeEntryEditorFactory);

    setUp(() => clearMocks([timeEntryEditorFactory]));

    test('should create a time entry editor for a new entry when the "add entry button" is touched', () {
      var timeEntry = new TimeEntry();
      model.when(callsTo('createNewEntry')).thenReturn(timeEntry);
      var timeEntryEditor = new TimeEntryEditorMock();
      timeEntryEditorFactory.when(callsTo('createTimeEntryEditor', timeEntry)).thenReturn(timeEntryEditor);
      var timeEntriesElement = new ElementMock();
      view.when(callsTo('get timeEntriesElement')).thenReturn(timeEntriesElement);
      var addEntrySection = new ElementMock();
      view.when(callsTo('get addEntrySection')).thenReturn(addEntrySection);
      var editorUI = new ElementMock();
      timeEntryEditor.when(callsTo('createUI')).thenReturn(editorUI);

      dayDisplay.addEntryButtonTouched(null);

      timeEntriesElement.getLogs(callsTo('insertBefore', editorUI, addEntrySection)).verify(happenedOnce);
    });
  });
}