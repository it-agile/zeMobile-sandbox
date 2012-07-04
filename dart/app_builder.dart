class AppBuilder {
  static App app = null;
  static App buildApp() {
    if (app == null) {
      ErrorDisplay errorDisplay = new ErrorDisplay();
      Expander expander = new Expander();

      LoginModel loginModel = new LoginModel();
      LoginView loginView = new LoginView();
      Login login = new Login(loginModel, loginView);
      
      WebServiceRequester webServiceRequester = new WebServiceRequester(login);

      ActivityRepository activityRepository = new ActivityRepository();
      
      ActivityProvider activityProvider = new ActivityProvider(errorDisplay, activityRepository, webServiceRequester);
      TimeEntryProvider timeEntryProvider = new TimeEntryProvider(errorDisplay, webServiceRequester);
      
      TimeEntryEditorFactory timeEntryEditorFactory = new TimeEntryEditorFactory(expander, activityProvider, timeEntryProvider);
      DayDisplayFactory dayDisplayFactory = new DayDisplayFactory(expander, timeEntryEditorFactory);
      MonthDisplayFactory monthDisplayFactory = new MonthDisplayFactory(expander, dayDisplayFactory);
      
      SettingsView settingsView = new SettingsView(expander);
      Settings settings = new Settings(settingsView, activityProvider);
      
      app = new App(activityProvider, timeEntryProvider, monthDisplayFactory, settings, expander);
    }
    return app;
  }
}