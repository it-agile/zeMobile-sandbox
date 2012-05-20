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
    
    return view.containerElement;
  }
  
  void addTimeEntry(TimeEntry timeEntry) {
    TimeEntryEditor editor = timeEntryEditorFactory.createTimeEntryEditor(timeEntry);
    view.timeEntriesElement.nodes.add(editor.createUI());
  }
  
  void addTimeEntryUI(Element timeEntryUI) {
    view.addTimeEntryUI(timeEntryUI);
  }
}

class DayDisplayView {
  final ElementCreator elementCreator;
  final Expander expander;
  Element containerElement;
  Element dayDateElement;
  Element timeEntriesElement;

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
    
    expander.connect(containerElement);
    expander.collapse(containerElement);
  }
  
  set dayDate(ZeDate day) => dayDateElement.text = day.toGermanString();
  
  void addTimeEntryUI(Element timeEntryUI) {
    timeEntriesElement.nodes.add(timeEntryUI);
  }
}
