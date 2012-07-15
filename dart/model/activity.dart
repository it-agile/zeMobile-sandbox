class Activity {
  int id;
  String name;

  Activity(this.id, this.name);
  operator ==(Activity other) => other != null && (this === other || id == other.id && name == other.name);

  String toString() => 'Activity($id, $name)';
}
