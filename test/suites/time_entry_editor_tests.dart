void timeEntryEditorTests() {
  final TIME_ENTRY_ID = 42;
  final ACTIVITY_ID = 76;
  final DATE = const ZeDate(5,3,2012);
  final START = const ZeTime(9,0);
  final END = const ZeTime(12,30);
  final COMMENT = "comment";

  group('A time entry editor model', () {
    TimeEntry timeEntry = null;
    var activitProvider = new ActivityProviderMock();
    var timeEntryProvider = new TimeEntryProviderMock();
    var projects = [];
    var activity = new Activity(ACTIVITY_ID, 'A1');
    var project = new Project('P1', []);
    TimeEntryEditorModel model = null;

    setUp(() {
      clearMocks([activitProvider, timeEntryProvider]);
      timeEntry = new TimeEntry(TIME_ENTRY_ID, ACTIVITY_ID, DATE, START, END, COMMENT);
      activitProvider.when(callsTo('get fetchedProjects')). thenReturn(projects);
      activitProvider.when(callsTo('activityWithId', ACTIVITY_ID)). thenReturn(activity);
      activitProvider.when(callsTo('projectWithActivity', activity)). thenReturn(project);
      model = new TimeEntryEditorModel(timeEntry, activitProvider,timeEntryProvider);
    });

    test('should fetch the available projects from the activity provider', () {
      expect(model.projects, same(projects));
    });

    test('should retrieve matching activity from the activity provider', () {
      expect(model.activity, same(activity));
    });

    test('should retrieve the project containing the activity from the activity provider', () {
      expect(model.project, same(project));
    });

    test('should return false when asked whether a time entry with an id is new', () => expect(model.isEntryNew, isFalse));
    test('should return true when asked whether a time entry without an id is new', () {
      timeEntry.id = null;
      expect(model.isEntryNew, isTrue);
    });

    test('should delete the time entry via time entry provider if the entry is not new', () {
      model.deleteEntry();
      timeEntryProvider.getLogs(callsTo('delete', timeEntry)).verify(happenedOnce);
    });

    test('should not try to delete a new time entry via time entry provider', () {
      timeEntry.id = null;
      model.deleteEntry();
      timeEntryProvider.getLogs(callsTo('delete', timeEntry)).verify(neverHappened);
    });

    test('should apply the changes when asked to save changes', () {
      var activityId = ACTIVITY_ID + 1;
      var start = const ZeTime(10,30);
      var end = const ZeTime(13,30);
      var comment = 'co';

      model.saveChanges(activityId, start, end, comment);

      expect(timeEntry.activityId, equals(activityId));
      expect(timeEntry.date, equals(DATE));
      expect(timeEntry.start, equals(start));
      expect(timeEntry.end, equals(end));
      expect(timeEntry.comment, equals(comment));
    });

    test('should save the time entry via time entry provider when asked to save changes', () {
      model.saveChanges(null, null, null, null);

      timeEntryProvider.getLogs(callsTo('save', timeEntry)).verify(happenedOnce);
    });

    test('should get the project with the matching name and return its activities when asked for them', () {
      var project = new Project('P1', []);
      activitProvider.when(callsTo('projectWithName', 'P1')).thenReturn(project);
      expect(model.activitiesForProject('P1'), same(project.activities));
    });
  });

  group('A time entry editor', () {
    var model = new TimeEntryEditorModelMock();
    var view = new TimeEntryEditorViewMock();
    var editor = new TimeEntryEditor(model, view);

    var comment = 'test';
    var activity = new Activity(ACTIVITY_ID, 'A1');
    var activities = [activity];
    var project = new Project('P1', activities);
    var projects = [project];

    setUp(() => clearMocks([model, view]));

    test('should enable editing when edit button is tousched', () {
      editor.editTouched(new EventMock());
      view.getLogs(callsTo('enableEditing', true)).verify(happenedOnce);
    });

    void configureOverwrite() {
      model.when(callsTo('get start')).thenReturn(START);
      model.when(callsTo('get end')).thenReturn(END);
      model.when(callsTo('get comment')).thenReturn(comment);
      model.when(callsTo('get projects')).thenReturn(projects);
      model.when(callsTo('get project')).thenReturn(project);
      model.when(callsTo('get activity')).thenReturn(activity);
    }

    test('should overwrite all changes in the UI with data from the time entry when cancel is touched', () {
      configureOverwrite();

      editor.cancelTouched(new EventMock());

      view.getLogs(callsTo('set:timeFrom', START)).verify(happenedOnce);
      view.getLogs(callsTo('set:timeTo', END)).verify(happenedOnce);
      view.getLogs(callsTo('set:comment', comment)).verify(happenedOnce);
      view.getLogs(callsTo('set:availableProjects', projects)).verify(happenedOnce);
      view.getLogs(callsTo('set:project', project)).verify(happenedOnce);
      view.getLogs(callsTo('set:availableActivities', activities)).verify(happenedOnce);
      view.getLogs(callsTo('set:activity', activity)).verify(happenedOnce);
    });

    test('should disable editing when cancel is touched', () {
      configureOverwrite();

      editor.cancelTouched(new EventMock());

      view.getLogs(callsTo('enableEditing', false)).verify(happenedOnce);
    });

    test('should remove its view after deleting the time entry', () {
      model.when(callsTo('deleteEntry')).thenReturn(new Future.immediate('OK'));
      var editorElement = new ElementMock();
      view.when(callsTo('get editorElement')).thenReturn(editorElement);

      editor.deleteTouched(new EventMock());

      editorElement.getLogs(callsTo('remove')).verify(happenedOnce);
    });

    test('should disable editing after saving changes', () {
      view.when(callsTo('get timeFrom')).thenReturn(START);
      view.when(callsTo('get timeTo')).thenReturn(END);
      view.when(callsTo('get comment')).thenReturn(COMMENT);
      view.when(callsTo('get selectedActivityId')).thenReturn('$ACTIVITY_ID');
      model.when(callsTo('saveChanges', ACTIVITY_ID, START, END,COMMENT)).thenReturn(new Future.immediate('OK'));
      editor.saveTouched(new EventMock());

      view.getLogs(callsTo('enableEditing', false)).verify(happenedOnce);
    });

    test('while overwritting UI with data from time entry should set the first project and its first activity if time entry has no project', () {
      model.when(callsTo('get start')).thenReturn(START);
      model.when(callsTo('get end')).thenReturn(END);
      model.when(callsTo('get comment')).thenReturn(comment);
      model.when(callsTo('get projects')).thenReturn(projects);
      model.when(callsTo('get project')).thenReturn(null, 2);

      editor.overwriteViewDataWithTimeEntry();

      view.getLogs(callsTo('set:project', project)).verify(happenedOnce);
      view.getLogs(callsTo('set:availableActivities', project.activities)).verify(happenedOnce);
      view.getLogs(callsTo('set:activity', activity)).verify(happenedOnce);
    });

  });

}