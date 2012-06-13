class MonthDisplayFactory {
  final ElementCreator elementCreator;
  final Expander expander;
  final DayDisplayFactory dayDisplayFactory;

  MonthDisplayFactory(this.elementCreator, this.expander, this.dayDisplayFactory);
  
  MonthDisplay createMonthDisplay(Month month) {
    MonthDisplayView view = new MonthDisplayView(elementCreator, expander);
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
  final ElementCreator elementCreator;
  final Expander expander;
  Element containerElement;
  Element monthNameElement;
  Element yearElement;
  Element daysElement;
  static final List<String> MONTH_NAMES = const ['Nullember','Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 
                                                'August', 'September', 'Oktober', 'Dezember'];
  
  MonthDisplayView(this.elementCreator, this.expander);
  void createUI() {
    containerElement = elementCreator.createElement(Tags.DIV, [Classes.MONTH, Classes.CONTAINER]);
    
    var header = elementCreator.createElement(Tags.DIV,[Classes.HEADER, Classes.MONTH_HEADER]);
    containerElement.nodes.add(header);
    
    monthNameElement = elementCreator.createElement(Tags.SPAN,[Classes.MONTH_NAME]);
    header.nodes.add(monthNameElement);
    yearElement = elementCreator.createElement(Tags.SPAN,[Classes.YEAR]);
    header.nodes.add(yearElement);

    var floatRight = elementCreator.createElement(Tags.SPAN,[Classes.FLOAT_RIGHT]);
    header.nodes.add(floatRight);
    Element expanderElement = elementCreator.createElement(Tags.SPAN,[Classes.EXPANDER]);
    floatRight.nodes.add(expanderElement);

    daysElement = elementCreator.createElement(Tags.DIV,[Classes.DAYS, Classes.CONTENT]);
    containerElement.nodes.add(daysElement);
    
    expander.connect(containerElement);
    expander.expand(containerElement);
  }
  
  void setMonth(int month, int year) {
    monthNameElement.text = MONTH_NAMES[month];
    yearElement.text = '$year';
  }
}
