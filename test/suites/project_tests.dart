void projectTests() {
  describe('A project based on a JSON string', () {
    Project project = new Project(JSON.parse("""
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
    
    it('should extract the name', () => expect(project.name).to(equal('P1')));
    it('should extract two activities', () => expect(project.activities.length).to(equal(2)));
  });
  
}
