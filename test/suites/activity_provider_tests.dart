void activityProviderTests() {
  group('activity provider', () {
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

      fetchedProjectsFuture = activityProvider.fetchProjects();
    });
  
    test('should call web service requester if no projects are already cached', () =>
      webServiceRequester.getLogs(callsTo('sendGet')).verify(happenedOnce));
    test('should save the fetched projects JSON in the repository ', () =>
      activityRespository.getLogs(callsTo('importProjectsFromJSON', 'testProjects')).verify(happenedOnce));
    test('should extract the projects from the fetched JSON via the repository ', () =>
      activityRespository.getLogs(callsTo('loadProjects')).verify(happenedExactly(2)));

    group('after projects have been cached', () {
      setUp(() {
        resetMocks();
        activityProvider.fetchedProjects = [new Project(null, null)];
        fetchedProjectsFuture = activityProvider.fetchProjects();
      });
      
      test('should not call the web service requester', () => webServiceRequester.getLogs(callsTo('sendGet')).verify(neverHappened));
      test('should return a Future containing the cached projects', () => expect(fetchedProjectsFuture.value,
        equals(activityProvider.fetchedProjects)));
    });

  });
  
  group('activity provider with fetched projects', () {
    var p1a1 = new Activity(1, 'P1T1');
    var p1a2 = new Activity(2, 'P1T2');
    var p1 = new Project('P1', [p1a1, p1a2]);
    var p2a1 = new Activity(3, 'P2T1');
    var p2a2 = new Activity(4, 'P2T2');
    var p2 = new Project('P2', [p2a1, p2a2]);

    var activityProvider = new ActivityProvider(null, null, null);
    activityProvider.fetchedProjects = [p1, p2];
    
    test('should return activity p2a1 for id 3', () => expect(activityProvider.activityWithId(3), equals(p2a1)));
    test('should return project p1 for activity p1a2', () => expect(activityProvider.projectWithActivity(p1a2), equals(p1)));
  }); 
}
