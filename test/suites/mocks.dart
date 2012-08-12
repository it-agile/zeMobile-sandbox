class WebServiceRequesterMock extends Mock implements WebServiceRequester {}
class ErrorDisplayMock extends Mock implements ErrorDisplay {}
class ActivityRepositoryMock extends Mock implements ActivityRepository {}
class ActivityProviderMock extends Mock implements ActivityProvider {}
class TimeEntryRepositoryMock extends Mock implements TimeEntryRepository {}
class TimeEntryProviderMock extends Mock implements TimeEntryProvider {}
class DayDisplayMock extends Mock implements DayDisplay {}
class DayDisplayViewMock extends Mock implements DayDisplayView {}
class DayDisplayModelMock extends Mock implements DayDisplayModel {}
class DayDisplayFactoryMock extends Mock implements DayDisplayFactory {}
class TimeEntryEditorFactoryMock extends Mock implements TimeEntryEditorFactory {}
class ElementMock extends Mock implements Element {}
class TimeEntryEditorMock extends Mock implements TimeEntryEditor {}
class TimeEntryEditorModelMock extends Mock implements TimeEntryEditorModel {}
class TimeEntryEditorViewMock extends Mock implements TimeEntryEditorView {}
class MonthDisplayModelMock extends Mock implements MonthDisplayModel {}
class MonthDisplayViewMock extends Mock implements MonthDisplayView {}
class EventMock extends Mock implements Event {}

void clearMocks(List<Mock> mocks) => mocks.forEach((mock) => mock.reset());

