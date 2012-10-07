class AppBuilder {
  static App app = null;
  static App buildApp() {
    if (app == null) {
      var errorDisplay = new ErrorDisplay();
      var expander = new Expander();

      var userRepository = new UserRepository();

      var loginModel = new LoginModel(userRepository);
      var loginView = new LoginView();
      Login login = new Login(loginModel, loginView);
      
      var webServiceRequester = new WebServiceRequester(login);

      var settingsRepository = new SettingsRepository();
      var settingsProvider = new SettingsProvider(settingsRepository);

      var activityRepository = new ActivityRepository();
      var activityProvider = new ActivityProvider(errorDisplay, activityRepository, settingsProvider, webServiceRequester);

      var timeEntryRepository = new TimeEntryRepository();
      var timeEntryProvider = new TimeEntryProvider(errorDisplay, timeEntryRepository, webServiceRequester);
      
      var timeEntryEditorFactory = new TimeEntryEditorFactory(expander, activityProvider, timeEntryProvider);
      var dayDisplayFactory = new DayDisplayFactory(expander, timeEntryEditorFactory);
      var monthDisplayFactory = new MonthDisplayFactory(expander, dayDisplayFactory);
      
      var settingsView = new SettingsEditorView(expander);
      var settings = new SettingsEditor(settingsView, activityProvider);
      
      app = new App(activityProvider, timeEntryProvider, monthDisplayFactory, settings, expander);
    }
    return app;
  }
}