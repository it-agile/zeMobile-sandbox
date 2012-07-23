#library('zeMobile test suites');

#import('dart:json');
#import('dart:html');
#import('../dart/ze_mobile_lib.dart');
#import('../packages/unittest/unittest.dart');

#source('suites/mocks.dart');

#source('suites/date_tests.dart');
#source('suites/time_tests.dart');
#source('suites/project_tests.dart');
#source('suites/activity_tests.dart');
#source('suites/time_entry_tests.dart');
#source('suites/month_tests.dart');

#source('suites/web_service_requester_tests.dart');
#source('suites/user_repository_tests.dart');
#source('suites/activity_repository_tests.dart');
#source('suites/activity_provider_tests.dart');
#source('suites/time_entry_repository_tests.dart');
#source('suites/time_entry_provider_tests.dart');

#source('suites/login_tests.dart');
#source('suites/day_display_tests.dart');

class Bla {
  bla(void blub(int kak)) {
    blub(42);
  }
}

class BlaMock extends Mock implements Bla {}

void testSuites() {
  dateTests();
  timeTests();
  activityTests();
  projectTests();
  timeEntryTests();
  monthTests();

  webServiceRequesterTests();
  userRepositoryTests();
  activityRepositoryTests();
  activityProviderTests();
  timeEntryRepositoryTests();
  timeEntryProviderTests();

  loginTests();
  dayDisplayTests();
}