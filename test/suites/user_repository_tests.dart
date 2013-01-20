part of testSuites;

void userRepositoryTests() {
  var storage = window.localStorage;

  group('A user repository', () {
    var userRepository = new UserRepository();
    var userEven = new User('abc', 'defgh');
    var userOdd = new User('abc', 'defg');
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
        expect(storage[UserRepository.USER_PASSWORD_KEY], isNotNull));
      test('should create a user based on the saved data upon load', () =>
        expect(userRepository.loadUser(), equals(user)));
    });
    test('should encrypt/decrypt user/password with even number of characters', () =>
      expect(userRepository.decrypt(userRepository.encrypt(userEven)), equals(userEven)));
    test('should encrypt/decrypt user/password with odd number of characters', () =>
      expect(userRepository.decrypt(userRepository.encrypt(userOdd)), equals(userOdd)));
  });
}