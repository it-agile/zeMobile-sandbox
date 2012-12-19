part of zemobileLib;

class Activity {
  int id;
  String name;

  Activity(this.id, this.name);
  operator ==(Activity other) => other != null && (identical(this, other) || id == other.id && name == other.name);

  String toString() => 'Activity($id, $name)';
}
