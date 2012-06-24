class App {
  final ActivityProvider activityProvider;
  final TimeEntryProvider timeEntryProvider;
  final MonthDisplayFactory monthDisplayFactory;
  final Settings settings;
  final Expander expander;
  
  App(this.activityProvider, this.timeEntryProvider, this.monthDisplayFactory, this.settings, this.expander);
  
  void start() {
    document.body.nodes.add(settings.createUI());
    activityProvider.fetchProjects((List<Project> projects) {
      ZeDate currentDay = new ZeDate.currentDay();
      timeEntryProvider.fetchTimeEntries(currentDay.month, currentDay.year, (Month month) {
        MonthDisplay monthDisplay = monthDisplayFactory.createMonthDisplay(month);
        document.body.nodes.add(monthDisplay.createUI());
        Element currentDayElement = monthDisplay.view.containerElement.query('#day${currentDay.toString()}');
        expander.expand(currentDayElement);
        currentDayElement.scrollIntoView();
      });
    });
  }
}
