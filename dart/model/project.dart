class Project {
  Map<String, Dynamic> projectJSON;
  List<Activity> _activities;
  
  Project(this.projectJSON);
  
                String get name() => projectJSON['name'];
        List<Activity> get activities() {
    if (activities == null) {
      List activityJSONs = projectJSON['taetigkeiten'];
      _activities = new List.from(activityJSONs.map((Map<String, Dynamic> activityJSON) => new Activity(activityJSON)));
      _activities.sort((Activity a, Activity b) => a.name.compareTo(b.name));
    }
    return _activities;
  }
}
