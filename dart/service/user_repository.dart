class UserRepository extends Repository {
  User loadUser() {
    if (storage[USER_KEY] != null) {
      storage.remove(USER_KEY);
      storage.remove(PASSWORD_KEY);
    }
    if (storage[USER_PASSWORD_KEY] != null) {
      return decrypt(storage[USER_PASSWORD_KEY]);
    }
    return null;
  }

  void saveUser(User user) {
    storage[USER_PASSWORD_KEY] = encrypt(user);
  }

  String encrypt(User user) {
    var userAndPassword = '$ENC_GARBAGE${user.name}$USER_PASSWORD_DELIM${user.password}';
    var middle = (userAndPassword.length / 2).floor().toInt();
    var first = userAndPassword.substring(0, middle);
    var second = userAndPassword.substring(middle);
    var result = new StringBuffer();
    for (var i = 0; i < first.length; i++) {
      result.add(second.substring(i, i+1));
      result.add(first.substring(i, i+1));
    }
    if (userAndPassword.length % 2 != 0) {
      result.add(second.substring(second.length - 1));
    }
    return result.toString();
  }

  User decrypt(String userAndPasswordEncrypted) {
    var middle = (userAndPasswordEncrypted.length / 2).floor().toInt();
    var first = new StringBuffer();
    var second = new StringBuffer();

    for (var i = 0; i < userAndPasswordEncrypted.length - 1; i+=2) {
      second.add(userAndPasswordEncrypted.substring(i, i+1));
      first.add(userAndPasswordEncrypted.substring(i+1, i+2));
    }
    if (userAndPasswordEncrypted.length % 2 != 0) {
      second.add(userAndPasswordEncrypted.substring(userAndPasswordEncrypted.length - 1));
    }

    var userAndPassword = '$first$second';
    userAndPassword = userAndPassword.substring(ENC_GARBAGE.length);
    var delimIndex = userAndPassword.indexOf(USER_PASSWORD_DELIM);
    return new User(userAndPassword.substring(0, delimIndex),
                    userAndPassword.substring(delimIndex + USER_PASSWORD_DELIM.length));
  }

  static const USER_KEY = 'user';
  static const PASSWORD_KEY = 'password';
  static const USER_PASSWORD_KEY = 'up';
  static const USER_PASSWORD_DELIM = '@!!!UP!!!@';
  static const ENC_GARBAGE = '##0978656#-uztsgsg#!!';
}