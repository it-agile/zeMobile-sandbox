class ActivityRepository extends Repository {
  List<Project> loadProjects() {
      var projectsJSON = storage[PROJECTS_KEY];
      if (projectsJSON != null) {
          return extractProjects(projectsJSON);
      }
      return null;
  }

  void importProjectsFromJSON(String projectsJSON) {
      storage[PROJECTS_KEY] = projectsJSON;
  }

  List<String> loadTopProjectNames() {
    var topProjects = storage[TOP_PROJECTS_KEY];
    return topProjects != null ? JSON.parse(topProjects) : null;
  }

  void saveTopProjectNames(List<String> projectNames) {
    storage[TOP_PROJECTS_KEY] = JSON.stringify(projectNames);
  }

  List<int> loadTopActivitiesForProject(String projectName) {
    var topActivities = storage['$TOP_ACTIVITIES_KEY_PREFIX$projectName'];
    return topActivities != null ? JSON.parse(topActivities) : null;
  }

  void saveTopActivitiesForProject(String projectName, List<int> topActivities) {
    storage['$TOP_ACTIVITIES_KEY_PREFIX$projectName'] = JSON.stringify(topActivities);
  }

  void deleteTopActivitiesForProject(String projectName) {
    storage.remove('$TOP_ACTIVITIES_KEY_PREFIX$projectName');
  }

  List<Project> extractProjects(String projectsJSON) {
      var projectJSONs = JSON.parse(projectsJSON);
      var projects = new List.from(projectJSONs.map(extractProject));
      projects.sort((first, second) => first.name.compareTo(second.name));
      return projects;
  }

  Project extractProject(Map<String, Dynamic> projectJSON) {
    List activityJSONs = projectJSON['taetigkeiten'];
    var activities = new List.from(activityJSONs.map(extractActivity));
    activities.sort((a, b) => a.name.compareTo(b.name));
    return new Project(projectJSON['name'], activities);
  }

  Activity extractActivity(Map<String, Dynamic> activityJSON) {
    return new Activity(activityJSON['id'], activityJSON['name']);
  }

  static final PROJECTS_KEY = 'projects';
  static final TOP_PROJECTS_KEY = 'topProjects';
  static final TOP_ACTIVITIES_KEY_PREFIX = 'ta_';
}