#library('library containing all zeMobile sources');

#import('dart:html');
#import('dart:json');
#import('dart:uri');

#source('app_builder.dart');
#source('app.dart');

#source('component/login.dart');
#source('component/month_display.dart');
#source('component/day_display.dart');
#source('component/time_entry_editor.dart');
#source('component/settings.dart');

#source('model/user.dart');
#source('model/month.dart');
#source('model/time_entry.dart');
#source('model/project.dart');
#source('model/activity.dart');
#source('model/date.dart');
#source('model/time.dart');

#source('service/web_service_requester.dart');
#source('service/activity_provider.dart');
#source('service/time_entry_provider.dart');
#source('service/activity_repository.dart');
#source('service/user_repository.dart');

#source('ui/expander.dart');
#source('ui/dialog.dart');
#source('ui/classes.dart');
#source('ui/error_display.dart');
