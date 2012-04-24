#library('zeMobile test suites');

#import('../dart/ze_mobile_lib.dart');
#import('../../../dahlia/src/dahlia.dart');

#source('suites/login_tests.dart');
#source('suites/web_service_requester_tests.dart');
#source('suites/activity_provider_tests.dart');

void testSuites() {
  loginTests();
  webServiceRequesterTests();
  activityProviderTests();
}