#library('zeMobile test suites');

#import('dart:json');
#import('../dart/ze_mobile_lib.dart');
#import('../../../dahlia/src/dahlia.dart');

#source('suites/mocks.dart');

#source('suites/login_tests.dart');
#source('suites/web_service_requester_tests.dart');
#source('suites/activity_provider_tests.dart');
#source('suites/month_tests.dart');
#source('suites/time_entry_tests.dart');
#source('suites/project_tests.dart');
#source('suites/activity_tests.dart');
#source('suites/date_tests.dart');
#source('suites/time_tests.dart');
#source('suites/time_entry_provider_tests.dart');

void testSuites() {
  loginTests();
  webServiceRequesterTests();
  activityProviderTests();
  monthTests();
  timeEntryTests();
  activityTests();
  projectTests();
  dateTests();
  timeTests();
  timeEntryProviderTests();
}