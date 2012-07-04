class TimeEntryEditorFactory {
  final ActivityProvider activityProvider;
  final TimeEntryProvider timeEntryProvider;
  final Expander expander;

  TimeEntryEditorFactory(this.expander, this.activityProvider, this.timeEntryProvider);
  
  TimeEntryEditor createTimeEntryEditor(TimeEntry timeEntry) {
    TimeEntryEditorModel model = new TimeEntryEditorModel();
    TimeEntryEditorView view = new TimeEntryEditorView();
    return new TimeEntryEditor(timeEntry, activityProvider, timeEntryProvider, model, view);
  }
}

class TimeEntryEditor {
  TimeEntry _timeEntry;
  ActivityProvider activityProvider;
  final TimeEntryProvider timeEntryProvider;
  TimeEntryEditorModel model;
  TimeEntryEditorView view;
  int projectSelectinterval;
  int projectSelectIndex;
  
  TimeEntryEditor(this._timeEntry, this.activityProvider, this.timeEntryProvider, this.model, this.view);
  
  Element createUI() {
    view.createUI();
    _updateTimeEntry(_timeEntry);
    view.editButton.on.click.add(editTouched);
    view.cancelButton.on.click.add(cancelTouched);
    view.saveButton.on.click.add(saveTouched);
    view.deleteButton.on.click.add(deleteTouched);
    view.projectSelect.on.change.add((Event event) => projectSelected());

    view.projectSelect.on.focus.add((event) {
      projectSelectIndex = view.projectSelect.selectedIndex;
      projectSelectinterval = document.window.setInterval(projectSelected, 100);
    });
    view.projectSelect.on.blur.add((event) {document.window.clearInterval(projectSelectinterval);});
    return view.editorElement;
  }
  
  TimeEntry get timeEntry() => _timeEntry;
            set timeEntry(TimeEntry entry) => _updateTimeEntry(entry);
            
  void _updateTimeEntry(TimeEntry entry) {
    _timeEntry = entry;
    var projects = activityProvider.fetchedProjects;
    var activity = entry.activityId != null ? activityProvider.activityWithId(entry.activityId) : null;
    var project = activity != null ? activityProvider.projectWithActivity(activity) : projects[0];
    if (activity == null) activity = project.activities[0];
    
    if(entry.activityId != null) {
      view.timeFrom = entry.start;
      view.timeTo = entry.end;
      view.comment = entry.comment;
    }
    view.availableProjects = projects;
    view.project = project;
    view.availableActivities = project.activities;
    view.activity = activity;
  }
  
  void editEntry() {
    view.enableEditing(true);
  }
  
  void editTouched(Event event) {
    view.enableEditing(true);
    event.preventDefault();
  }
  
  void cancelTouched(Event event) {
    _updateTimeEntry(_timeEntry);
    view.enableEditing(false);
    event.preventDefault();
  }
  
  void saveTouched(Event event) {
    timeEntry.start = view.timeFrom;
    timeEntry.end = view.timeTo;
    timeEntry.activityId = Math.parseInt(view.activitySelect.value);
    timeEntry.comment = view.comment;
    
    timeEntryProvider.save(timeEntry, () => view.enableEditing(false));
    event.preventDefault();
  }
  
  void deleteTouched(Event event) {
    if (timeEntry.id == null) {
      removeEditor();
    } else {
      timeEntryProvider.delete(timeEntry, removeEditor);
    }
    event.preventDefault();
  }
  
  void removeEditor() {
    view.editorElement.remove();
  }
  
  void projectSelected() {
    if (projectSelectIndex != view.projectSelect.selectedIndex) {
      var projectName = view.projectSelect.value;
      var project = activityProvider.projectWithName(projectName);
      view.availableActivities = project.activities;
      projectSelectIndex = view.projectSelect.selectedIndex;
    }
  }
}

class TimeEntryEditorModel {
  
}

class TimeEntryEditorView {
  Element editorElement;
  InputElement timeFromInput;
  InputElement timeToInput;
  SelectElement projectSelect;
  SelectElement activitySelect;
  TextAreaElement commentTextArea;
  Element editButton;
  Element saveButton;
  Element deleteButton;
  Element cancelButton;
  
