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
  var describe = group;
  var it = test;
  
  describe('activity provider', () {
    var errorDisplay = new ErrorDisplayMock();
    var webServiceRequester = new WebServiceRequesterMock();
    var activityRespository = new ActivityRepositoryMock();
    var activityProvider = new ActivityProvider(errorDisplay, activityRespository, webServiceRequester);
    var fetchedProjectsFuture = null;

    resetMocks() {
      webServiceRequester.log.logs.clear();
      activityRespository.log.logs.clear();
    }

    setUp(() {
      resetMocks();
      webServiceRequester.when(callsTo('sendGet')).thenReturn(new Future.immediate('testProjects'));
      activityRespository.when(callsTo('loadProjects')).thenReturn(null);

      fetchedProjectsFuture = activityProvider.fetchProjects();
    });
  
    it('should call web service requester if no projects are already cached', () =>
      webServiceRequester.getLogs(callsTo('sendGet')).verify(happenedOnce));
    it('should save the fetched projects JSON in the repository ', () =>
      activityRespository.getLogs(callsTo('saveProjects', 'testProjects')).verify(happenedOnce));
    it('should extract the projects from the fetched JSON via the repository ', () =>
      activityRespository.getLogs(callsTo('extractProjects', 'testProjects')).verify(happenedOnce));

    describe('after projects have been cached', () {
      setUp(() {
        resetMocks();
        activityProvider.fetchedProjects = [new Project(null)];
        fetchedProjectsFuture = activityProvider.fetchProjects();
      });
      
      it('should not call the web service requester', () => webServiceRequester.getLogs(callsTo('sendGet')).verify(neverHappened));
      it('should return a Future containing the cached projects', () => expect(fetchedProjectsFuture.value,
        equals(activityProvider.fetchedProjects)));
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
