void timeEntryEditorModelTests() {
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
      timeEntry = new TimeEntry(id: TIME_ENTRY_ID, activityId: ACTIVITY_ID, date: DATE, start: START, end: END, comment: COMMENT);
      activitProvider.when(callsTo('get fetchedProjects')).alwaysReturn(projects);
      activitProvider.when(callsTo('activityWithId', ACTIVITY_ID)).thenReturn(activity);
      activitProvider.when(callsTo('projectWithActivity', activity)).thenReturn(project);
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

      activitProvider.when(callsTo('activityWithId', ACTIVITY_ID + 1)).thenReturn(activity);
      activitProvider.when(callsTo('projectWithActivity', activity)).thenReturn(project);

      model.saveChanges(activityId, start, end, comment);

      expect(timeEntry.activityId, equals(activityId));
      expect(timeEntry.date, equals(DATE));
      expect(timeEntry.start, equals(start));
      expect(timeEntry.end, equals(end));
      expect(timeEntry.comment, equals(comment));
    });

    test('should save the time entry via time entry provider when asked to save changes', () {
      activitProvider.when(callsTo('activityWithId', ACTIVITY_ID + 1)).thenReturn(activity);
      activitProvider.when(callsTo('projectWithActivity', activity)).thenReturn(project);

      model.saveChanges(ACTIVITY_ID + 1, null, null, null);

      timeEntryProvider.getLogs(callsTo('save', timeEntry)).verify(happenedOnce);
    });

    test('should save project as recent project when saving a time entry', () {
      activitProvider.when(callsTo('activityWithId', ACTIVITY_ID + 1)).thenReturn(activity);
      activitProvider.when(callsTo('projectWithActivity', activity)).thenReturn(project);

      model.saveChanges(ACTIVITY_ID + 1, null, null, null);

      activitProvider.getLogs(callsTo('addToRecentProjects', project)).verify(happenedOnce);
    });

    test('should save activity as recent activity when saving a time entry', () {
      activitProvider.when(callsTo('activityWithId', ACTIVITY_ID + 1)).thenReturn(activity);
      activitProvider.when(callsTo('projectWithActivity', activity)).thenReturn(project);

      model.saveChanges(ACTIVITY_ID + 1, null, null, null);

      activitProvider.getLogs(callsTo('addToRecentActivitiesOfProject', project, activity)).verify(happenedOnce);
    });

    test('should get the project with the matching name and return its activities when asked for them', () {
      var project = new Project('P1', []);
      activitProvider.when(callsTo('projectWithName', 'P1')).thenReturn(project);
      expect(model.activitiesForProject('P1'), same(project.activities));
    });

    test('should update the time entry when remembering changes', () {
      activitProvider.when(callsTo('activityWithId', 2)).thenReturn(activity);
      activitProvider.when(callsTo('projectWithActivity', activity)).thenReturn(project);

      model.rememberChanges(2, null, null, 'test');

      expect(timeEntry.activityId, equals(2));
      expect(timeEntry.comment, equals('test'));
    });

    test('should pass the updated time entry to the time entry provider when remembering changes', () {
      activitProvider.when(callsTo('activityWithId', 2)).thenReturn(activity);
      activitProvider.when(callsTo('projectWithActivity', activity)).thenReturn(project);

      model.rememberChanges(2, null, null, 'test');

      timeEntryProvider.getLogs(callsTo('rememberChangedTimeEntry', timeEntry)).verify(happenedOnce);
    });

    test('should set the editing flag on the time entry when starting editing', () {
      model.startEditing();
      expect(timeEntry.currentlyBeingEdited, isTrue);
    });

    test('should pass the time entry to the time entry provider when starting editing', () {
      model.startEditing();
      timeEntryProvider.getLogs(callsTo('rememberChangedTimeEntry', timeEntry)).verify(happenedOnce);
    });

  });
}