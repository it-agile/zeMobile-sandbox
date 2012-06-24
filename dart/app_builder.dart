class AppBuilder {
  static App app = null;
  static App buildApp() {
    if (app == null) {
      ErrorDisplay errorDisplay = new ErrorDisplay();
      ElementCreator elementCreator = new ElementCreator();
      Expander expander = new Expander();

      LoginModel loginModel = new LoginModel();
      LoginView loginView = new LoginView();
      Login login = new Login(loginModel, loginView);
      
      WebServiceRequester webServiceRequester = new WebServiceRequester(login);

      ActivityRepository activityRepository = new ActivityRepository();
      
      ActivityProvider activityProvider = new ActivityProvider(errorDisplay, activityRepository, webServiceRequester);
      TimeEntryProvider timeEntryProvider = new TimeEntryProvider(errorDisplay, webServiceRequester);
      
      TimeEntryEditorFactory timeEntryEditorFactory = new TimeEntryEditorFactory(elementCreator, expander, activityProvider, timeEntryProvider);
      DayDisplayFactory dayDisplayFactory = new DayDisplayFactory(elementCreator, expander, timeEntryEditorFactory);
      MonthDisplayFactory monthDisplayFactory = new MonthDisplayFactory(elementCreator, expander, dayDisplayFactory);
      
      SettingsView settingsView = new SettingsView(elementCreator, expander);
      Settings settings = new Settings(settingsView, activityProvider);
      
      app = new App(activityProvider, timeEntryProvider, monthDisplayFactory, settings, expander);
    }
    return app;
  }
}