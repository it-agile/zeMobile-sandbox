class Activity {
  Map<String, Dynamic> activityJSON;
  
  Activity(this.activityJSON);
  
     int get id() => activityJSON['id'];
  String get name() => activityJSON['name'];
}
