void activityRepositoryTests() {
  var storage = document.window.localStorage;

  group('An activity repository', () {
    var activityRepository = new ActivityRepository();

    setUp(() {
      storage.clear();
    });
    test('should initially have no projects and activities', () => expect(activityRepository.loadProjects(), isNull));
    group('after importing a projects JSON', () {
      var projectsJSON = """
            [{
                "taetigkeiten": [
                    {
                        "name": "P1T1",
                        "id": 1
                    },
                    {
                        "name": "P1T2",
                        "id": 2
                    }
                ],
                "name": "P1"
            }]
          """;
      var project = new Project('P1', [new Activity(1, 'P1T1'), new Activity(2, 'P1T2')]);
      setUp(() {
        storage.clear();
        activityRepository.importProjectsFromJSON(projectsJSON);
      });

      test('should have saved the projects JSON into the storage', () =>
        expect(storage[ActivityRepository.PROJECTS_KEY], equals(projectsJSON)));
      test('should create a project based on the saved JSON', () => expect(activityRepository.loadProjects()[0], equals(project)));
      test('should load the previously saved recent projects', () {
        activityRepository.saveRecentProjectNames(['p 1', 'p 2']);
        expect(activityRepository.loadRecentProjectNames(), equals(['p 1', 'p 2']));
      });
      test('should load the previously saved recent activities for a project', () {
        activityRepository.saveRecentActivitiesForProject('p 1', [1, 2]);
        expect(activityRepository.loadRecentActivitiesForProject('p 1'), equals([1, 2]));
      });
      test('should delete recent activities for a project', () {
        activityRepository.saveRecentActivitiesForProject('p 1', [1, 2]);
        activityRepository.deleteRecentActivitiesForProject('p 1');
        expect(activityRepository.loadRecentActivitiesForProject('p 1'), isEmpty);
      });

    });

  });
}