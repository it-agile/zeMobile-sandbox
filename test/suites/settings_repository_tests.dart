void settingsRepositoryTests() {
  group('A settings repository', () {
    var repository = new SettingsRepository();

    setUp(() => repository.storage.clear());

    test('should return null is no settings can be loaded', () => expect(repository.loadSettings(), isNull));
    test('should load the settings previously saved', () {
      var settings = new Settings();
      settings.numberOfRecentProjects = 4;
      settings.numberOfRecentActivities = 2;
      repository.saveSettings(settings);

      expect(repository.loadSettings(), equals(settings));
    });
  });
}