void timeEntryTests() {
  describe('A time entry based on a JSON string', () {
    TimeEntry timeEntry = new TimeEntry(JSON.parse("""
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
    
    it('shoult extract the id of the time entry', () => expect(timeEntry.id).to(equal(1)));
    it('shoult extract the id of the activity', () => expect(timeEntry.activityId).to(equal(3)));
    it('shoult extract the date of the time entry', () => expect(timeEntry.date).to(equal(new ZeDate(8,2, 2012))));
    it('shoult extract the start of time worked on the activity', () => expect(timeEntry.start).to(equal(new ZeTime(9, 0))));
    it('shoult extract the end of time worked on the activity', () => expect(timeEntry.end).to(equal(new ZeTime(12, 0))));
    it('shoult extract the comment of the time entry', () => expect(timeEntry.comment).to(equal("bla")));
  });  
}
