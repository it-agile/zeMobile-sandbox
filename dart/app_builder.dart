class AppBuilder {
  App buildApp() {
  	LoginModel loginModel = new LoginModel();
  	LoginView loginView = new LoginView();
  	Login login = new Login(loginModel, loginView);
  	
  	return new App(login);
  }
  
}