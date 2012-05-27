class LoginModelMock extends LoginModel {
  bool loginUserCalled = false;

  void loginUser(String userName, String password) {
    loginUserCalled = true;
    super.loginUser(userName, password);
  }
}

class LoginViewMock extends LoginView {
  bool showLoginDialogCalled = false;
  void showLoginDialog(OnLoginDialogFinished callback) {
    showLoginDialogCalled = true;
  }
}



void loginTests() {
  describe('login model', () {
    LoginModel model = new LoginModel();
    beforeEach(() => document.window.localStorage.clear());
    
    it('should initially have no logged in user', () => expect(model.isUserLoggedIn()).to(beFalse()));
    it('should return null if asked for the user before a user is logged in', () => expect(model.user).to(beNull()));
    
    describe('after logging in a user', () {
      model.loginUser('user', 'passwd');

      it('should have a logged in user', () => expect(model.isUserLoggedIn()).to(beTrue()));
      it('should return a user if asked for it', () => expect(model.user).to(not(beNull())));
      it('should return a user with the correct name', () => expect(model.user.name).to(equal('user')));
      it('should return a user with the correct password', () => expect(model.user.password).to(equal('passwd')));
    });
  });
  
  describe('login', () {
    LoginModelMock modelMock = new LoginModelMock();
    LoginViewMock viewMock = new LoginViewMock();
    Login login = new Login(modelMock, viewMock);
    bool callbackCalled = false;
    User loggedInUser;
    OnUserLoggedIn callback = (User user) {loggedInUser = user; callbackCalled = true;};
    
    beforeEach(() => document.window.localStorage.clear());
    
    describe('with no logged in user', () {
      login.loginUserIfNotAlreadyLoggedIn(callback);
      it('should not call the callback', () => expect(callbackCalled).to(beFalse()));
      it('should show the login dialog', () => expect(viewMock.showLoginDialogCalled).to(beTrue()));
    });
    describe('with a logged in user', () {
      viewMock.showLoginDialogCalled = false;
      modelMock.user = new User('u', 'p');
      login.loginUserIfNotAlreadyLoggedIn(callback);
      it('should call the callback', () => expect(callbackCalled).to(beTrue()));
      it('should not show the login dialog', () => expect(viewMock.showLoginDialogCalled).to(beFalse()));
    });
    
  });
}