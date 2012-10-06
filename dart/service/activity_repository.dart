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
}