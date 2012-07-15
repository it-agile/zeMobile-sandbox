class User {
  String name;
  String password;
  User(this.name, this.password);

  operator ==(User otherUser) =>
    (otherUser != null && (this === otherUser || name == otherUser.name &&  password == otherUser.password));
}
