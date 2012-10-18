class TimeEntryEditorModel {
  TimeEntry _entry;
  List<Project> _projects;
  final ActivityProvider activityProvider;
  final TimeEntryProvider timeEntryProvider;
  Activity _activityOfEntry;
  Project _projectOfEntry;

  TimeEntryEditorModel(TimeEntry timeEntry, this.activityProvider, this.timeEntryProvider) {
    updateTimeEntry(timeEntry);
  }

  List<Project> get projects => _projects;
  Activity get activity => _activityOfEntry;
  Project get project => _projectOfEntry;
  ZeTime get start => _entry.start;
  ZeTime get end => _entry.end;
  String get comment => _entry.comment;
  bool get currentlyBeingEdited => _entry.currentlyBeingEdited;
  bool get isEntryNew => _entry.id == null;
  List<Project> get recentProjects => activityProvider.recentProjects;

  List<Activity> recentActivitiesForProject(String projectName) {
    print("project with name $projectName ${activityProvider.projectWithName(projectName)}");
    activityProvider.recentActivitiesForProject(activityProvider.projectWithName(projectName));
  }


  bool isEditorOfEntry(TimeEntry timeEntry) {
    return timeEntry.id != null ? timeEntry.id == _entry.id : timeEntry.changeSlot == _entry.changeSlot;
  }

  bool shouldUpdateTimeEntry(TimeEntry timeEntry) {
    return !_entry.currentlyBeingEdited && _entry != timeEntry;
  }

  void updateTimeEntry(TimeEntry timeEntry) {
    _entry = timeEntry;
    _projects = activityProvider.fetchedProjects;
    _activityOfEntry = activityProvider.activityWithId(_entry.activityId);
    _projectOfEntry = _activityOfEntry != null ? activityProvider.projectWithActivity(_activityOfEntry) : null;
  }

  Future<String> saveChanges(int activityId, ZeTime start, ZeTime end, String comment) {
    _updateEntry(activityId, start, end, comment);

    activityProvider.addToRecentProjects(project);
    activityProvider.addToRecentActivitiesOfProject(project, activity);

    return timeEntryProvider.save(_entry);
  }

  Future<String> deleteEntry() {
    if (isEntryNew) {
      return new Future.immediate('OK');
    } else {
     return timeEntryProvider.delete(_entry);
    }
  }

  List<Activity> activitiesForProject(String projectName) {
    var project = activityProvider.projectWithName(projectName);
    return project.activities;
  }

  void rememberChanges(int activityId, ZeTime start, ZeTime end, String comment) {
    _updateEntry(activityId, start, end, comment);

    timeEntryProvider.rememberChangedTimeEntry(_entry);
  }

  void startEditing() {
    _entry.currentlyBeingEdited = true;

    timeEntryProvider.rememberChangedTimeEntry(_entry);
  }

  void cancelEditing() {
    _entry.currentlyBeingEdited = false;

    timeEntryProvider.revertChanges(_entry);
  }

  Future<String> _updateEntry(int activityId, ZeTime start, ZeTime end, String comment) {
    _entry.activityId = activityId;
    _entry.start = start;
    _entry.end = end;
    _entry.comment = comment;

    updateTimeEntry(_entry);
  }


}