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

class ActivityRepositoryMock extends ActivityRepository {
  List<Project> loadProjects() {
    return null; 
  }

  void saveProjects(String projectsJSON) { 
  }
}


void activityProviderTests() {
  var describe = group;
  var it = test;
  
  List<Project> fetchedProjects = [];
  void onProjectsFetched(List<Project> projects) {
    fetchedProjects = projects;
  }
  
  describe('activity provider', () {
    ErrorDisplayMock errorDisplay = new ErrorDisplayMock();
    WebServiceRequesterMock webServiceRequester = new WebServiceRequesterMock();
    ActivityProvider activityProvider = new ActivityProvider(errorDisplay, new ActivityRepositoryMock(), webServiceRequester);
    
    setUp(() {
      activityProvider.fetchProjects(onProjectsFetched);
    });
  
    it('should call web service requester if no projects are already cached', () => expect(webServiceRequester.sendGetCalled, isTrue));
    it('should not call the onProjectsFetchedCallback', () => expect(fetchedProjects.length, equals(0)));
    
    describe('after projects have been cached', () {
      setUp(() {
        webServiceRequester.resetMock();
        activityProvider.fetchedProjects = [new Project(null)];
        activityProvider.fetchProjects(onProjectsFetched);
      });
      
      it('should not call the web service requester', () => expect(webServiceRequester.sendGetCalled, isFalse));
      it('should call the onProjectsFetchedCallback with the cached projects', () => expect(fetchedProjects, equals(activityProvider.fetchedProjects)));
    });

  });
  
  describe('activity provider with fetched projects', () {
    ActivityMock p1a1 = new ActivityMock(1, 'P1T1');
    ActivityMock p1a2 = new ActivityMock(2, 'P1T2');
    ProjectMock p1 = new ProjectMock('P1', [p1a1, p1a2]);
    ActivityMock p2a1 = new ActivityMock(3, 'P2T1');
    ActivityMock p2a2 = new ActivityMock(4, 'P2T2');
    ProjectMock p2 = new ProjectMock('P2', [p2a1, p2a2]);

    ActivityProvider activityProvider = new ActivityProvider(null, null, null);
    activityProvider.fetchedProjects = [p1, p2];
    
    it('should return activity p2a1 for id 3', () => expect(activityProvider.activityWithId(3), equals(p2a1)));
    it('should return project p1 for activity p1a2', () => expect(activityProvider.projectWithActivity(p1a2), equals(p1)));
  }); 
}