  void createUI() {
    editorElement = new DivElement();
    editorElement.classes.add(Classes.TIME_ENTRY);

    timeFromInput = new InputElement('time');
    timeFromInput.classes.addAll([Classes.TIME, Classes.ENTRY_TIME_FROM]);
    editorElement.nodes.add(timeFromInput);

    var timeSeparator = new SpanElement();
    timeSeparator.classes.add(Classes.TIME_SEPARATOR);
    editorElement.nodes.add(timeSeparator);

    timeToInput = new InputElement('time');
    timeToInput.classes.addAll([Classes.TIME, Classes.ENTRY_TIME_TO]);
    editorElement.nodes.add(timeToInput);

    projectSelect = new Element.tag('select');
    projectSelect.classes.add(Classes.PROJECT);
    editorElement.nodes.add(projectSelect);

    activitySelect = new Element.tag('select');
    activitySelect.classes.add(Classes.ACTIVITY);
    editorElement.nodes.add(activitySelect);

    commentTextArea = new TextAreaElement();
    commentTextArea.classes.add(Classes.COMMENT);
    commentTextArea.rows = 2;
    editorElement.nodes.add(commentTextArea);

    var editorActionsElement = new DivElement();
    editorActionsElement.classes.add(Classes.TIME_ENTRY_ACTIONS);
    editorElement.nodes.add(editorActionsElement);

    editButton = new AnchorElement();
    editButton.classes.add(Classes.TIME_ENTRY_EDIT);
    editButton.text = 'Editieren';
    editorActionsElement.nodes.add(editButton);

    saveButton = new AnchorElement();
    saveButton.classes.add(Classes.TIME_ENTRY_SAVE);
    saveButton.text = 'Sichern';
    editorActionsElement.nodes.add(saveButton);

    deleteButton = new AnchorElement();
    deleteButton.classes.add(Classes.TIME_ENTRY_DELETE);
    deleteButton.text = 'Löschen';
    editorActionsElement.nodes.add(deleteButton);

    cancelButton = new AnchorElement();
    cancelButton.classes.add(Classes.TIME_ENTRY_CANCEL);
    cancelButton.text = 'Abbrechen';
    editorActionsElement.nodes.add(cancelButton);

    enableEditing(false);
  }
  
  void enableEditing(bool enabled) {
    if (enabled) {
      editorElement.classes.remove(Classes.TIME_ENTRY_VIEW);
      editorElement.classes.add(Classes.TIME_ENTRY_EDITING);
      commentTextArea.placeholder = 'Kommentar (für Kunden sichtbar)';
    } else {
      editorElement.classes.remove(Classes.TIME_ENTRY_EDITING);
      editorElement.classes.add(Classes.TIME_ENTRY_VIEW);
      commentTextArea.placeholder = '';
    }
      
    timeFromInput.disabled = !enabled;
    timeToInput.disabled = !enabled;
    projectSelect.disabled = !enabled;
    activitySelect.disabled = !enabled;
    commentTextArea.disabled = !enabled;
  }
  
         set timeFrom(ZeTime time) => timeFromInput.value = time.toString();
  ZeTime get timeFrom() => new ZeTime.fromString(timeFromInput.value);
         set timeTo(ZeTime time) => timeToInput.value = time.toString();
  ZeTime get timeTo() => new ZeTime.fromString(timeToInput.value);
         set comment(String comment) => commentTextArea.value = comment;
  String get comment() => commentTextArea.value;
         set availableProjects(List<Project> projectList) => _replaceOptions(projectSelect, projectList, (p) => p.name, (p) => p.name);
         set availableActivities(List<Activity> activityList) => _replaceOptions(activitySelect, activityList, (a) => '${a.id}', (a) => a.name);
         set project(Project project) => _selectOption(projectSelect, project.name);
         set activity(Activity activity) => _selectOption(activitySelect, '${activity.id}');
         
  void _replaceOptions(SelectElement select, List objects, String value(object), String text(object)) {
    while(select.nodes.length > 0) {
      select.nodes[0].remove();
    }
    objects.forEach((object) {
      var option = new OptionElement(text(object), value(object));
      select.add(option, null);
    });
  }
  
  void _selectOption(SelectElement select, String value) {
    for(int i = 0; i < select.nodes.length; i++) {
      OptionElement option = select.nodes[i];
      if(option.value == value) {
        select.selectedIndex = i;
        break;
      }
      
    }
  }
}
