class Project {
  String name;
  List<Activity> activities;

  Project(this.name, this.activities);
  operator ==(Project other) {
    if (other == null) return false;
    if (this === other) return true;
    if (name != other.name) return false;
    if (activities == null) return other.activities == null;
    if (other.activities == null) return false;
    if (activities.length != other.activities.length) return false;

    for(int i=0; i<activities.length; i++) {
      if (activities[i] != other.activities[i]) return false;
    }

    return true;
  }

  String toString() => 'Project($name, $activities)';
}
