part of zemobileLib;

class App {
  final ActivityProvider activityProvider;
  final TimeEntryProvider timeEntryProvider;
  final MonthDisplayFactory monthDisplayFactory;
  final SettingsEditor settings;
  final Expander expander;
  
  App(this.activityProvider, this.timeEntryProvider, this.monthDisplayFactory, this.settings, this.expander);
  
  void start() {
    fixiPhone5FullScreen();
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

  void fixiPhone5FullScreen() {
    if (window.screen.height == 568) {
      document.query('meta[name=viewport]').attributes['content'] = 'initial-scale=1';
    }
  }
}
