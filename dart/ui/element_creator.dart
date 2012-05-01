class ElementCreator {
  Element createElement(String tagName, [List<String> classes]) {
    Element element = new Element.tag(tagName);
    if (classes != null) {
      element.classes.addAll(classes);
    }
    return element;
  }
}
