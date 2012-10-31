class SettingsEditor {
  SettingsEditorView view;
  ActivityProvider activityProvider;
  SettingsProvider settingsProvider;

  SettingsEditor(this.view, this.activityProvider, this.settingsProvider);

  Element createUI() {
    view.createUI();

    view.reloadActivitiesButton.on.click.add(reloadActivitiesButtonTouched);
    var settings = settingsProvider.settings;
    view.maxRecentProjectsInput.value = '${settings.numberOfRecentProjects}';
    view.maxRecentProjectsInput.on.change.add(changeNumberOfRecentProjects);
    view.maxRecentActivitiesInput.value = '${settings.numberOfRecentActivities}';
    view.maxRecentActivitiesInput.on.change.add(changeNumberOfRecentActivities);


    return view.containerElement;
  }

  changeNumberOfRecentProjects(Event event) {
    settingsProvider.settings.numberOfRecentProjects = int.parse(view.maxRecentProjectsInput.value);
    settingsProvider.settings = settingsProvider.settings;

  }

  changeNumberOfRecentActivities(Event event) {
    settingsProvider.settings.numberOfRecentActivities = int.parse(view.maxRecentActivitiesInput.value);
    settingsProvider.settings = settingsProvider.settings;
  }

  reloadActivitiesButtonTouched(Event event) {
    activityProvider.refetchProjects();
  }
}

class SettingsEditorView {
  Expander expander;
  Element containerElement;
  Element reloadActivitiesButton;
  InputElement maxRecentProjectsInput;
  InputElement maxRecentActivitiesInput;

  SettingsEditorView(this.expander);

  createUI() {
    containerElement = new DivElement();
    containerElement.classes.addAll([Classes.SETTINGS, Classes.CONTAINER]);

    var header = new DivElement();
    header.classes.addAll([Classes.SETTINGS_HEADER, Classes.HEADER]);
    containerElement.nodes.add(header);

    var title = new SpanElement();
    title.classes.add(Classes.SETTINGS_TITLE);
    title.text = 'Einstellungen';
    header.nodes.add(title);

    var floatRight = new SpanElement();
    floatRight.classes.add(Classes.FLOAT_RIGHT);
    header.nodes.add(floatRight);

    var expanderElement = new SpanElement();
    expanderElement.classes.add(Classes.EXPANDER);
    floatRight.nodes.add(expanderElement);

    var content = new DivElement();
    content.classes.addAll([Classes.SETTINGS_CONTENT, Classes.CONTENT]);
    containerElement.nodes.add(content);

    var recentSection = new DivElement();
    recentSection.classes.addAll([Classes.LOGIN_SECTION, Classes.SECTION]);

    var recentSectionTitle = new SpanElement();
    recentSectionTitle.classes.add(Classes.SECTION_TITLE);
    recentSectionTitle.text = 'Kürzlich Verwendetes';
    recentSection.nodes.add(recentSectionTitle);

    maxRecentProjectsInput = new InputElement();
    maxRecentProjectsInput.type = 'number';
    maxRecentProjectsInput.min = '1';
    maxRecentProjectsInput.max = '10';
    maxRecentProjectsInput.step = '1';
    recentSection.nodes.add(wrapInDiv([maxRecentProjectsInput, createLabel(maxRecentProjectsInput, 'maxRecentProjects', 'Projekte maximal')]));

    maxRecentActivitiesInput = new InputElement();
    maxRecentActivitiesInput.type = 'number';
    maxRecentActivitiesInput.min = '1';
    maxRecentActivitiesInput.max = '10';
    maxRecentActivitiesInput.step = '1';
    recentSection.nodes.add(wrapInDiv([maxRecentActivitiesInput, createLabel(maxRecentActivitiesInput, 'maxRecentActivities', 'Tätigkeiten maximal')]));

    content.nodes.add(recentSection);

    reloadActivitiesButton = new AnchorElement();
    reloadActivitiesButton.classes.add(Classes.RELOAD_ACTIVITIES);
    reloadActivitiesButton.text = 'Tätigkeiten neu laden';
    content.nodes.add(reloadActivitiesButton);

    var versionInfo = new DivElement();
    versionInfo.classes.add(Classes.VERSION_INFO);
    versionInfo.text = 'Build @@ZE_BUILD_NUMBER@@ / @@ZE_BUILD_TIME@@';
    content.nodes.add(versionInfo);

    expander.connect(containerElement);
    expander.collapse(containerElement);
  }

  LabelElement createLabel(Element element, String elementId, String labelText) {
    element.id = elementId;
    var maxRecentProjectsLabel = new LabelElement();
    maxRecentProjectsLabel.text = labelText;
    maxRecentProjectsLabel.htmlFor = element.id;
    return maxRecentProjectsLabel;
  }

  DivElement wrapInDiv(List<Element> elementList) {
    var div = new DivElement();
    div.nodes.addAll(elementList);
    return div;
  }


}
