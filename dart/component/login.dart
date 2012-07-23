class Login {
  final LoginView view;
  final LoginModel model;
  
  Login(this.model, this.view);
  
  Future<User> loginUserIfNotAlreadyLoggedIn() {
    var completer = new Completer<User>();

    if (model.isUserLoggedIn()) {
      completer.complete(model.user);
    } else {
      view.showLoginDialog().then((loginSucceeded) {
        model.loginUser(view.userName, view.password);
        completer.complete(model.user);
      });
    }

    return completer.future;
  }
}

class LoginModel {
  User user;
  UserRepository userRepository;

  LoginModel(this.userRepository);

  bool isUserLoggedIn() {
    if (user == null) {
      user = userRepository.loadUser();
    }
    return user != null;
  }
  void loginUser(String userName, String password) {
    user = new User(userName, password);
    userRepository.saveUser(user);
  }
}

class LoginView {
  InputElement nameInput;
  InputElement passwordInput;

  String get userName() => nameInput.value;
  String get password() => passwordInput.value;

  Future<bool> showLoginDialog() {
    var loginDialogContent = new DivElement();
    nameInput = new InputElement();
    nameInput.type = 'text';
    nameInput.placeholder = 'Name';
    nameInput.attributes['autocapitalize'] = 'off';
    nameInput.attributes['autocorrect'] = 'off';
    loginDialogContent.nodes.add(nameInput);
    passwordInput = new InputElement();
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Passwort';
    loginDialogContent.nodes.add(passwordInput);
    var loginDialog = new Dialog('Log Dich in ze ein.', loginDialogContent, 'Einloggen', null);

    var completer = new Completer();
    loginDialog.show((String pressedButtonText) {
      loginDialog.dispose();
      completer.complete(true);
    });
    return completer.future;
  }
}
