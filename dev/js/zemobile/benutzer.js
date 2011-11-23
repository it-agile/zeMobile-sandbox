goog.provide('zemobile.benutzer');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');


/**
 * @type {string}
 * @private
 */
zemobile.benutzer.username_ = '';

/**
 * @type {string}
 * @private
 */
zemobile.benutzer.passwort_ = '';

/**
 *
 * @param {string} username
 * @param {string} passwort
 */
zemobile.benutzer.anmelden = function(username, passwort) {
    zemobile.benutzer.username_ = username;
    zemobile.benutzer.passwort_ = passwort;
}

/**
 * @return {string}
 */
zemobile.benutzer.username = function() {
    return zemobile.benutzer.username_;
}


goog.events.listen(goog.dom.getElement('anmeldenForm'), goog.events.EventType.SUBMIT, function(e) {
    var usernameInput = goog.dom.getElement('benutzer');
    var passwortInput = goog.dom.getElement('passwort');
    zemobile.benutzer.anmelden(usernameInput.value, passwortInput.value);
});

