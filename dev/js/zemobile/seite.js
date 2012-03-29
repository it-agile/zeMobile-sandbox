goog.provide('zemobile.seite');
goog.provide('zemobile.seite.Seite');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.array');


/**
 * @type {string}
 * @const
 */
zemobile.seite.CSS_CLASS_PAGE_ACTIVE = 'page-active';


/**
 * @constructor
 */
zemobile.seite.Seite = function (id) {
    /**
     * @type {string}
     * @private
     */
    this.id_ = id;

    /**
     * @type {Element}
     */
    this.seitenElement = null;
};

zemobile.seite.Seite.prototype.nachAktivierung = function () {
};

zemobile.seite.Seite.prototype.vorDeaktivierung = function () {
};

/**
 * @return {Element}
 */
zemobile.seite.Seite.prototype.getSeitenElement = function() {
    if(this.seitenElement === null) {
        this.seitenElement = goog.dom.getElement(this.id());
    }
    return this.seitenElement;
}

/**
 * @return {string} id des Seitenelements
 */
zemobile.seite.Seite.prototype.id = function () {
    return this.id_;
};


/**
 *
 * @param {string} seitenId
 */
zemobile.seite.aktiviereSeite = function (seitenId) {
    if (zemobile.seite.aktiveSeite_ !== null) {
        zemobile.seite.aktiveSeite_.vorDeaktivierung();
        goog.dom.classes.remove(goog.dom.getElement(zemobile.seite.aktiveSeite_.id()), zemobile.seite.CSS_CLASS_PAGE_ACTIVE);
    }
    zemobile.seite.aktiveSeite_ = goog.array.find(zemobile.seite.angemeldeteSeiten_, function(seite) {
        return seite.id() === seitenId;
    });
    if (zemobile.seite.aktiveSeite_) {
        goog.dom.classes.add(goog.dom.getElement(seitenId), zemobile.seite.CSS_CLASS_PAGE_ACTIVE);
        zemobile.seite.aktiveSeite_.nachAktivierung();
    }
};

/**
 *
 * @param {HTMLAnchorElement} link
 */
zemobile.seite.seitenAktivierungAnmeldenUeberLink = function(link) {
    var linkRef = link.href.replace(/[^#]*#/, '');
    goog.events.listen(link, goog.events.EventType.CLICK, function (e) {
        zemobile.seite.aktiviereSeite(linkRef);
        e.preventDefault();
    });

}

/**
 *
 * @param {zemobile.seite.Seite} seite
 */
zemobile.seite.seiteAnmelden = function(seite) {
    zemobile.seite.angemeldeteSeiten_.push(seite);
}


/**
 * @private
 * @type {Array.<zemobile.seite.Seite>}
 */
zemobile.seite.angemeldeteSeiten_ = [];


/**
 * @type {zemobile.seite.Seite}
 * @private
 */
zemobile.seite.aktiveSeite_ = null;
