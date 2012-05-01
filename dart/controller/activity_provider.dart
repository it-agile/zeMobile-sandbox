typedef void OnProjectFetched(List<Project> projects);

class ActivityProvider {
  final ActivityProviderModel _model;
  final ActivityProviderView _view;
  
  ActivityProvider(this._model, this._view);
  
  void fetchProjects([OnProjectFetched onProjectsFetched]) {
    _model.fetchProjects(onProjectsFetched, (int statusCode, String response) =>_view.handleError(statusCode, response));
  }
  
  List<Project> get fetchedProjects() {
    return _model.projects;
  }
  
  Activity activityWithId(int id) {
    return _model.activityWithId(id);
  }
  
  Project projectWithActivity(Activity activity) {
    return _model.projectWithActivity(activity);
  }
}

class ActivityProviderModel {
  final WebServiceRequester _requester;
  List<Project> projects;
  
  ActivityProviderModel(this._requester);
  
  void fetchProjects(OnProjectFetched onProjectsFetched, void onFetchFailed(int statusCode, String response)) {
    if(projects == null) {
      _requester.sendGet('/api/projekte/',(String response) => _processFetchedProjects(response, onProjectsFetched), onFetchFailed);
    } else {
      onProjectsFetched(projects);
    }
  }
  
  void _processFetchedProjects(String response, OnProjectFetched onProjectsFetched) {
    List projectJSONs = JSON.parse(response);
    projects = new List.from(projectJSONs.map((Map<String, Dynamic> projectJSON) => new Project(projectJSON)));
    if(onProjectsFetched != null) {
      onProjectsFetched(projects);
    }
  }
  
  Activity activityWithId(int id) {
    if (projects != null) {
      for(Project project in projects) {
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
    if(projects != null) {
      for(Project project in projects) {
        List<Activity> activities = project.activities;
        if (activities != null && activities.indexOf(activity) >= 0) return project;
      }
    }
    return null;
  }

}

class ActivityProviderView {
  void handleError(int statusCode, String response) {
    print('$statusCode : $response');  
  }
}
