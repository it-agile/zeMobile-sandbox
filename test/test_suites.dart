library testSuites;

import 'dart:json';
import 'dart:html';

import '../dart/ze_mobile_lib.dart';
import 'package:unittest/unittest.dart';
import 'package:unittest/mock.dart';

part 'suites/mocks.dart';

part 'suites/date_tests.dart';
part 'suites/time_tests.dart';
part 'suites/project_tests.dart';
part 'suites/activity_tests.dart';
part 'suites/time_entry_tests.dart';
part 'suites/month_tests.dart';

part 'suites/web_service_requester_tests.dart';
part 'suites/user_repository_tests.dart';
part 'suites/activity_repository_tests.dart';
part 'suites/activity_provider_tests.dart';
part 'suites/time_entry_repository_tests.dart';
part 'suites/time_entry_provider_tests.dart';
part 'suites/settings_repository_tests.dart';
part 'suites/settings_provider_tests.dart';
part 'suites/event_dispatcher_tests.dart';

part 'suites/login_tests.dart';
part 'suites/day_display_tests.dart';
part 'suites/month_display_tests.dart';
part 'suites/time_entry_editor_tests.dart';
part 'suites/time_entry_editor_model_tests.dart';

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