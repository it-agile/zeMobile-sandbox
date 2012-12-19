part of zemobileLib;

class EventDispatcher<E> {
  List _listeners;
  EventDispatcher(): _listeners = [];

  addListener(void listener(E)) => _listeners.add(listener);
  removeListener(void listener(E)) => _listeners = _listeners.filter((l) => l != listener );
  dispatch(E event) => _listeners.forEach((listner) => listner(event));
}