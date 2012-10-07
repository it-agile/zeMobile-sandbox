class SettingsRepository extends Repository {

  Settings loadSettings() {
    if (storage[SETTINGS_KEY] != null) {
      var jsonMap = JSON.parse(storage[SETTINGS_KEY]);
      var settings = new Settings();
      settings.numberOfTopProjects = jsonMap[NUMBER_OF_TOP_PROJECTS_KEY];
      settings.numberOfTopActivities = jsonMap[NUMBER_OF_TOP_ACTIVITIES_KEY];
      return settings;
    }
    return null;
  }

  void saveSettings(Settings settings) {
    var jsonMap = {};
    jsonMap[NUMBER_OF_TOP_PROJECTS_KEY] = settings.numberOfTopProjects;
    jsonMap[NUMBER_OF_TOP_ACTIVITIES_KEY] = settings.numberOfTopActivities;
    storage[SETTINGS_KEY] = JSON.stringify(jsonMap);
  }


  static final SETTINGS_KEY = 'settings';
  static final NUMBER_OF_TOP_PROJECTS_KEY = 'numberOfTopProjects';
  static final NUMBER_OF_TOP_ACTIVITIES_KEY = 'numberOfTopActivities';
}