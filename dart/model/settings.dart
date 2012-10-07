class Settings {
  int numberOfTopProjects;
  int numberOfTopActivities;

  Settings([this.numberOfTopProjects, this.numberOfTopActivities]);

  operator ==(Settings other) => other != null
    && (this === other || numberOfTopProjects == other.numberOfTopProjects
                       && numberOfTopActivities == other.numberOfTopActivities);

}