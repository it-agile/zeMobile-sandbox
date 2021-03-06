part of zemobileLib;

class User {
  String name;
  String password;
  User(this.name, this.password);

  operator ==(User otherUser) =>
    (otherUser != null && (identical(this, otherUser) || name == otherUser.name &&  password == otherUser.password));

  String toString() => 'User($name, $password)';
}
