class ActivityProviderModelMock extends ActivityProviderModel {
  bool fetchProjectsCalled = false;
  bool callOnProjectsFetched = false;
  bool callOnFetchFailed = false;
  List<Project> response = null;
  String responseString = null;
  int statusCode = 0;
  
  ActivityProviderModelMock(): super(null);
  void fetchProjects(OnProjectFetched onProjectsFetched, void onFetchFailed(int statusCode, String response)) {
    fetchProjectsCalled = true;
    if(callOnProjectsFetched) {
      onProjectsFetched(response);
    }
    if (callOnFetchFailed) {
      onFetchFailed(statusCode, responseString);
    }
  }
  
  void resetMock() {
    fetchProjectsCalled = false;
    callOnProjectsFetched = false;
    callOnFetchFailed = false;
    response = null;
    statusCode = 0;
  }
}

class ActivityProviderViewMock extends ActivityProviderView {
  bool handleErrorCalled = false;
  
  void handleError(int statusCode, String response) {
    handleErrorCalled = true;  
  }
  
  void resetMock() {
    handleErrorCalled = false;
  }
}

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


void activityProviderTests() {
  
}
