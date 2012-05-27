class DayDisplayFactory {
  final ElementCreator elementCreator;
  final Expander expander;
  final TimeEntryEditorFactory timeEntryEditorFactory;

  DayDisplayFactory(this.elementCreator, this.expander, this.timeEntryEditorFactory);
  
  DayDisplay createDayDisplay(ZeDate day) {
    DayDisplayView view = new DayDisplayView(elementCreator, expander);
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
    
    view.addEntryButton.on.click.add(addEntryButtonTouched);
    
    return view.containerElement;
  }
  
  TimeEntryEditor addTimeEntry(TimeEntry timeEntry) {
    TimeEntryEditor editor = timeEntryEditorFactory.createTimeEntryEditor(timeEntry);
    view.timeEntriesElement.insertBefore(editor.createUI(), view.addEntrySection);
    return editor;
  }
  
  void addEntryButtonTouched(Event event) {
    TimeEntry newEntry = new TimeEntry.fresh();
    newEntry.date = day;
    addTimeEntry(newEntry).editEntry();
  }
}

class DayDisplayView {
  final ElementCreator elementCreator;
  final Expander expander;
  Element containerElement;
  Element dayDateElement;
  Element timeEntriesElement;
  Element addEntrySection;
  Element addEntryButton;

  DayDisplayView(this.elementCreator, this.expander);
  void createUI() {
    containerElement = elementCreator.createElement(Tags.DIV, [Classes.DAY, Classes.CONTAINER]);
    
    Element header = elementCreator.createElement(Tags.DIV,[Classes.HEADER, Classes.DAY_HEADER]); 
    containerElement.nodes.add(header);
    
    dayDateElement = elementCreator.createElement(Tags.SPAN,[Classes.DAY_DATE]);
    header.nodes.add(dayDateElement);

    Element floatRight = elementCreator.createElement(Tags.SPAN,[Classes.FLOAT_RIGHT]);
    header.nodes.add(floatRight);
    Element expanderElement = elementCreator.createElement(Tags.SPAN,[Classes.EXPANDER]);
    floatRight.nodes.add(expanderElement);
    
    timeEntriesElement = elementCreator.createElement(Tags.DIV,[Classes.TIME_ENTRIES, Classes.CONTENT]);
    containerElement.nodes.add(timeEntriesElement);
    
    addEntrySection = elementCreator.createElement(Tags.DIV, [Classes.ADD_ENTRY_SECTION]);
    timeEntriesElement.nodes.add(addEntrySection);
    addEntryButton = elementCreator.createElement(Tags.SPAN, [Classes.ADD_ENTRY_BUTTON]);
    addEntrySection.nodes.add(addEntryButton);
    
    expander.connect(containerElement);
    expander.collapse(containerElement);
  }
  
  set dayDate(ZeDate day) => dayDateElement.text = day.toGermanString();
  
  void addTimeEntryUI(Element timeEntryUI) {
    timeEntriesElement.nodes.add(timeEntryUI);
  }
}
