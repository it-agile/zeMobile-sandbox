class TimeEntryEditorFactory {
  final ActivityProvider activityProvider;
  final ElementCreator elementCreator;
  final Expander expander;

  TimeEntryEditorFactory(this.elementCreator, this.expander, this.activityProvider);
  
  TimeEntryEditor createTimeEntryEditor(TimeEntry timeEntry) {
    TimeEntryEditorModel model = new TimeEntryEditorModel();
    TimeEntryEditorView view = new TimeEntryEditorView(elementCreator);
    return new TimeEntryEditor(timeEntry, activityProvider, model, view);
  }
}

class TimeEntryEditor {
  TimeEntry _timeEntry;
  ActivityProvider activityProvider;
  TimeEntryEditorModel model;
  TimeEntryEditorView view;
  
  TimeEntryEditor(this._timeEntry, this.activityProvider, this.model, this.view);
  
  Element createUI() {
    view.createUI();
    _updateTimeEntry(_timeEntry);
    
    return view.editorElement;
  }
  
  TimeEntry get timeEntry() => _timeEntry;
            set timeEntry(TimeEntry entry) => _updateTimeEntry(entry);
            
  void _updateTimeEntry(TimeEntry entry) {
    _timeEntry = entry;
    List<Project> projects = activityProvider.fetchedProjects;
    Activity activity = entry.activityId != null ? activityProvider.activityWithId(entry.activityId) : null;
    Project project = activity != null ? activityProvider.projectWithActivity(activity) : projects[0];
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
}

class TimeEntryEditorModel {
  
}

class TimeEntryEditorView {
  final ElementCreator elementCreator;
  Element editorElement;
  InputElement timeFromInput;
  InputElement timeToInput;
  SelectElement projectSelect;
  SelectElement activitySelect;
  TextAreaElement commentTextArea;
  
  TimeEntryEditorView(this.elementCreator);
  
  void createUI() {
    editorElement = elementCreator.createElement(Tags.DIV, [Classes.TIME_ENTRY,Classes.TIME_ENTRY_VIEW]);
    timeFromInput = elementCreator.createElement(Tags.INPUT, [Classes.TIME, Classes.ENTRY_TIME_FROM]);
    timeFromInput.type = 'time';
    timeFromInput.disabled = true;
    timeToInput = elementCreator.createElement(Tags.INPUT, [Classes.TIME, Classes.ENTRY_TIME_TO]);
    timeToInput.type = 'time';
    timeToInput.disabled = true;
    projectSelect = elementCreator.createElement(Tags.SELECT, [Classes.PROJECT]);
    projectSelect.disabled = true;
    activitySelect = elementCreator.createElement(Tags.SELECT, [Classes.PROJECT]);
    activitySelect.disabled = true;
    commentTextArea = elementCreator.createElement(Tags.TEXTAREA, [Classes.COMMENT]);
    commentTextArea.rows = 2;
    commentTextArea.disabled = true;
    
    editorElement.nodes.add(timeFromInput);
    editorElement.nodes.add(elementCreator.createElement(Tags.SPAN, [Classes.TIME_SEPARATOR]));
    editorElement.nodes.add(timeToInput);
    editorElement.nodes.add(projectSelect);
    editorElement.nodes.add(activitySelect);
    editorElement.nodes.add(commentTextArea);
  }
  
  void enableEditing(bool enabled) {
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
      OptionElement option = new Element.tag(Tags.OPTION);
      option.value = value(object);
      option.text = text(object);
      select.add(option, null);
    });
  }
  
  void _selectOption(SelectElement select, String value) {
    Element optionToSelect = select.namedItem(value);
    select.selectedIndex = select.nodes.indexOf(optionToSelect);
  }
}
