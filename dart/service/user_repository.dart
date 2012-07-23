class UserRepository {
  User loadUser() {
    var userName = document.window.localStorage[USER_KEY];
    var password = document.window.localStorage[PASSWORD_KEY];
    if (userName != null && password != null) {
      return new User(userName, password);
    }
    return null;
  }

  void saveUser(User user) {
    document.window.localStorage[USER_KEY] = user.name;
    document.window.localStorage[PASSWORD_KEY] = user.password;
  }

  static final USER_KEY = 'user';
  static final PASSWORD_KEY = 'password';
}