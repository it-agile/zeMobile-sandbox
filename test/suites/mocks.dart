class WebServiceRequesterMock extends Mock implements WebServiceRequester {}
class ErrorDisplayMock extends Mock implements ErrorDisplay {}
class ActivityRepositoryMock extends Mock implements ActivityRepository {}
class TimeEntryRepositoryMock extends Mock implements TimeEntryRepository {}
class DayDisplayMock extends Mock implements DayDisplay {}
class DayDisplayViewMock extends Mock implements DayDisplayView {}
class DayDisplayModelMock extends Mock implements DayDisplayModel {}
class DayDisplayFactoryMock extends Mock implements DayDisplayFactory {}
class TimeEntryEditorFactoryMock extends Mock implements TimeEntryEditorFactory {}
class ElementMock extends Mock implements Element {}
class TimeEntryEditorMock extends Mock implements TimeEntryEditor {}
class MonthDisplayModelMock extends Mock implements MonthDisplayModel {}
class MonthDisplayViewMock extends Mock implements MonthDisplayView {}

void clearMocks(List<Mock> mocks) => mocks.forEach((mock) => mock.log.logs.clear());

