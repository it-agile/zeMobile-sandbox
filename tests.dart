#library('runs all tests on the console');

#import('packages/unittest/unittest.dart');
#import('packages/unittest/html_enhanced_config.dart');
#import('test/test_suites.dart');

main() {
  useHtmlEnhancedConfiguration();
  testSuites();
}