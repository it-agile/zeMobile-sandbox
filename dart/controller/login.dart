typedef OnUserLoggedIn(User user);

class Login {
  final LoginView view;
  final LoginModel model;
  
  Login(this.model, this.view);
  
  void loginUserIfNotAlreadyLoggedIn(OnUserLoggedIn onUserLoggedIn) {
    if (model.isUserLoggedIn()) {
      onUserLoggedIn(model.user);
    } else {
      view.showLoginDialog((String userName, String password) {
        model.loginUser(userName, password);
        onUserLoggedIn(model.user);
      });
    }
  }
}

typedef void OnLoginDialogFinished(String userName, String password);

class LoginView {
  void showLoginDialog(OnLoginDialogFinished onLoginDialogFinished) {
    Element loginDialogContent = new Element.tag('div');
    InputElement nameInput = new Element.tag('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Name';
    nameInput.attributes['autocapitalize'] = 'off';
    nameInput.attributes['autocorrect'] = 'off';
    loginDialogContent.nodes.add(nameInput);
    InputElement passwordInput = new Element.tag('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Passwort';
    loginDialogContent.nodes.add(passwordInput);
    Dialog loginDialog = new Dialog('Log Dich in ze ein.', loginDialogContent, 'Einloggen', null);
    loginDialog.show((String pressedButtonText) {
      loginDialog.dispose();
      onLoginDialogFinished(nameInput.value, passwordInput.value);
    });
  }
}

class LoginModel {
  User user;

  bool isUserLoggedIn() {
    if (user == null) {
      String userName = document.window.localStorage[USER_KEY];
      String password = document.window.localStorage[PASSWORD_KEY];
      if (userName != null && password != null) {
        user = new User(userName, password);
      }
    }
    return user != null;
  }
  void loginUser(String userName, String password) {
    user = new User(userName, password);
    document.window.localStorage[USER_KEY] = userName;
    document.window.localStorage[PASSWORD_KEY] = password;
  }
  
  static final String USER_KEY = 'user';
  static final String PASSWORD_KEY = 'password';
}
