part of zemobileLib;

class MonthDisplayFactory {
  final Expander expander;
  final DayDisplayFactory dayDisplayFactory;

  MonthDisplayFactory(this.expander, this.dayDisplayFactory);
  
  MonthDisplay createMonthDisplay(Month month) {
    var view = new MonthDisplayView(expander);
    var model = new MonthDisplayModel(month);
    return new MonthDisplay(model, view, dayDisplayFactory);
  }
}

class MonthDisplay {
  final MonthDisplayView view;
  final MonthDisplayModel model;
  final DayDisplayFactory dayDisplayFactory;
  List<DayDisplay> dayDisplays;
  
  MonthDisplay(this.model, this.view, this.dayDisplayFactory): dayDisplays = [];
  
  Element createUI() {
    view.createUI();

    model.firstDayInMonth.forEachDayOfMonth((currentDay) {
      DayDisplay dayDisplay = dayDisplayFactory.createDayDisplay(currentDay);
      view.daysElement.nodes.add(dayDisplay.createUI());
      Collection<TimeEntry> timeEntries = model.month.timeEntriesFor(currentDay);
      for(TimeEntry timeEntry in timeEntries) {
        dayDisplay.addTimeEntry(timeEntry);
      }
      dayDisplays.add(dayDisplay);
    });

    return view.containerElement;
  }

  void updateMonth(Month month) {
    model.month = month;
    dayDisplays.forEach((dayDisplay) => dayDisplay.updateTimeEntries(month.timeEntriesFor(dayDisplay.day)));
  }
}

class MonthDisplayModel {
  Month month;

  MonthDisplayModel(this.month);
  ZeDate get firstDayInMonth => new ZeDate(1, month.month, month.year);
}

class MonthDisplayView {
  final Expander expander;
  Element containerElement;
  Element monthNameElement;
  Element yearElement;
  Element daysElement;
  static final List<String> MONTH_NAMES = const ['Nullember','Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 
                                                'August', 'September', 'Oktober', 'Dezember'];
  
  MonthDisplayView(this.expander);
  void createUI() {
    containerElement = new DivElement();
    containerElement.classes.addAll([Classes.MONTH, Classes.CONTAINER]);

    daysElement = new DivElement();
    daysElement.classes.addAll([Classes.DAYS, Classes.CONTENT]);
    containerElement.nodes.add(daysElement);
  }
}
