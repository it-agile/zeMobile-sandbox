goog.provide('zemobile.Uebersicht');

goog.require('goog.dom');
goog.require('goog.events');


goog.require('zemobile.seite');
goog.require('zemobile.seite.Seite');

/**
 * @constructor
 * @extends {zemobile.seite.Seite}
 */
zemobile.Uebersicht = function() {
    goog.base(this, 'uebersicht');

    /**
     * @type {string}
     */
    this.benutzerKuerzel = null;

    goog.events.listen(goog.dom.getElement('uebersichtmenubacklink'), goog.events.EventType.CLICK, function (e) {
        zemobile.seite.aktiviereSeite(zemobile.Menu.getInstance().id());
        e.preventDefault();
    });


};

goog.inherits(zemobile.Uebersicht, zemobile.seite.Seite);
goog.addSingletonGetter(zemobile.Uebersicht);

zemobile.seite.seiteAnmelden(zemobile.Uebersicht.getInstance());







