void userRepositoryTests() {
  var storage = document.window.localStorage;

  group('a user repository', () {
    var userRepository = new UserRepository();
    setUp(() {
      storage.clear();
    });
    test('should initially have no user', () => expect(userRepository.loadUser(), isNull));
    group('after saving a user', () {
      var user = new User('u', 'p');
      setUp(() {
        storage.clear();
        userRepository.saveUser(user);
      });
      test('should have saved the name of the user in the local storage', () =>
        expect(storage[UserRepository.USER_KEY], equals(user.name)));
      test('should have saved the password of the user in the local storage', () =>
        expect(storage[UserRepository.PASSWORD_KEY], equals(user.password)));
      test('should create a user based on the saved data upon load', () =>
        expect(userRepository.loadUser(), equals(user)));
    });
  });
}