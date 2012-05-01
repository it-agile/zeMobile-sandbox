class MonthDisplayFactory {
  final ElementCreator elementCreator;
  final Expander expander;

  MonthDisplayFactory(this.elementCreator, this.expander);
  
  MonthDisplay createMonthDisplay(Month month) {
    MonthDisplayView view = new MonthDisplayView(elementCreator, expander);
    return new MonthDisplay(month, view);
  }
}

class MonthDisplay {
  MonthDisplayView view;
  final Month month;
  
  MonthDisplay(this.month, this.view);
  
  Element createUI() {
    view.createUI();
    view.setMonth(month.month, month.year);
    
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
  
  MonthDisplayView(this.elementCreator, this.expander);
  void createUI() {
    containerElement = elementCreator.createElement(Tags.DIV, [Classes.MONTH, Classes.CONTAINER]);
    
    Element header = elementCreator.createElement(Tags.DIV,[Classes.HEADER, Classes.MONTH_HEADER]); 
    containerElement.nodes.add(header);
    
    monthNameElement = elementCreator.createElement(Tags.SPAN,[Classes.MONTH_NAME]);
    header.nodes.add(monthNameElement);
    yearElement = elementCreator.createElement(Tags.SPAN,[Classes.YEAR]);
    header.nodes.add(yearElement);

    Element floatRight = elementCreator.createElement(Tags.SPAN,[Classes.FLOAT_RIGHT]);
    header.nodes.add(floatRight);
    Element expanderElement = elementCreator.createElement(Tags.SPAN,[Classes.EXPANDER]);
    floatRight.nodes.add(expanderElement);

    daysElement = elementCreator.createElement(Tags.DIV,[Classes.DAYS, Classes.CONTENT]);
    containerElement.nodes.add(yearElement);
    
    expander.connect(containerElement);
    expander.expand(containerElement);
  }
  
  void setMonth(int month, int year) {
    monthNameElement.text = const MonthNames().monthNames[month];
    yearElement.text = '$year';
  }
}

class MonthNames {
  final List<String> monthNames;
  const MonthNames(): monthNames = ['Nullember','Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 
                                    'August', 'September', 'Oktober', 'Dezember'];
}
