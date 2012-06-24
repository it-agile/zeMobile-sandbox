void activityTests() {
  var describe = group;
  var it = test;
  
  describe('An activity based on a JSON string', () {
    Activity activity = new Activity(JSON.parse("""
      {
          "name": "P1T1",
          "id": 1
      }
    """));
    
    it('should extract the name', () => expect(activity.name, equals('P1T1')));
    it('should extract the id', () => expect(activity.id, equals(1)));
  });
  
}
