class AppBuilder {
  static App app = null;
  static App buildApp() {
    if (app == null) {
      LoginModel loginModel = new LoginModel();
      LoginView loginView = new LoginView();
      Login login = new Login(loginModel, loginView);
      
      WebServiceRequester webServiceRequester = new WebServiceRequester(login);
      
      ActivityProviderModel activityProviderModel = new ActivityProviderModel(webServiceRequester);
      ActivityProviderView activityProviderView = new ActivityProviderView();
      ActivityProvider activityProvider = new ActivityProvider(activityProviderModel, activityProviderView);
      
      app = new App(activityProvider);
    }
    return app;
  }
}