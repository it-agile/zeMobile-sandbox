class SettingsProvider {
  static final DEFAULT_NUMBER_OF_TOP_PROJECTS = 3;
  static final DEFAULT_NUMBER_OF_TOP_ACTIVITIES = 3;
  final SettingsRepository repository;
  Settings cachedSettings;

  SettingsProvider(this.repository);

  Settings get settings {
    if (cachedSettings == null) {
      _loadSettings();
      _createDefaultSettingsIfNeeded();
    }
    return cachedSettings;
  }

  void set settings(Settings settings) {
    cachedSettings = settings;
    repository.saveSettings(settings);
  }

  void _loadSettings() {
    cachedSettings = repository.loadSettings();
  }

  void _createDefaultSettingsIfNeeded() {
    if (cachedSettings == null) {
      cachedSettings = new Settings();
      cachedSettings.numberOfRecentProjects = DEFAULT_NUMBER_OF_TOP_PROJECTS;
      cachedSettings.numberOfRecentActivities = DEFAULT_NUMBER_OF_TOP_ACTIVITIES;
    }
  }
}