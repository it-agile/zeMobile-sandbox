typedef OnUserLoggedIn(User user);

class Login {
  final LoginView _view;
  final LoginModel _model;
  
  Login(this._model, this._view);
  
  void loginUserIfNotAlreadyLoggedIn(OnUserLoggedIn onUserLoggedIn) {
    if (_model.isUserLoggedIn()) {
      onUserLoggedIn(_model.user);
    } else {
      _view.showLoginDialog((String userName, String password) {
        _model.loginUser(userName, password);
        onUserLoggedIn(_model.user);
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
  User _user;

  bool isUserLoggedIn() => user != null;
  User get user() => _user;
  void loginUser(String userName, String password) {_user = new User(userName, password);}
}
