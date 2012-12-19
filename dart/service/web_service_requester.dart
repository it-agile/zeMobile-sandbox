part of zemobileLib;

class WebServiceRequester {
  static final String USER_MARKER = '@@USER@@';
  Login login;
  WebServiceRequester(this.login);
  
  Future<String> sendGet(String url) {
    return sendRequest('GET', url);
  }
  
  Future<String> sendPost(String url, Map<String,Object> parameters) {
    return sendRequest('POST', url, parameters);
  }
  
  Future<String> sendRequest(String method,String url, [Map<String,Object> parameters]) {
    var completer = new Completer<String>();
    login.loginUserIfNotAlreadyLoggedIn().then((user) {
      var req = new HttpRequest();
      req.open(method, equipWithUser(url, user), true, user.name, user.password); 
      req.on.readyStateChange.add((event) {
        if (req.readyState == HttpRequest.DONE) {
          if(req.status >= 200 && req.status < 300) {
            completer.complete(req.responseText);
          } else {
            completer.completeException(req);
          }
        }
      });
      if(parameters != null) {
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(encodeFormData(parameters));
      } else {
        req.send();
      }
    });
    return completer.future;
  }
  
  String equipWithUser(String url, User user) {
    return url.replaceAll(USER_MARKER, user.name);
    
  }
  
  String encodeFormData(Map<String, Object> data) {
    if (data == null) return '';
    List<String> encodedData = new List<String>();
    data.forEach((String name, Object value) {
      String encodedName = encodeUriComponent(name.replaceAll('+', ' '));
      String encodedValue = encodeUriComponent(value.toString().replaceAll('+', ' '));
      encodedData.add('$encodedName=$encodedValue');    
    });
    return Strings.join(encodedData,'&');
  }
  
}
