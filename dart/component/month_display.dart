class MonthDisplayFactory {
  final Expander expander;
  final DayDisplayFactory dayDisplayFactory;

  MonthDisplayFactory(this.expander, this.dayDisplayFactory);
  
  MonthDisplay createMonthDisplay(Month month) {
    var view = new MonthDisplayView(expander);
    return new MonthDisplay(month, view, dayDisplayFactory);
  }
}

class MonthDisplay {
  final MonthDisplayView view;
  final Month month;
  final DayDisplayFactory dayDisplayFactory;
  
  MonthDisplay(this.month, this.view, this.dayDisplayFactory);
  
  Element createUI() {
    view.createUI();
    view.setMonth(month.month, month.year);
    
    var currentDay = new ZeDate(1, month.month, month.year);
    
    while (currentDay.month == month.month) {
      DayDisplay dayDisplay = dayDisplayFactory.createDayDisplay(currentDay);
      view.daysElement.nodes.add(dayDisplay.createUI());
      Collection<TimeEntry> timeEntries = month.timeEntriesFor(currentDay);
      for(TimeEntry timeEntry in timeEntries) {
        dayDisplay.addTimeEntry(timeEntry);
      }
      currentDay = currentDay.nextDay();
    }
    
    return view.containerElement;
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

    var header = new DivElement();
    header.classes.addAll([Classes.HEADER, Classes.MONTH_HEADER]);
    containerElement.nodes.add(header);
    
    monthNameElement = new SpanElement();
    monthNameElement.classes.add(Classes.MONTH_NAME);
    header.nodes.add(monthNameElement);
    yearElement = new SpanElement();
    yearElement.classes.add(Classes.YEAR);
    header.nodes.add(yearElement);

    var floatRight = new SpanElement();
    floatRight.classes.add(Classes.FLOAT_RIGHT);
    header.nodes.add(floatRight);
    Element expanderElement = new SpanElement();
    expanderElement.classes.add(Classes.EXPANDER);
    floatRight.nodes.add(expanderElement);

    daysElement = new DivElement();
    daysElement.classes.addAll([Classes.DAYS, Classes.CONTENT]);
    containerElement.nodes.add(daysElement);

    expander.connect(containerElement);
    expander.expand(containerElement);
  }
  
  void setMonth(int month, int year) {
    monthNameElement.text = MONTH_NAMES[month];
    yearElement.text = '$year';
  }
}
