part of zemobileLib;

class Repository {
  final Storage storage;

  Repository(): storage = window.localStorage;
}