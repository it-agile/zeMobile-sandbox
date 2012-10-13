void activityProviderTests() {
  group('An activity provider', () {
    var errorDisplay = new ErrorDisplayMock();
    var webServiceRequester = new WebServiceRequesterMock();
    var activityRespository = new ActivityRepositoryMock();
    var activityProvider = new ActivityProvider(errorDisplay, activityRespository, null, webServiceRequester);
    var fetchedProjectsFuture = null;

    setUp(() {
      clearMocks([errorDisplay, webServiceRequester, activityRespository]);
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
        clearMocks([errorDisplay, webServiceRequester, activityRespository]);
        activityProvider.fetchedProjects = [new Project(null, null)];
        fetchedProjectsFuture = activityProvider.fetchProjects();
      });
      
      test('should not call the web service requester', () => webServiceRequester.getLogs(callsTo('sendGet')).verify(neverHappened));
      test('should return a Future containing the cached projects', () => expect(fetchedProjectsFuture.value,
        equals(activityProvider.fetchedProjects)));
    });

  });
  
  group('An activity provider with fetched projects', () {
    var p1a1 = new Activity(1, 'P1T1');
    var p1a2 = new Activity(2, 'P1T2');
    var p1 = new Project('P1', [p1a1, p1a2]);
    var p2a1 = new Activity(3, 'P2T1');
    var p2a2 = new Activity(4, 'P2T2');
    var p2 = new Project('P2', [p2a1, p2a2]);

    var activityProvider = new ActivityProvider(null, null, null, null);
    activityProvider.fetchedProjects = [p1, p2];
    
    test('should return activity p2a1 for id 3', () => expect(activityProvider.activityWithId(3), equals(p2a1)));
    test('should return project p1 for activity p1a2', () => expect(activityProvider.projectWithActivity(p1a2), equals(p1)));
  });

  group('An activity provider handling recent projects', () {
    var settingsProvider = new SettingsProviderMock();
    var activityRepository = new ActivityRepositoryMock();
    var settings = new Settings();

    var p1a1 = new Activity(1, 'P1T1');
    var p1a2 = new Activity(2, 'P1T2');
    var p1 = new Project('P1', [p1a1, p1a2]);
    var p2a1 = new Activity(3, 'P2T1');
    var p2a2 = new Activity(4, 'P2T2');
    var p2 = new Project('P2', [p2a1, p2a2]);
    ActivityProvider activityProvider;

    setUp(() {
      clearMocks([settingsProvider, activityRepository]);
      activityProvider = new ActivityProvider(null, activityRepository, settingsProvider, null);
      activityProvider.fetchedProjects = [p1, p2];
      settingsProvider.when(callsTo('get settings')).alwaysReturn(settings);
      settings.numberOfRecentProjects = 2;
      settings.numberOfRecentActivities = 2;
    });

    test('should return a list of projects for the list of recent project names from the repository', () {
      activityRepository.when(callsTo('loadRecentProjectNames')).thenReturn(['P1']);
      expect(activityProvider.recentProjects, equals([p1]));
    });

    test('should not load project names from repository if recent projects are already cached', () {
      activityProvider.cachedRecentProjects = [p1];
      activityProvider.recentProjects;
      activityRepository.getLogs(callsTo('loadRecentProjectNames')).verify(neverHappened);
    });

    test('should add a new recent project to the list of the cached recent projects', () {
      activityProvider.cachedRecentProjects = [p2];
      activityProvider.addToRecentProjects(p1);
      expect(activityProvider.cachedRecentProjects, equals([p1, p2]));
    });

    test('should move a previously used recent project to the top of the list', () {
      activityProvider.cachedRecentProjects = [p2, p1];
      activityProvider.addToRecentProjects(p1);
      expect(activityProvider.cachedRecentProjects, equals([p1, p2]));
    });

    test('should save changed list of recent projects in repository', () {
      activityProvider.cachedRecentProjects = [p2];
      activityProvider.addToRecentProjects(p1);
      activityRepository.getLogs(callsTo('saveRecentProjectNames', ['P1', 'P2'])).verify(happenedOnce);
    });

    test('should remove projects if list of recent projects gets longer than the maximum number of recent projects', () {
      settings.numberOfRecentProjects = 1;
      activityProvider.cachedRecentProjects = [p2];
      activityProvider.addToRecentProjects(p1);
      expect(activityProvider.cachedRecentProjects, equals([p1]));
    });

    test('should return a list of activities for the list of recent activity ids from the repository', () {
      activityRepository.when(callsTo('loadRecentActivitiesForProject', 'P1')).thenReturn([2, 1]);
      expect(activityProvider.recentActivitiesForProject(p1), equals([p1a2, p1a1]));
    });

    test('should not load activity ids from repository if recent activities are already cached', () {
      activityProvider.cachedRecentActivities = {};
      activityProvider.cachedRecentActivities[p1] = [p1a1];
      activityProvider.recentActivitiesForProject(p1);
      activityRepository.getLogs(callsTo('loadRecentActivitiesForProject')).verify(neverHappened);
    });

    test('should add a new recent activity to the list of the cached recent activities', () {
      activityProvider.cachedRecentActivities = {};
      activityProvider.cachedRecentActivities[p1] = [];

      activityProvider.addToRecentActivitiesOfProject(p1, p1a1);
      expect(activityProvider.cachedRecentActivities[p1], equals([p1a1]));
    });

    test('should move a previously used recent activity to the top of the list', () {
      activityProvider.cachedRecentActivities = {};
      activityProvider.cachedRecentActivities[p1] = [p1a1, p1a2];

      activityProvider.addToRecentActivitiesOfProject(p1, p1a2);
      expect(activityProvider.cachedRecentActivities[p1], equals([p1a2, p1a1]));
    });

    test('should save changed list of recent activities in repository', () {
      activityProvider.cachedRecentActivities = {};
      activityProvider.cachedRecentActivities[p1] = [p1a1, p1a2];

      activityProvider.addToRecentActivitiesOfProject(p1, p1a2);
      activityRepository.getLogs(callsTo('saveRecentActivitiesForProject', 'P1', [2, 1])).verify(happenedOnce);
    });

    test('should remove activities if list of recent activities gets longer than the maximum number of recent activities', () {
      settings.numberOfRecentActivities = 1;
      activityProvider.cachedRecentActivities = {};
      activityProvider.cachedRecentActivities[p1] = [p1a1];
      activityProvider.addToRecentActivitiesOfProject(p1, p1a2);
      expect(activityProvider.cachedRecentActivities[p1], equals([p1a2]));
    });



  });
}
