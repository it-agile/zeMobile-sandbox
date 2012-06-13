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

class Foo {
  void doIt(String one, [String two, String three]) {}

  void foo2() {
      Foo foo = new Foo();
      foo.doIt();
  }
}


