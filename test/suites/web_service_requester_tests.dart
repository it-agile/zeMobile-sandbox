void webServiceRequesterTests() {
  var describe = group;
  var it = test;
  
  describe('web service requester', () {
    User user = new User('u', 'p');
    WebServiceRequester requester = new WebServiceRequester(null);
    it('should leave urls without a user marker alone', () => expect(requester.equipWithUser('/some/url', user), equals('/some/url')));
    it('should equip urls containing the user marker with the name of the user', 
      () => expect(requester.equipWithUser('/some/url/@@USER@@', user), equals('/some/url/u')));
    it('should encode the given parameters in an apropriate form for posting', () => expect(requester.encodeFormData({'a':'b', 'c':'d'}), equals('a=b&c=d')));
  });
}