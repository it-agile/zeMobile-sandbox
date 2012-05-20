typedef void OnProjectFetched(List<Project> projects);

class ActivityProvider {
  final ErrorDisplay errorDisplay;
  final WebServiceRequester requester;
  List<Project> fetchedProjects;
  
  ActivityProvider(this.errorDisplay, this.requester);  
  void fetchProjects([OnProjectFetched onProjectsFetched]) {
    if(fetchedProjects == null) {
      requester.sendGet('/api/projekte/',
        (String response) => _processFetchedProjects(response, onProjectsFetched), 
        (int statusCode, String response) => errorDisplay.showWebServiceError(statusCode, response));
    } else {
      onProjectsFetched(fetchedProjects);
    }
  }
  
  Activity activityWithId(int id) {
    if (fetchedProjects != null) {
      for(Project project in fetchedProjects) {
        List<Activity> activities = project.activities;
        if (activities != null) {
          for(Activity activity in activities) {
            if (activity.id == id) {
              return activity;
            }
          }
        }
      }
    }
    return null;
  }
  
  Project projectWithActivity(Activity activity) {
    if(fetchedProjects != null) {
      for(Project project in fetchedProjects) {
        List<Activity> activities = project.activities;
        if (activities != null && activities.indexOf(activity) >= 0) return project;
      }
    }
    return null;
  }
  
  void _processFetchedProjects(String response, OnProjectFetched onProjectsFetched) {
    List projectJSONs = JSON.parse(response);
    fetchedProjects = new List.from(projectJSONs.map((Map<String, Dynamic> projectJSON) => new Project(projectJSON)));
    if(onProjectsFetched != null) {
      onProjectsFetched(fetchedProjects);
    }
  } 
}