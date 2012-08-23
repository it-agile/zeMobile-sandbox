typedef ActivitiesForProjectDeterminer(String projectName);

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
  ActivitiesForProjectDeterminer activitiesDeterminer;

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
    setUpProjectSelectionAutoUpdate();
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

         set timeFrom(ZeTime time) => timeFromInput.value = time != null ? time.toString() : '';
  ZeTime get timeFrom => new ZeTime.fromString(timeFromInput.value);
         set timeTo(ZeTime time) => timeToInput.value = time != null ? time.toString() : '';
  ZeTime get timeTo => new ZeTime.fromString(timeToInput.value);
         set comment(String comment) => commentTextArea.value = (comment != null ? comment : '');
  String get comment => commentTextArea.value;
         set availableProjects(List<Project> projectList) => _replaceOptions(projectSelect, projectList, (p) => p.name, (p) => p.name);
         set availableActivities(List<Activity> activityList) => _replaceOptions(activitySelect, activityList, (a) => '${a.id}', (a) => a.name);
         set project(Project project) {if(project != null) _selectOption(projectSelect, project.name);}
         set activity(Activity activity) {if(activity != null) _selectOption(activitySelect, '${activity.id}');}
  String get selectedActivityId => activitySelect.value;

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

  int _projectSelectIntervalId;
  int _projectSelectIndex;

  void setUpProjectSelectionAutoUpdate() {
    projectSelect.on.change.add((Event event) => projectSelected());

    projectSelect.on.focus.add((event) {
      _projectSelectIndex = projectSelect.selectedIndex;
      _projectSelectIntervalId = document.window.setInterval(projectSelected, 100);
    });
    projectSelect.on.blur.add((event) {document.window.clearInterval(_projectSelectIntervalId);});
  }

  void projectSelected() {
    if (_projectSelectIndex != projectSelect.selectedIndex) {
      availableActivities = activitiesDeterminer(projectSelect.value);
      _projectSelectIndex = projectSelect.selectedIndex;
    }
  }
}
