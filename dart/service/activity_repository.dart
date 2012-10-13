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

  List<String> loadRecentProjectNames() {
    var recentProjects = storage[RECENT_PROJECTS_KEY];
    return recentProjects != null ? JSON.parse(recentProjects) : null;
  }

  void saveRecentProjectNames(List<String> projectNames) {
    storage[RECENT_PROJECTS_KEY] = JSON.stringify(projectNames);
  }

  List<int> loadRecentActivitiesForProject(String projectName) {
    var recentActivities = storage['$RECENT_ACTIVITIES_KEY_PREFIX$projectName'];
    return recentActivities != null ? JSON.parse(recentActivities) : null;
  }

  void saveRecentActivitiesForProject(String projectName, List<int> topActivities) {
    storage['$RECENT_ACTIVITIES_KEY_PREFIX$projectName'] = JSON.stringify(topActivities);
  }

  void deleteRecentActivitiesForProject(String projectName) {
    storage.remove('$RECENT_ACTIVITIES_KEY_PREFIX$projectName');
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
  static final RECENT_PROJECTS_KEY = 'recentProjects';
  static final RECENT_ACTIVITIES_KEY_PREFIX = 'ra_';
}