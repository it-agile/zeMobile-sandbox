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
  
  MonthDisplay(this.model, this.view, this.dayDisplayFactory);
  
  Element createUI() {
    view.createUI();

    var currentDay = model.firstDayInMonth;
    
    while (currentDay != null) {
      DayDisplay dayDisplay = dayDisplayFactory.createDayDisplay(currentDay);
      view.daysElement.nodes.add(dayDisplay.createUI());
      Collection<TimeEntry> timeEntries = model.month.timeEntriesFor(currentDay);
      for(TimeEntry timeEntry in timeEntries) {
        dayDisplay.addTimeEntry(timeEntry);
      }
      currentDay = model.nextDayInMonth(currentDay);
    }
    
    return view.containerElement;
  }
}

class MonthDisplayModel {
  final Month month;

  MonthDisplayModel(this.month);
  ZeDate get firstDayInMonth => new ZeDate(1, month.month, month.year);
  ZeDate nextDayInMonth(ZeDate currentDay) {
    ZeDate nextDay = currentDay.nextDay();
    return nextDay.month == month.month ? nextDay : null;
  }
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
