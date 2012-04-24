#library('zeMobile');

#import('dart/ze_mobile_lib.dart');

void main() {
/* 
  Expander expander = new Expander();
  document.queryAll('.container').forEach((Element expanderElement) {
    expander.connect(expanderElement);
  });
*/
  
  Login login = new Login();
  login.loginUserIfNotAlreadyLoggedIn((User user) {
    
  });
  
/*  
  XMLHttpRequest req = new XMLHttpRequest();
  req.open('POST', '/api/zeiten/2012/04/rb/', true, 'rb', 'rb'); 
  req.on.readyStateChange.add((event) {
    if (req.readyState == XMLHttpRequest.DONE) {
      print(req.responseText);

      XMLHttpRequest req2 = new XMLHttpRequest();
      req2.open('GET', '/api/projekte', true); 
      req2.on.readyStateChange.add((event) {
        if (req2.readyState == XMLHttpRequest.DONE) {
          print(req2.responseText);
        }
      });
      req2.send();
    }
  });
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send('taetigkeit=1&tag=07.04.2012&start=09:00&ende=12:00');
  
*/ 
  
/*
  XMLHttpRequest req2 = new XMLHttpRequest();
  req2.open('GET', '/api/projekte/', true, 'rb', 'rb');
  req2.on.readyStateChange.add((event) {
    if (req2.readyState == XMLHttpRequest.DONE) {
      print(req2.responseText);
    }
  });
  req2.send();
  */
  
}
