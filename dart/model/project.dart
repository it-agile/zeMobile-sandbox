class Project {
  Map<String, Dynamic> _projectJSON;
  List<Activity> _activities;
  
  Project(this._projectJSON);
  
                String get name() => _projectJSON['name'];
        List<Activity> get activities() {
    if (_activities == null) {
      List activityJSONs = _projectJSON['taetigkeiten'];
      _activities = new List.from(activityJSONs.map((activityJSON) => new Activity(activityJSON)));
      _activities.sort((a, b) => a.name.compareTo(b.name));
    }
    return _activities;
  }
}
