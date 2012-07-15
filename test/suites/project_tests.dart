void projectTests() {
  group('A project', () {
    var p1 = new Project('P1', [new Activity(1, 'A1'), new Activity(2, 'A2')]);
    var p1n = new Project('P1', [new Activity(1, 'A1'), new Activity(2, 'A2')]);
    var p1o = new Project('P1', [new Activity(2, 'A2'), new Activity(1, 'A1')]);
    var p2 = new Project('P2', [new Activity(3, 'A3')]);

    test('should equal itself', () => expect(p1 == p1, isTrue));
    test('should equal a project with the same name and an equally sorted activity list', () => expect(p1 == p1n, isTrue));
    test('should not equal a project with the same name and a differently sorted activity list', () => expect(p1 == p1o, isFalse));
    test('should not equal a different project', () => expect(p1 == p2, isFalse));
  });
  
}
