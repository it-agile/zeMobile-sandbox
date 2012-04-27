class WebServiceRequesterMock extends WebServiceRequester {
  bool sendGetCalled = false;
  bool callOnSuccess = false;
  bool callOnFailure = false;
  String response = null;
  int statusCode = 0;

  WebServiceRequesterMock():super(null);
  
  void sendGet(String url, OnWebServiceRequestSuceeded onSuccess, OnWebServiceRequestFailed onFailure) {
    sendGetCalled = true;
    if(callOnSuccess) {
      onSuccess(response);
    }
    if(callOnFailure) {
      onFailure(statusCode, response);
    }
  }
  
  void resetMock() {
    sendGetCalled = false;
    callOnSuccess = false;
    callOnFailure = false;
    response = null;
    statusCode = 0;
  }
}