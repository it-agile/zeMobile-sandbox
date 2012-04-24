typedef void OnProjectFetched(List<Project> projects);

class ActivityProvider {
  final ActivityProviderModel _model;
  final ActivityProviderView _view;
  
  ActivityProvider(this._model, this._view);
  
  void fetchProjects(OnProjectFetched onProjectsFetched) {
    _model.fetchProjects(onProjectsFetched, (int statusCode, String response) {
      _view.handleError(statusCode, response);
    });
  }
}

class ActivityProviderModel {
  final WebServiceRequester _requester;
  List<Project> _projects;
  
  ActivityProviderModel(this._requester);
  
  void fetchProjects(OnProjectFetched onProjectsFetched, void onFetchFailed(int statusCode, String response)) {
    if(_projects == null) {
      _requester.sendGet('/api/projekte/',(String response) => _processFetchedProjects(response, onProjectsFetched), onFetchFailed);
    } else {
      onProjectsFetched(_projects);
    }
  }
  
  void _processFetchedProjects(String response, OnProjectFetched onProjectsFetched) {
    List projectJSONs = JSON.parse(response);
    _projects = new List.from(projectJSONs.map((Map<String, Dynamic> projectJSON) => new Project(projectJSON)));
  }
}

class ActivityProviderView {
  void handleError(int statusCode, String response) {
    print('$statusCode : $response');  
  }
}
