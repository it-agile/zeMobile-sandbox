class App {
  final ActivityProvider activityProvider;
  final TimeEntryProvider timeEntryProvider;
  final MonthDisplayFactory monthDisplayFactory;
  final Settings settings;
  final Expander expander;
  
  App(this.activityProvider, this.timeEntryProvider, this.monthDisplayFactory, this.settings, this.expander);
  
  void start() {
    document.body.nodes.add(settings.createUI());
    activityProvider.fetchProjects().chain(fetchCurrentMonthAfterFetchingProjects)
                                    .then(displayCurrentDayInCurrentMonth);
  }

  Future<Month> fetchCurrentMonthAfterFetchingProjects(List<Project> projects) {
    ZeDate currentDay = new ZeDate.currentDay();
    return timeEntryProvider.fetchTimeEntries(currentDay.month, currentDay.year);
  }

  void displayCurrentDayInCurrentMonth(Month month) {
    ZeDate currentDay = new ZeDate.currentDay();
    MonthDisplay monthDisplay = monthDisplayFactory.createMonthDisplay(month);
    document.body.nodes.add(monthDisplay.createUI());
    Element currentDayElement = monthDisplay.view.containerElement.query('#day${currentDay.toString()}');
    expander.expand(currentDayElement);
    currentDayElement.scrollIntoView();
    timeEntryProvider.monthUpdated.addListener(monthDisplay.updateMonth);
    timeEntryProvider.refetchTimeEntriesIfLoadedFromCache(month.month, month.year);
  }
}
