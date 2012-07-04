typedef void OnWebServiceRequestSuceeded(String response);
typedef void OnWebServiceRequestFailed(int statusCode, String response);

class WebServiceRequester {
  static final String USER_MARKER = '@@USER@@';
  Login login;
  WebServiceRequester(this.login);
  
  void sendGet(String url, OnWebServiceRequestSuceeded onSuccess, OnWebServiceRequestFailed onFailure) {
    sendRequest('GET', url, null, onSuccess, onFailure);
  }
  
  void sendPost(String url, Map<String,Object> parameters, OnWebServiceRequestSuceeded onSuccess, OnWebServiceRequestFailed onFailure) {
    sendRequest('POST', url, parameters, onSuccess, onFailure);
  }
  
  void sendRequest(String method,String url, Map<String,Object> parameters, OnWebServiceRequestSuceeded onSuccess, OnWebServiceRequestFailed onFailure) {
    login.loginUserIfNotAlreadyLoggedIn((User user) {
      XMLHttpRequest req = new XMLHttpRequest();
      req.open(method, equipWithUser(url, user), true, user.name, user.password); 
      req.on.readyStateChange.add((event) {
        if (req.readyState == XMLHttpRequest.DONE) {
          if(req.status >= 200 && req.status < 300) {
            onSuccess(req.responseText);
          } else {
            onFailure(req.status, req.responseText);  
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
