class DayDisplayFactory {
  final Expander expander;
  final TimeEntryEditorFactory timeEntryEditorFactory;

  DayDisplayFactory(this.expander, this.timeEntryEditorFactory);
  
  DayDisplay createDayDisplay(ZeDate day) {
    var model = new DayDisplayModel(day);
    var view = new DayDisplayView(expander);
    return new DayDisplay(model, view, timeEntryEditorFactory);
  }
}

class DayDisplay {
  final DayDisplayModel model;
  final DayDisplayView view;
  final TimeEntryEditorFactory timeEntryEditorFactory;
  List<TimeEntryEditor> timeEntryEditors;
  DayDisplay(this.model, this.view, this.timeEntryEditorFactory): timeEntryEditors = [];
 
  Element createUI() {
    view.createUI();
    view.dayDate = model.day;
    view.containerElement.id = model.dayContainerId;
    
    view.addEntryButton.on.click.add(addEntryButtonTouched);
    
    return view.containerElement;
  }

  ZeDate get day => model.day;

  void addEntryButtonTouched(Event event) {
    addTimeEntry(model.createNewEntry());
  }

  TimeEntryEditor addTimeEntry(TimeEntry timeEntry) {
    var editor = timeEntryEditorFactory.createTimeEntryEditor(timeEntry);
    view.timeEntriesElement.insertBefore(editor.createUI(), view.addEntrySection);
    timeEntryEditors.add(editor);
    return editor;
  }

  void updateTimeEntries(List<TimeEntry> timeEntries) {
    var timeEntriesToProcess = new List.from(timeEntries);
    var editorsToRemove = [];
    timeEntryEditors.forEach((editor) {
      var timeEntry = takeOutMatchingEntry(timeEntriesToProcess, editor);
      if (timeEntry != null) {
        editor.updateTimeEntry(timeEntry);
      } else {
        editor.removeEditor();
        editorsToRemove.add(editor);
      }
    });
    timeEntryEditors = timeEntryEditors.filter((editor) => !editorsToRemove.some((editorToRemove) => editor === editorToRemove));
    timeEntriesToProcess.forEach(addTimeEntry);
  }

  TimeEntry takeOutMatchingEntry(List<TimeEntry> timeEntries, TimeEntryEditor editor) {
    var indexOfEntry = -1;
    var entryToUpdate = null;
    for(int i = 0; i < timeEntries.length; i++) {
      var entry = timeEntries[i];
      if (editor.isEditorOfEntry(entry)) {
        indexOfEntry = i;
        entryToUpdate = entry;
        break;
      }
    }
    if (indexOfEntry >= 0) {
      timeEntries.removeRange(indexOfEntry, 1);
    }
    return entryToUpdate;
  }

}

class DayDisplayModel {
  final ZeDate day;

  DayDisplayModel(this.day);

  String get dayContainerId => 'day${day.toString()}';

  TimeEntry createNewEntry() {
    var newEntry = new TimeEntry();
    newEntry.date = day;
    newEntry.currentlyBeingEdited = true;
    return newEntry;
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
