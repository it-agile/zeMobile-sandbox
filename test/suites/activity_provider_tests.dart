class ActivityProviderModelMock extends ActivityProviderModel {
  bool fetchProjectsCalled = false;
  bool callOnProjectsFetched = false;
  bool callOnFetchFailed = false;
  bool activityWithIdCalled = false;
  bool projectWithActivityCalled = false;
  String responseString = null;
  int statusCode = 0;
  
  ActivityProviderModelMock(): super(null);
  void fetchProjects(OnProjectFetched onProjectsFetched, void onFetchFailed(int statusCode, String response)) {
    fetchProjectsCalled = true;
    if(callOnProjectsFetched) {
      onProjectsFetched(projects);
    }
    if (callOnFetchFailed) {
      onFetchFailed(statusCode, responseString);
    }
  }
  
  Activity activityWithId(int id) {
    activityWithIdCalled = true;
    return null;
  }
  
  Project projectWithActivity(Activity activity) {
    projectWithActivityCalled = true;
    return null;
  }

  
  void resetMock() {
    fetchProjectsCalled = false;
    callOnProjectsFetched = false;
    callOnFetchFailed = false;
    activityWithIdCalled = false;
    projectWithActivityCalled = false;
    projects = null;
    statusCode = 0;
  }
}

class ActivityProviderViewMock implements ActivityProviderView {
  bool handleErrorCalled = false;
  
  void handleError(int statusCode, String response) {
    handleErrorCalled = true;  
  }
  
  void resetMock() {
    handleErrorCalled = false;
  }
}

class ProjectMock implements Project {
  String name;
  List<Activity> activities;
  ProjectMock(this.name, this.activities);
}

class ActivityMock implements Activity {
  int id;
  String name;
  ActivityMock(this.id, this.name);
}


void activityProviderTests() {
  List<Project> fetchedProjects = [];
  void onProjectsFetched(List<Project> projects) {
    fetchedProjects = projects;
  }
  
  describe('activity provider model', () {
    int failedStatusCode = -1;
    String failedResponse = null;
    WebServiceRequesterMock webServiceRequester = new WebServiceRequesterMock();
    ActivityProviderModel model = new ActivityProviderModel(webServiceRequester);
    
    model.fetchProjects(onProjectsFetched, null);
    
    it('should call web service requester if no projects are already cached', () => expect(webServiceRequester.sendGetCalled).to(beTrue()));
    
    describe('after projects have been cached', () {
      webServiceRequester.resetMock();
      model.projects = [new Project(null)];
      model.fetchProjects(onProjectsFetched, null);
      
      it('should not call the web service requester', () => expect(webServiceRequester.sendGetCalled).to(beFalse()));
      it('should call the onProjectsFetchedCallback with the cached projects', () => expect(fetchedProjects).to(equal(model.projects)));
    });
  });
  
  describe('activity provider model with fetched projects', () {
    ActivityMock p1a1 = new ActivityMock(1, 'P1T1');
    ActivityMock p1a2 = new ActivityMock(2, 'P1T2');
    ProjectMock p1 = new ProjectMock('P1', [p1a1, p1a2]);
    ActivityMock p2a1 = new ActivityMock(3, 'P2T1');
    ActivityMock p2a2 = new ActivityMock(4, 'P2T2');
    ProjectMock p2 = new ProjectMock('P2', [p2a1, p2a2]);

    ActivityProviderModel model = new ActivityProviderModel(null);
    model.projects = [p1, p2];
    
    it('should return activity p2a1 for id 3', () => expect(model.activityWithId(3)).to(equal(p2a1)));
    it('should return project p1 for activity p1a2', () => expect(model.projectWithActivity(p1a2)).to(equal(p1)));
  }); 
  
  describe('activity provider', () {
    ActivityProviderModelMock model;
    ActivityProviderViewMock view;
    ActivityProvider activityProvider;

    beforeEach(() {
      model = new ActivityProviderModelMock();
      view = new ActivityProviderViewMock();
      activityProvider = new ActivityProvider(model, view);
      fetchedProjects = null;
    });
    
    describe('when fetching the project is successful', () {
      model.callOnProjectsFetched = true;
      model.projects = [new Project(null)];
      activityProvider.fetchProjects(onProjectsFetched);
      it('should call the callback with the fetched projects', () => expect(fetchedProjects).to(equal(model.projects)));
    });
    
    describe('when fetching the project fails', () {
      model.callOnFetchFailed = true;
      activityProvider.fetchProjects(onProjectsFetched);
      it('should make the view handle the error', () => expect(view.handleErrorCalled).to(beTrue()));
    });
  });
}
