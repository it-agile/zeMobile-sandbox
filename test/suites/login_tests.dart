class LoginModelMock extends Mock implements LoginModel {}
class LoginViewMock extends Mock implements LoginView {}
class UserRepositoryMock extends Mock implements UserRepository {}

void loginTests() {
  group('login model', () {
    var user = new User('u', 'p');
    var userRepository = new UserRepositoryMock();
    var model = new LoginModel(userRepository);
    setUp(() {
      userRepository.log.logs.clear();
    });
    
    test('should initially have no logged in user', () => expect(model.isUserLoggedIn(), isFalse));
    test('should return null if asked for the user before a user is logged in', () => expect(model.user, isNull));
    test('should save the user after a user logs in', () {
      model.loginUser('u', 'p');
      userRepository.getLogs(callsTo('saveUser', equals(user))).verify(happenedOnce);
    });
    
    group('after logging in a user', () {
      setUp(() {
        userRepository.log.logs.clear();
        userRepository.when(callsTo('loadUser')).thenReturn(user);
      });

      test('should have a logged in user', () => expect(model.isUserLoggedIn(), isTrue));
      test('should return the user loaded from the repository', () => expect(model.user, equals(user)));
    });
  });
  
  group('login', () {
    var modelMock = new LoginModelMock();
    var viewMock = new LoginViewMock();
    var login = new Login(modelMock, viewMock);
    var userFuture = null;

    resetMocks() {
      document.window.localStorage.clear();
      modelMock.log.logs.clear();
      viewMock.log.logs.clear();
    }

    group('with no logged in user', () {
      setUp(() {
        resetMocks();
        modelMock.when(callsTo('isUserLoggedIn')).thenReturn(false);
        viewMock.when(callsTo('showLoginDialog')).thenReturn(new Future.immediate(true));
        viewMock.when(callsTo('get userName')).thenReturn('bob');
        viewMock.when(callsTo('get password')).thenReturn('test');
        userFuture = login.loginUserIfNotAlreadyLoggedIn();
      });

      test('should login the user with the specified name and password', () =>
        modelMock.getLogs(callsTo('loginUser', 'bob', 'test')).verify(happenedOnce));
      test('should get the logged in user from the model', () =>
        modelMock.getLogs(callsTo('get user')).verify(happenedOnce));
    });
    group('with a logged in user', () {
      setUp(() {
        resetMocks();
        modelMock.when(callsTo('isUserLoggedIn')).thenReturn(true);
        modelMock.when(callsTo('get user')).thenReturn(new User('u', 'p'));
        userFuture = login.loginUserIfNotAlreadyLoggedIn();
      });
      
      test('should not show the login dialog', () => viewMock.getLogs(callsTo('showLoginDialog')).verify(neverHappened));
      test('should return a Future containing the logged in user', () => expect(userFuture.value.name, equals('u')));
    });
    
  });
}