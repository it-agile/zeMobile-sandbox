part of testSuites;

void webServiceRequesterTests() {
  group('A web service requester', () {
    var user = new User('u', 'p');
    var requester = new WebServiceRequester(null);
    test('should leave urls without a user marker alone', () => expect(requester.equipWithUser('/some/url', user), equals('/some/url')));
    test('should equip urls containing the user marker with the name of the user', 
      () => expect(requester.equipWithUser('/some/url/@@USER@@', user), equals('/some/url/u')));
    test('should encode the given parameters in an apropriate form for posting', () => expect(requester.encodeFormData({'a':'b', 'c':'d'}), equals('a=b&c=d')));
  });
}