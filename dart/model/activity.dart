class Activity {
  Map<String, Dynamic> _activityJSON;
  
  Activity(this._activityJSON);
  
     int get id() => _activityJSON['id'];
  String get name() => _activityJSON['name'];
}
