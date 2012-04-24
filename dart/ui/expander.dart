class Expander {
  void connect(Element element) {
    Element expander = findExpander(element);
    Element header = findHeader(expander);
    if (header != null) {
      header.on.click.add(executeExpander);
    }
  }
  
  void executeExpander(Event event) {
    Element container = findContainer(event.currentTarget); 
    if (container != null) {
      if (container.classes.contains('containerCollapsed')) {
        container.classes.remove('containerCollapsed');
        container.classes.add('containerExpanded');
      } else {
        container.classes.remove('containerExpanded');
        container.classes.add('containerCollapsed');
      }
    }
  }
  
  Element findExpander(Element element) {
    if (element ==  null) return null;
    if(element.classes.contains('expander')) {
      return element;  
    } 
    
    return element.query('.expander');
  }
  
  Element findHeader(Element element) {
    if (element ==  null) return null;
    if (element.classes.contains('header')) {
      return element;
    }
    return findHeader(element.parent);
  }
  
  Element findContainer(Element element) {
    if (element ==  null) return null;
    if (element.classes.contains('container')) {
      return element;
    }
    return findContainer(element.parent);
  }
}
