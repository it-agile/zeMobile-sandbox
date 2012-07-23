void projectTests() {
  group('A project', () {
    final activity1 = new Activity(1, 'A1');
    final activity2 = new Activity(2, 'A2');
    final activity3 = new Activity(3, 'A3');
    final p1 = new Project('P1', [activity1, activity2]);

    test('should equal itself', () => expect(p1 == p1, isTrue));
    test('should equal a project with the same name and an equally sorted activity list', () =>
      expect(p1 == new Project('P1', [activity1, activity2]), isTrue));
    test('should not equal a project with the same name and a differently sorted activity list', () =>
      expect(p1 == new Project('P1', [activity2, activity1]), isFalse));
    test('should not equal a project with a different name', () =>
      expect(p1 == new Project('P2', [activity1, activity2]), isFalse));
    test('should not equal a project with no activities', () =>
      expect(p1 == new Project('P1', null), isFalse));
    test('should not equal a project with different activities', () =>
      expect(p1 == new Project('P1', [activity3]), isFalse));
    test('should not equal a project with additional activities', () =>
      expect(p1 == new Project('P1', [activity1, activity2, activity3]), isFalse));
  });
  
}
