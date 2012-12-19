part of zemobileLib;

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
      if (container.classes.contains(Classes.CONTAINER_COLLAPSED)) {
        expand(container);
      } else {
        collapse(container);
      }
    }
  }
  
  void expand(Element element) {
    Element container = findContainer(element); 

    container.classes.remove(Classes.CONTAINER_COLLAPSED);
    container.classes.add(Classes.CONTAINER_EXPANDED);
  }
  
  void collapse(Element element) {
    Element container = findContainer(element); 

    container.classes.remove(Classes.CONTAINER_EXPANDED);
    container.classes.add(Classes.CONTAINER_COLLAPSED);
  }
  
  Element findExpander(Element element) {
    if (element ==  null) return null;
    if(element.classes.contains(Classes.EXPANDER)) {
      return element;  
    } 
    
    return element.query('.${Classes.EXPANDER}');
  }
  
  Element findHeader(Element element) {
    if (element ==  null) return null;
    if (element.classes.contains(Classes.HEADER)) {
      return element;
    }
    return findHeader(element.parent);
  }
  
  Element findContainer(Element element) {
    if (element ==  null) return null;
    if (element.classes.contains(Classes.CONTAINER)) {
      return element;
    }
    return findContainer(element.parent);
  }
}
