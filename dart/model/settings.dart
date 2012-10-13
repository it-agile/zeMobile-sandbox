class Settings {
  int numberOfRecentProjects;
  int numberOfRecentActivities;

  Settings([this.numberOfRecentProjects, this.numberOfRecentActivities]);

  operator ==(Settings other) => other != null
    && (this === other || numberOfRecentProjects == other.numberOfRecentProjects
                       && numberOfRecentActivities == other.numberOfRecentActivities);

}