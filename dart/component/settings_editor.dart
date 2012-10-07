class SettingsEditor {
  SettingsEditorView view;
  ActivityProvider activityProvider;

  SettingsEditor(this.view, this.activityProvider);

  Element createUI() {
    view.createUI();

    view.reloadActivitiesButton.on.click.add(reloadActivitiesButtonTouched);
    view.reloadTimeEntriesButton.on.click.add(reloadTimeEntriesButtonTouched);
    view.changeLoginButton.on.click.add(changeLoginButtonTouched);

    return view.containerElement;
  }

  reloadActivitiesButtonTouched(Event event) {
    activityProvider.refetchProjects();
  }

  reloadTimeEntriesButtonTouched(Event event) {

  }

  changeLoginButtonTouched(Event event) {

  }
}

class SettingsEditorView {
  Expander expander;
  Element containerElement;
  Element reloadActivitiesButton;
  Element reloadTimeEntriesButton;
  InputElement userNameInput;
  InputElement passwordInput;
  Element changeLoginButton;

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

    var reloadSection = new DivElement();
    reloadSection.classes.addAll([Classes.RELOAD_SECTION, Classes.SECTION]);
    content.nodes.add(reloadSection);

    var reloadSectionTitle = new SpanElement();
    reloadSectionTitle.classes.add(Classes.SECTION_TITLE);
    reloadSection.nodes.add(reloadSectionTitle);
    reloadSectionTitle.text = 'Neu laden';

    reloadActivitiesButton = new AnchorElement();
    reloadActivitiesButton.classes.add(Classes.RELOAD_ACTIVITIES);
    reloadActivitiesButton.text = 'Tätigkeiten';
    reloadSection.nodes.add(reloadActivitiesButton);

    reloadTimeEntriesButton = new AnchorElement();
    reloadTimeEntriesButton.classes.add(Classes.RELOAD_TIME_ENTRIES);
    reloadTimeEntriesButton.text = 'Zeiten';

    var loginSection = new DivElement();
    loginSection.classes.addAll([Classes.LOGIN_SECTION, Classes.SECTION]);

    var loginSectionTitle = new SpanElement();
    loginSectionTitle.classes.add(Classes.SECTION_TITLE);
    loginSectionTitle.text = 'Login ändern';
    loginSection.nodes.add(loginSectionTitle);

    userNameInput = new InputElement();
    userNameInput.type = 'text';
    userNameInput.placeholder = 'Name';
    userNameInput.attributes['autocapitalize'] = 'off';
    userNameInput.attributes['autocorrect'] = 'off';
    loginSection.nodes.add(userNameInput);

    passwordInput = new InputElement();
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Passwort';
    loginSection.nodes.add(passwordInput);

    changeLoginButton = new AnchorElement();
    changeLoginButton.classes.add(Classes.CHANGE_LOGIN);
    changeLoginButton.text = 'Ändern';
    loginSection.nodes.add(changeLoginButton);

    var versionInfo = new DivElement();
    versionInfo.classes.add(Classes.VERSION_INFO);
    versionInfo.text = 'Build @@ZE_BUILD_NUMBER@@ / @@ZE_BUILD_TIME@@';
    content.nodes.add(versionInfo);

    expander.connect(containerElement);
    expander.collapse(containerElement);
  }
}
