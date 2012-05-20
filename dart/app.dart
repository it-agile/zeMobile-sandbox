class App {
  final ActivityProvider activityProvider;
  final TimeEntryProvider timeEntryProvider;
  final MonthDisplayFactory monthDisplayFactory;
  
  App(this.activityProvider, this.timeEntryProvider, this.monthDisplayFactory);
  
  void start() {
    activityProvider.fetchProjects((List<Project> projects) {
      ZeDate currentDay = new ZeDate.currentDay();
      timeEntryProvider.fetchTimeEntries(currentDay.month, currentDay.year, (Month month) {
        MonthDisplay monthDisplay = monthDisplayFactory.createMonthDisplay(month);
        document.body.nodes.add(monthDisplay.createUI());
      });
    });
  }
}
