goog.provide('zemobile.Menu');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.array');


goog.require('zemobile.seite');
goog.require('zemobile.seite.Seite');

/**
 * @constructor
 * @extends {zemobile.seite.Seite}
 */
zemobile.Menu = function() {
    goog.base(this, 'menu');

    var links = goog.dom.getElementsByTagNameAndClass('a', null, this.getSeitenElement());

    goog.array.forEach(links, function(link) {
        zemobile.seite.seitenAktivierungAnmeldenUeberLink(link);
    });
};

goog.inherits(zemobile.Menu, zemobile.seite.Seite);
goog.addSingletonGetter(zemobile.Menu);

zemobile.seite.seiteAnmelden(zemobile.Menu.getInstance());







