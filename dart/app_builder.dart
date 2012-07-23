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

      var activityRepository = new ActivityRepository();
      
      var activityProvider = new ActivityProvider(errorDisplay, activityRepository, webServiceRequester);

      var timeEntryRespository = new TimeEntryRepository();
      var timeEntryProvider = new TimeEntryProvider(errorDisplay, timeEntryRespository, webServiceRequester);
      
      var timeEntryEditorFactory = new TimeEntryEditorFactory(expander, activityProvider, timeEntryProvider);
      var dayDisplayFactory = new DayDisplayFactory(expander, timeEntryEditorFactory);
      var monthDisplayFactory = new MonthDisplayFactory(expander, dayDisplayFactory);
      
      var settingsView = new SettingsView(expander);
      var settings = new Settings(settingsView, activityProvider);
      
      app = new App(activityProvider, timeEntryProvider, monthDisplayFactory, settings, expander);
    }
    return app;
  }
}