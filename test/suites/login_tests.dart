class LoginModelMock extends Mock implements LoginModel {}
class LoginViewMock extends Mock implements LoginView {}



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
    var modelMock = new LoginModelMock();
    var viewMock = new LoginViewMock();
    var login = new Login(modelMock, viewMock);
    var userFuture = null;

    resetMocks() {
      document.window.localStorage.clear();
      modelMock.log.logs.clear();
      viewMock.log.logs.clear();
    }

    describe('with no logged in user', () {
      setUp(() {
        resetMocks();
        modelMock.when(callsTo('isUserLoggedIn')).thenReturn(false);
        viewMock.when(callsTo('showLoginDialog')).thenReturn(new Future.immediate(true));
        viewMock.when(callsTo('get userName')).thenReturn('bob');
        viewMock.when(callsTo('get password')).thenReturn('test');
        userFuture = login.loginUserIfNotAlreadyLoggedIn();
      });

      it('should login the user with the specified name and password', () =>
        modelMock.getLogs(callsTo('loginUser', 'bob', 'test')).verify(happenedOnce));
      it('should get the logged in user from the model', () =>
        modelMock.getLogs(callsTo('get user')).verify(happenedOnce));
    });
    describe('with a logged in user', () {
      setUp(() {
        resetMocks();
        modelMock.when(callsTo('isUserLoggedIn')).thenReturn(true);
        modelMock.when(callsTo('get user')).thenReturn(new User('u', 'p'));
        userFuture = login.loginUserIfNotAlreadyLoggedIn();
      });
      
      it('should not show the login dialog', () => viewMock.getLogs(callsTo('showLoginDialog')).verify(neverHappened));
      it('should return a Future containing the logged in user', () => expect(userFuture.value.name, equals('u')));
    });
    
  });
}