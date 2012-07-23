void dayDisplayTests() {
  group('A day display model', () {
    var day = const ZeDate(11, 10, 2011);
    var model = new DayDisplayModel(day);

    test('should have the day passed to the constructor', () => expect(model.day, same(day)));
  });
}