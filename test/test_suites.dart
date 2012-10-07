#library('zeMobile test suites');

#import('dart:json');
#import('../darthtmltest/html.dart');

#import('ze_mobile_test_lib.dart');
#import('package:unittest/unittest.dart');

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
#source('suites/settings_repository_tests.dart');
#source('suites/settings_provider_tests.dart');
#source('suites/event_dispatcher_tests.dart');

#source('suites/login_tests.dart');
#source('suites/day_display_tests.dart');
#source('suites/month_display_tests.dart');
#source('suites/time_entry_editor_tests.dart');
#source('suites/time_entry_editor_model_tests.dart');

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
  settingsRepositoryTests();
  settingsProviderTests();
  eventDispatcherTests();

  loginTests();
  monthDisplayTests();
  dayDisplayTests();
  timeEntryEditorTests();
  timeEntryEditorModelTests();
}