class Settings {
  SettingsView view;
  ActivityProvider activityProvider;

  Settings(this.view, this.activityProvider);

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

class SettingsView {
  ElementCreator elementCreator;
  Expander expander;
  Element containerElement;
  Element reloadActivitiesButton;
  Element reloadTimeEntriesButton;
  InputElement userNameInput;
  InputElement passwordInput;
  Element changeLoginButton;

  SettingsView(this.elementCreator, this.expander);

  createUI() {
    containerElement = elementCreator.createElement(Tags.DIV, [Classes.SETTINGS, Classes.CONTAINER]);

    var header = elementCreator.createElement(Tags.DIV, [Classes.SETTINGS_HEADER, Classes.HEADER], containerElement);
    var title = elementCreator.createElement(Tags.SPAN, [Classes.SETTINGS_TITLE], header);
    title.text = 'Einstellungen';
    var floatRight = elementCreator.createElement(Tags.SPAN, [Classes.FLOAT_RIGHT], header);
    var expanderElement = elementCreator.createElement(Tags.SPAN, [Classes.EXPANDER], floatRight);

    var content = elementCreator.createElement(Tags.DIV, [Classes.SETTINGS_CONTENT, Classes.CONTENT],
      containerElement);

    var reloadSection = elementCreator.createElement(Tags.DIV, [Classes.RELOAD_SECTION, Classes.SECTION], content);
    var reloadSectionTitle = elementCreator.createElement(Tags.SPAN, [Classes.SECTION_TITLE], reloadSection);
    reloadSectionTitle.text = 'Neu laden';
    reloadActivitiesButton = elementCreator.createElement(Tags.A, [Classes.RELOAD_ACTIVITIES], reloadSection);
    reloadActivitiesButton.text = 'Tätigkeiten';
    reloadTimeEntriesButton = elementCreator.createElement(Tags.A, [Classes.RELOAD_TIME_ENTRIES]);
    reloadTimeEntriesButton.text = 'Zeiten';

    var loginSection = elementCreator.createElement(Tags.DIV, [Classes.LOGIN_SECTION, Classes.SECTION]);
    var loginSectionTitle = elementCreator.createElement(Tags.SPAN, [Classes.SECTION_TITLE], loginSection);
    loginSectionTitle.text = 'Login ändern';
    userNameInput = elementCreator.createElement(Tags.INPUT, [], loginSection);
    userNameInput.type = 'text';
    userNameInput.placeholder = 'Name';
    userNameInput.attributes['autocapitalize'] = 'off';
    userNameInput.attributes['autocorrect'] = 'off';
    passwordInput = elementCreator.createElement(Tags.INPUT, [], loginSection);
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Passwort';
    changeLoginButton = elementCreator.createElement(Tags.A, [Classes.CHANGE_LOGIN], loginSection);
    changeLoginButton.text = 'Ändern';
    
    var versionInfo = elementCreator.createElement(Tags.DIV, [Classes.VERSION_INFO], content);
    versionInfo.text = 'Build @@ZE_BUILD_NUMBER@@ / @@ZE_BUILD_TIME@@';

    expander.connect(containerElement);
    expander.collapse(containerElement);
  }
}
