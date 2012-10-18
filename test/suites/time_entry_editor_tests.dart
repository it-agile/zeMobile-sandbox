void timeEntryEditorTests() {
  final TIME_ENTRY_ID = 42;
  final ACTIVITY_ID = 76;
  final DATE = const ZeDate(5,3,2012);
  final START = const ZeTime(9,0);
  final END = const ZeTime(12,30);
  final COMMENT = "comment";

  group('A time entry editor', () {
    var model = new TimeEntryEditorModelMock();
    var view = new TimeEntryEditorViewMock();
    var editor = new TimeEntryEditor(model, view);

    var comment = 'test';
    var activity = new Activity(ACTIVITY_ID, 'A1');
    var activities = [activity];
    var project = new Project('P1', activities);
    var recentProject = new Project('P2', []);
    var projects = [project];
    var recentProjects = [recentProject];

    setUp(() => clearMocks([model, view]));

    test('should enable editing when edit button is tousched', () {
      model.when(callsTo('get currentlyBeingEdited')).thenReturn(true);
      editor.editTouched(new EventMock());
      view.getLogs(callsTo('enableEditing', true)).verify(happenedOnce);
    });

    void configureOverwrite() {
      model.when(callsTo('get start')).thenReturn(START);
      model.when(callsTo('get end')).thenReturn(END);
      model.when(callsTo('get comment')).thenReturn(comment);
      model.when(callsTo('get projects')).thenReturn(projects);
      model.when(callsTo('get recentProjects')).thenReturn(recentProjects);
      model.when(callsTo('get project')).thenReturn(project);
      model.when(callsTo('get activity')).thenReturn(activity);
    }

    test('should disable editing when cancel is touched', () {
      model.when(callsTo('get currentlyBeingEdited')).thenReturn(false);
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
      model.when(callsTo('get currentlyBeingEdited')).thenReturn(false);

      editor.saveTouched(new EventMock());

      view.getLogs(callsTo('enableEditing', false)).verify(happenedOnce);
    });

    test('should not update time entry in model when updating is not needed according to model', () {
      var timeEntry = new TimeEntry();
      model.when(callsTo('shouldUpdateTimeEntry', timeEntry)).thenReturn(false);

      editor.updateTimeEntry(timeEntry);

      model.getLogs(callsTo('updateTimeEntry', timeEntry)).verify(neverHappened);
    });

    test('should update time entry in model when updating the time entry', () {
      configureOverwrite();
      var timeEntry = new TimeEntry();
      model.when(callsTo('shouldUpdateTimeEntry', timeEntry)).thenReturn(true);

      editor.updateTimeEntry(timeEntry);

      model.getLogs(callsTo('updateTimeEntry', timeEntry)).verify(happenedOnce);
    });

    test('should overwrite all changes in the UI with data from the time entry when updating the time entry', () {
      configureOverwrite();
      var timeEntry = new TimeEntry();
      model.when(callsTo('shouldUpdateTimeEntry', timeEntry)).thenReturn(true);

      editor.updateTimeEntry(timeEntry);

      view.getLogs(callsTo('set:timeFrom', START)).verify(happenedOnce);
      view.getLogs(callsTo('set:timeTo', END)).verify(happenedOnce);
      view.getLogs(callsTo('set:comment', comment)).verify(happenedOnce);
      view.getLogs(callsTo('setupProjects', recentProjects, projects)).verify(happenedOnce);
      view.getLogs(callsTo('set:project', project)).verify(happenedOnce);
      view.getLogs(callsTo('set:activity', activity)).verify(happenedOnce);
    });



    test('while overwritting UI with data from time entry should set the first project and its first activity if time entry has no project', () {
      model.when(callsTo('get start')).thenReturn(START);
      model.when(callsTo('get end')).thenReturn(END);
      model.when(callsTo('get comment')).thenReturn(comment);
      model.when(callsTo('get projects')).thenReturn(projects);
      model.when(callsTo('get project')).thenReturn(null, 2);

      editor.overwriteViewDataWithTimeEntry();

      view.getLogs(callsTo('set:project', project)).verify(happenedOnce);
      view.getLogs(callsTo('set:activity', activity)).verify(happenedOnce);
    });

  });

}