part of testSuites;

void settingsProviderTests() {
  group('A settings provider', () {
    var repository = new SettingsRepositoryMock();
    var provider = new SettingsProvider(repository);

    setUp(() => clearMocks([repository]));
    test('should create default settings if no settings are available in the repository', () {
      repository.when(callsTo('loadSettings')).thenReturn(null);
      expect(provider.settings, equals(new Settings(3,3)));
    });
  });
}