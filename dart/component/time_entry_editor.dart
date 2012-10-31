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
    view.recentActivitiesDeterminer = model.recentActivitiesForProject;
    overwriteViewDataWithTimeEntry();

    view.editButton.on.click.add(editTouched);
    view.cancelButton.on.click.add(cancelTouched);
    view.saveButton.on.click.add(saveTouched);
    view.deleteButton.on.click.add(deleteTouched);

    view.timeFromInput.on.change.add(timeEntryChanged);
    view.timeToInput.on.change.add(timeEntryChanged);
    view.projectSelect.on.change.add(timeEntryChanged);
    view.activitySelect.on.change.add(timeEntryChanged);
    view.commentTextArea.on.change.add(timeEntryChanged);
    return view.editorElement;
  }

  bool isEditorOfEntry(TimeEntry timeEntry) {
    return model.isEditorOfEntry(timeEntry);
  }

  void updateTimeEntry(TimeEntry timeEntry) {
    if(model.shouldUpdateTimeEntry(timeEntry)) {
      model.updateTimeEntry(timeEntry);
      overwriteViewDataWithTimeEntry();
    }
  }

  void overwriteViewDataWithTimeEntry() {
    view.timeFrom = model.start;
    view.timeTo = model.end;
    view.comment = model.comment;
    var projects = model.projects;
    var recentProjects = model.recentProjects;
    view.setupProjects(recentProjects, projects);
    var project = model.project;
    if (project != null) {
      view.project = project;
      view.projectSelected();
      view.activity = model.activity;
    } else {
      project = !recentProjects.isEmpty ? recentProjects[0] : projects[0];
      view.project = project;
      view.projectSelected();
      var recentActivities = model.recentActivitiesForProject(project.name);
      view.activity = !recentActivities.isEmpty ? recentActivities[0] : project.activities[0];
    }
    view.enableEditing(model.currentlyBeingEdited);
  }

  void timeEntryChanged(Event event) {
    model.rememberChanges(parseInt(view.selectedActivityId),view.
          timeFrom, view.timeTo, view.comment);
  }

  void editTouched(Event event) {
    model.startEditing();
    view.enableEditing(model.currentlyBeingEdited);
    event.preventDefault();
  }
  
  void cancelTouched(Event event) {
    model.cancelEditing();
    view.enableEditing(model.currentlyBeingEdited);
    event.preventDefault();
  }
  
  void saveTouched(Event event) {
    model.saveChanges(parseInt(view.selectedActivityId),view.
      timeFrom, view.timeTo, view.comment).then((response) => view.enableEditing(model.currentlyBeingEdited));
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