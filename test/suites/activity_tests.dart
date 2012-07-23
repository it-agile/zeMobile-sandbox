void activityTests() {

  group('An activity', () {
    var a1 = new Activity(1, 'A1');

    test('should equal itself', () => expect(a1 == a1, isTrue));
    test('should equal an activity with the same properties', () => expect(a1 == new Activity(1, 'A1'), isTrue));
    test('should not equal null', () => expect(a1 == null, isFalse));
    test('should not equal an activity with a different id', () => expect(a1 == new Activity(2, 'A1'), isFalse));
    test('should not equal an activity with a different name', () => expect(a1 == new Activity(1, 'A2'), isFalse));
  });
  
}
