class Repository {
  final Storage storage;

  Repository(): storage = document.window.localStorage;
}