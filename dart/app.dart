class App {
  ActivityProvider activityProvider;
  
  App(this.activityProvider);
  
  void start() {
    activityProvider.fetchProjects();
    
  }
  
}
