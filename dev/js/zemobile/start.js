goog.provide('zemobile.start');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');

goog.require('zemobile.page');
goog.require('zemobile.benutzer');

goog.events.listen(goog.dom.getElement('projektZeitEditor'), goog.events.EventType.SELECT, function(e) {
});

goog.events.listen(goog.dom.getElement('zeitEditorForm'), goog.events.EventType.SUBMIT, function(e) {
});
