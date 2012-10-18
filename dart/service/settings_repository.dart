class SettingsRepository extends Repository {

  Settings loadSettings() {
    if (storage[SETTINGS_KEY] != null) {
      var jsonMap = JSON.parse(storage[SETTINGS_KEY]);
      var settings = new Settings();
      settings.numberOfRecentProjects = jsonMap[NUMBER_OF_RECENT_PROJECTS_KEY];
      settings.numberOfRecentActivities = jsonMap[NUMBER_OF_RECENT_ACTIVITIES_KEY];
      return settings;
    }
    return null;
  }

  void saveSettings(Settings settings) {
    var jsonMap = {};
    jsonMap[NUMBER_OF_RECENT_PROJECTS_KEY] = settings.numberOfRecentProjects;
    jsonMap[NUMBER_OF_RECENT_ACTIVITIES_KEY] = settings.numberOfRecentActivities;
    storage[SETTINGS_KEY] = JSON.stringify(jsonMap);
  }


  static const SETTINGS_KEY = 'settings';
  static const NUMBER_OF_RECENT_PROJECTS_KEY = 'numberOfRecentProjects';
  static const NUMBER_OF_RECENT_ACTIVITIES_KEY = 'numberOfRecentActivities';
}