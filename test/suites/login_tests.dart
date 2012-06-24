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
  var describe = group;
  var it = test;
  
  describe('login model', () {
    LoginModel model = new LoginModel();
    setUp(() => document.window.localStorage.clear());
    
    it('should initially have no logged in user', () => expect(model.isUserLoggedIn(), isFalse));
    it('should return null if asked for the user before a user is logged in', () => expect(model.user, isNull));
    
    describe('after logging in a user', () {
      setUp(() {
        document.window.localStorage.clear();
        model.loginUser('user', 'passwd');
      });

      it('should have a logged in user', () => expect(model.isUserLoggedIn(), isTrue));
      it('should return a user if asked for it', () => expect(model.user, isNotNull));
      it('should return a user with the correct name', () => expect(model.user.name, equals('user')));
      it('should return a user with the correct password', () => expect(model.user.password, equals('passwd')));
    });
  });
  
  describe('login', () {
    LoginModelMock modelMock = new LoginModelMock();
    LoginViewMock viewMock = new LoginViewMock();
    Login login = new Login(modelMock, viewMock);
    bool callbackCalled = false;
    User loggedInUser;
    OnUserLoggedIn callback = (User user) {loggedInUser = user; callbackCalled = true;};
    
    describe('with no logged in user', () {
      setUp(() {
        document.window.localStorage.clear();
        login.loginUserIfNotAlreadyLoggedIn(callback);
      });

      it('should not call the callback', () => expect(callbackCalled, isFalse));
      it('should show the login dialog', () => expect(viewMock.showLoginDialogCalled, isTrue));
    });
    describe('with a logged in user', () {
      setUp(() {
        document.window.localStorage.clear();
        viewMock.showLoginDialogCalled = false;
        modelMock.user = new User('u', 'p');
        login.loginUserIfNotAlreadyLoggedIn(callback);
      });
      
      it('should call the callback', () => expect(callbackCalled, isTrue));
      it('should not show the login dialog', () => expect(viewMock.showLoginDialogCalled, isFalse));
    });
    
  });
}