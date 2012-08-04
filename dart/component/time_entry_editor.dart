class TimeEntryEditorFactory {
  final ActivityProvider activityProvider;
  final TimeEntryProvider timeEntryProvider;
  final Expander expander;

  TimeEntryEditorFactory(this.expander, this.activityProvider, this.timeEntryProvider);
  
  TimeEntryEditor createTimeEntryEditor(TimeEntry timeEntry) {
    TimeEntryEditorModel model = new TimeEntryEditorModel(timeEntry, activityProvider, timeEntryProvider);
    TimeEntryEditorView view = new TimeEntryEditorView();
    return new TimeEntryEditor(model, view);
  }
}

class TimeEntryEditor {
  final TimeEntryEditorModel model;
  final TimeEntryEditorView view;

  TimeEntryEditor(this.model, this.view);
  
  Element createUI() {
    view.createUI();
    view.activitiesDeterminer = model.activitiesForProject;
    overwriteViewDataWithTimeEntry();

    view.editButton.on.click.add(editTouched);
    view.cancelButton.on.click.add(cancelTouched);
    view.saveButton.on.click.add(saveTouched);
    view.deleteButton.on.click.add(deleteTouched);

    return view.editorElement;
  }

  void overwriteViewDataWithTimeEntry() {
    view.timeFrom = model.start;
    view.timeTo = model.end;
    view.comment = model.comment;
    var projects = model.projects;
    view.availableProjects = projects;
    var project = model.project;
    if (project != null) {
      view.project = project;
      view.availableActivities = project.activities;
      view.activity = model.activity;
    } else {
      view.project = projects[0];
      view.availableActivities = projects[0].activities;
      view.activity = projects[0].activities[0];
    }
  }

  void editEntry() {
    view.enableEditing(true);
  }
  
  void editTouched(Event event) {
    view.enableEditing(true);
    event.preventDefault();
  }
  
  void cancelTouched(Event event) {
    overwriteViewDataWithTimeEntry();
    view.enableEditing(false);
    event.preventDefault();
  }
  
  void saveTouched(Event event) {
    model.saveChanges(Math.parseInt(view.selectedActivityId),view.
      timeFrom, view.timeTo, view.comment).then((response) => view.enableEditing(false));
    event.preventDefault();
  }
  
  void deleteTouched(Event event) {
    model.deleteEntry().then((response) => removeEditor());
    event.preventDefault();
  }
  
  void removeEditor() {
    view.editorElement.remove();
  }
}