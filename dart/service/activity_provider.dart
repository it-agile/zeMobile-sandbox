typedef void OnProjectFetched(List<Project> projects);

class ActivityProvider {
  final ErrorDisplay errorDisplay;
  final WebServiceRequester requester;
  final ActivityRepository repository;
  final SettingsProvider settingsProvider;
  List<Project> fetchedProjects;
  List<Project> cachedRecentProjects;
  Map<Project, List<Activity>> cachedRecentActivities;
  
  ActivityProvider(this.errorDisplay, this.repository, this.settingsProvider, this.requester);

  List<Project> get recentProjects {
    if(cachedRecentProjects == null) {
      cachedRecentProjects = new List<Project>();
      repository.loadRecentProjectNames().forEach((projectName) {
        cachedRecentProjects.addAll(fetchedProjects.filter((project) => project.name == projectName));
      });
    }
    return cachedRecentProjects;
  }

  void addToRecentProjects(Project project) {
    recentProjects.insertRange(0,1, project);
    var lastIndexOfProject = recentProjects.lastIndexOf(project);
    if (lastIndexOfProject > 0) {
      recentProjects.removeAt(lastIndexOfProject);
    }
    while(recentProjects.length > settingsProvider.settings.numberOfRecentProjects) {
      var removedProject = recentProjects.removeLast();
      if(cachedRecentActivities != null) {
        cachedRecentActivities.remove(removedProject);
        repository.deleteRecentActivitiesForProject(removedProject.name);
      }
    }
    repository.saveRecentProjectNames(recentProjects.map((project) => project.name));
  }

  List<Activity> recentActivitiesForProject(Project project) {
    if (cachedRecentActivities == null) {
      cachedRecentActivities = new Map<Project, List<Activity>>();
    }
    print("$cachedRecentActivities");
    print("$project");

    var recentActivities = cachedRecentActivities[project];
    if (recentActivities == null) {
      var recentActivityIds = repository.loadRecentActivitiesForProject(project.name);
      recentActivities = recentActivityIds.map((id) => activityWithId(id));
      cachedRecentActivities[project] = recentActivities;
    }

    return recentActivities;
  }

  void addToRecentActivitiesOfProject(Project project, Activity activity) {
    var recentActivities = recentActivitiesForProject(project);
    recentActivities.insertRange(0,1, activity);
    var lastIndexOfActivity = recentActivities.lastIndexOf(activity);
    if (lastIndexOfActivity > 0) {
      recentActivities.removeAt(lastIndexOfActivity);
    }
    while(recentActivities.length > settingsProvider.settings.numberOfRecentActivities) {
      recentActivities.removeLast();
    }
    repository.saveRecentActivitiesForProject(project.name, recentActivities.map((activity) => activity.id));
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