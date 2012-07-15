void activityTests() {

  group('An activity', () {
    var a1 = new Activity(1, 'A1');
    var a1n = new Activity(1, 'A1');
    var a2 = new Activity(2, 'A2');

    test('should equal itself', () => expect(a1 == a1, isTrue));
    test('should equal an activity with the same properties', () => expect(a1 == a1n, isTrue));
    test('should not equal null', () => expect(a1 == null, isFalse));
    test('should not equal a different activity', () => expect(a1 == a2, isFalse));
  });
  
}
