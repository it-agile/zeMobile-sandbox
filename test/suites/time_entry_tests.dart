void timeEntryTests() {
  group('A time entry based on a JSON string', () {
    var timeEntry = new TimeEntry(JSON.parse("""
          {
              "taetigkeit": {
                  "id": 3
              }, 
              "start": "09:00:00",
              "tag": "2012-02-08", 
              "ende": "12:00:00", 
              "id": 1, 
              "kommentar": "bla"
          }"""));
    
    test('should extract the id of the time entry', () => expect(timeEntry.id, equals(1)));
    test('should extract the id of the activity', () => expect(timeEntry.activityId, equals(3)));
    test('should extract the date of the time entry', () => expect(timeEntry.date, equals(new ZeDate(8,2, 2012))));
    test('should extract the start of time worked on the activity', () => expect(timeEntry.start, equals(new ZeTime(9, 0))));
    test('should extract the end of time worked on the activity', () => expect(timeEntry.end, equals(new ZeTime(12, 0))));
    test('should extract the comment of the time entry', () => expect(timeEntry.comment, equals("bla")));
  });  
}
