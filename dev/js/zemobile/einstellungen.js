goog.provide('zemobile.Einstellungen');

goog.require('goog.dom');
goog.require('goog.events');


goog.require('zemobile.seite');
goog.require('zemobile.seite.Seite');

/**
 * @constructor
 * @extends {zemobile.seite.Seite}
 */
zemobile.Einstellungen = function() {
    goog.base(this, 'einstellungen');

    /**
     * @type {string}
     */
    this.benutzerKuerzel = null;

    goog.events.listen(goog.dom.getElement('einstellungenForm'), goog.events.EventType.SUBMIT, function(e) {
        var benutzerkuerzelInput = goog.dom.getElement('benutzerkuerzel');
        this.benutzerKuerzel = benutzerkuerzelInput.value;
        zemobile.seite.aktiviereSeite(zemobile.Menu.getInstance().id());
        e.preventDefault();
    }, false, this);

    goog.events.listen(goog.dom.getElement('einstellungenmenubacklink'), goog.events.EventType.CLICK, function (e) {
        zemobile.seite.aktiviereSeite(zemobile.Menu.getInstance().id());
        e.preventDefault();
    });


};

goog.inherits(zemobile.Einstellungen, zemobile.seite.Seite);
goog.addSingletonGetter(zemobile.Einstellungen);

zemobile.seite.seiteAnmelden(zemobile.Einstellungen.getInstance());







