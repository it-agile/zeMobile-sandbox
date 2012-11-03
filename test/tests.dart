library consoleTestRunner;

import 'package:unittest/unittest.dart';
import 'package:unittest/html_enhanced_config.dart';
import 'test_suites.dart';

main() {
  useHtmlEnhancedConfiguration();
  testSuites();
}