class DayDisplayFactory {
  final Expander expander;
  final TimeEntryEditorFactory timeEntryEditorFactory;

  DayDisplayFactory(this.expander, this.timeEntryEditorFactory);
  
  DayDisplay createDayDisplay(ZeDate day) {
    var view = new DayDisplayView(expander);
    return new DayDisplay(day, view, timeEntryEditorFactory);
  }
}

class DayDisplay {
  final ZeDate day;
  final TimeEntryEditorFactory timeEntryEditorFactory;
  final DayDisplayView view;
  DayDisplay(this.day, this.view, this.timeEntryEditorFactory);
 
  Element createUI() {
    view.createUI();
    view.dayDate = day;
    view.containerElement.id = 'day${day.toString()}';
    
    view.addEntryButton.on.click.add(addEntryButtonTouched);
    
    return view.containerElement;
  }
  
  TimeEntryEditor addTimeEntry(TimeEntry timeEntry) {
    var editor = timeEntryEditorFactory.createTimeEntryEditor(timeEntry);
    view.timeEntriesElement.insertBefore(editor.createUI(), view.addEntrySection);
    return editor;
  }
  
  void addEntryButtonTouched(Event event) {
    var newEntry = new TimeEntry.fresh();
    newEntry.date = day;
    addTimeEntry(newEntry).editEntry();
  }
}

class DayDisplayView {
  final Expander expander;
  Element containerElement;
  Element headerElement;
  Element dayDateElement;
  Element timeEntriesElement;
  Element addEntrySection;
  Element addEntryButton;

  DayDisplayView(this.expander);
  void createUI() {
    containerElement = new DivElement();
    containerElement.classes.addAll([Classes.DAY, Classes.CONTAINER]);
    
    headerElement = new DivElement();
    headerElement.classes.addAll([Classes.HEADER, Classes.DAY_HEADER]);
    containerElement.nodes.add(headerElement);
    
    dayDateElement = new SpanElement();
    dayDateElement.classes.add(Classes.DAY_DATE);
    headerElement.nodes.add(dayDateElement);

    var floatRight = new SpanElement();
    floatRight.classes.add(Classes.FLOAT_RIGHT);
    headerElement.nodes.add(floatRight);

    var expanderElement = new SpanElement();
    expanderElement.classes.add(Classes.EXPANDER);
    floatRight.nodes.add(expanderElement);
    
    timeEntriesElement = new DivElement();
    timeEntriesElement.classes.addAll([Classes.TIME_ENTRIES, Classes.CONTENT]);
    containerElement.nodes.add(timeEntriesElement);
    
    addEntrySection = new DivElement();
    addEntrySection.classes.add(Classes.ADD_ENTRY_SECTION);
    timeEntriesElement.nodes.add(addEntrySection);

    addEntryButton = new SpanElement();
    addEntryButton.classes.add(Classes.ADD_ENTRY_BUTTON);
    addEntrySection.nodes.add(addEntryButton);
    
    expander.connect(containerElement);
    expander.collapse(containerElement);
  }
  
  set dayDate(ZeDate day) { 
    dayDateElement.text = day.toGermanString();
    if(day.isWeekend()) {
      headerElement.classes.add(Classes.WEEKEND);
    }
  }
  
  void addTimeEntryUI(Element timeEntryUI) {
    timeEntriesElement.nodes.add(timeEntryUI);
  }
}
