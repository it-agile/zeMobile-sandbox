part of testSuites;

void eventDispatcherTests() {
  var eventDispatcher = new EventDispatcher<int>();
  var listener1Called = false;
  var listener1Value = null;
  var listener2Called = false;
  var listener2Value = null;

  void listener1(int value) {
    listener1Called = true;
    listener1Value = value;
  }

  void listener2(int value) {
    listener2Called = true;
    listener2Value = value;
  }

  group('An event dispatcher', () {
    setUp(() {
      listener1Called = false;
      listener2Called = false;
      listener1Value = null;
      listener2Value = null;
    });

    test("shouldn't call anything if no listener is registered", () {
      eventDispatcher.dispatch(42);
      expect(listener1Called, isFalse);
      expect(listener2Called, isFalse);
      expect(listener1Value, isNull);
      expect(listener2Value, isNull);
    });

    test('should call all added listeners', () {
      eventDispatcher.addListener(listener1);
      eventDispatcher.addListener(listener2);

      eventDispatcher.dispatch(42);

      expect(listener1Called, isTrue);
      expect(listener2Called, isTrue);
      expect(listener1Value, equals(42));
      expect(listener2Value, equals(42));
    });

    test('should not call removed listeners', () {
      eventDispatcher.addListener(listener1);
      eventDispatcher.addListener(listener2);
      eventDispatcher.removeListener(listener1);

      eventDispatcher.dispatch(42);

      expect(listener1Called, isFalse);
      expect(listener2Called, isTrue);
      expect(listener1Value, isNull);
      expect(listener2Value, equals(42));
    });
  });


}