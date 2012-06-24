class ActivityRepository {
    static final String PROJECTS_KEY = 'projects';
    
  List<Project> loadProjects() {
      var projectsJSON = document.window.localStorage[PROJECTS_KEY];
      if (projectsJSON != null) {
          return extractProjects(projectsJSON);
      }
      return null;
  }

  void saveProjects(String projectsJSON) {
      document.window.localStorage[PROJECTS_KEY] = projectsJSON;
  }

  List<Project> extractProjects(String projectsJSON) {
      var projectJSONs = JSON.parse(projectsJSON);
      var projects = new List.from(projectJSONs.map((projectJSON) => new Project(projectJSON)));
      projects.sort((first, second) => first.name.compareTo(second.name));
      return projects;
  }    
}