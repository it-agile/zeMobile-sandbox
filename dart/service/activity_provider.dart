typedef void OnProjectFetched(List<Project> projects);

class ActivityProvider {
  final ErrorDisplay errorDisplay;
  final WebServiceRequester requester;
  final ActivityRepository repository;
  final SettingsProvider settingsProvider;
  List<Project> fetchedProjects;
  List<Project> cachedRecentProjects;
  
  ActivityProvider(this.errorDisplay, this.repository, this.settingsProvider, this.requester);

  List<Project> get recentProjects {
    if(cachedRecentProjects == null) {
      cachedRecentProjects = [];
      repository.loadRecentProjectNames().forEach((projectName) {
        cachedRecentProjects.addAll(fetchedProjects.filter((project) => project.name == projectName));
      });
    }
    return cachedRecentProjects;
  }

  Future<List<Project>> refetchProjects() {
    var result = requester.sendGet('/api/projekte/');
    result.handleException(errorDisplay.showWebServiceError);
    return result.transform(_processFetchedProjects);
  }

  Future<List<Project>> fetchProjects() {
    if(fetchedProjects == null) {
      fetchedProjects = repository.loadProjects();
      if (fetchedProjects == null) {
        return refetchProjects();
      }
    }

    var completer = new Completer();
    completer.complete(fetchedProjects);

    return completer.future;
  }
  
  Activity activityWithId(int id) {
    if (fetchedProjects != null) {
      for(var project in fetchedProjects) {
        var activities = project.activities;
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
      for(var project in fetchedProjects) {
        var activities = project.activities;
        if (activities != null && activities.indexOf(activity) >= 0) return project;
      }
    }
    return null;
  }
  
  Project projectWithName(String name) {
    if(fetchedProjects != null) {
      for(var project in fetchedProjects) {
        if (project.name == name) return project;
      }
    }
    return null;
  }
  
  List<Project> _processFetchedProjects(String response) {
    repository.importProjectsFromJSON(response);
    fetchedProjects = repository.loadProjects();

    return fetchedProjects;
  } 
}