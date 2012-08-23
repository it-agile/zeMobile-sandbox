#library('html.dart');

class Element {}
class InputElement {}
class SelectElement {}
class DivElement {}
class Event {}

Document document = const Document();

class Document {
  final Window window;

  const Document():window = new Window();
}

class Window {
  Map localStorage = {};
}
