typedef void OnProjectFetched(List<Project> projects);

class ActivityProvider {
  final ErrorDisplay errorDisplay;
  final WebServiceRequester requester;
  final ActivityRepository repository;
  List<Project> fetchedProjects;
  
  ActivityProvider(this.errorDisplay, this.repository, this.requester);

  refetchProjects([OnProjectFetched onProjectsFetched]) {
    requester.sendGet('/api/projekte/',
      (String response) => _processFetchedProjects(response, onProjectsFetched),
      (int statusCode, String response) => errorDisplay.showWebServiceError(statusCode, response));
  }

  void fetchProjects([OnProjectFetched onProjectsFetched]) {
    if(fetchedProjects == null) {
      fetchedProjects = repository.loadProjects();
      if (fetchedProjects == null) {
        refetchProjects(onProjectsFetched);
      } else {
        onProjectsFetched(fetchedProjects);
      }
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
  
  Project projectWithName(String name) {
    if(fetchedProjects != null) {
      for(Project project in fetchedProjects) {
        if (project.name == name) return project;
      }
    }
    return null;
  }
  
  void _processFetchedProjects(String response, OnProjectFetched onProjectsFetched) {
    repository.saveProjects(response);
    fetchedProjects = repository.extractProjects(response);
    if(onProjectsFetched != null) {
      onProjectsFetched(fetchedProjects);
    }
  } 
}