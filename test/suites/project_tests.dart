void projectTests() {
  var describe = group;
  var it = test;
  
  describe('A project based on a JSON string', () {
    var project = new Project(JSON.parse("""
      {
          "taetigkeiten": [
              {
                  "name": "P1T1",
                  "id": 1
              },
              {
                  "name": "P1T2",
                  "id": 2
              }
          ],
          "name": "P1"
      }
    """));
    
    it('should extract the name', () => expect(project.name, equals('P1')));
    it('should extract two activities', () => expect(project.activities.length, equals(2)));
  });
  
}
