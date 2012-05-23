class ElementCreator {
  Element createElement(String tagName, [List<String> classes, Element parent]) {
    Element element = new Element.tag(tagName);
    if (classes != null) {
      element.classes.addAll(classes);
    }
    if (parent != null) {
      parent.nodes.add(element);
    }
    return element;
  }
}
