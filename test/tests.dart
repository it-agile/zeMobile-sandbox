#library('runs all tests on the console');

#import('../../../dahlia/src/dahlia.dart');
#import('test_suites.dart');

main() {
  testSuites();
  new Runner([new ConsoleReporter()]).run();  
}