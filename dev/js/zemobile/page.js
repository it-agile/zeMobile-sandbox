goog.provide('zemobile.page');
goog.provide('zemobile.page.Page');

goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.EventType');

goog.require('zemobile.taetigkeitsauswahl');


/**
 * @type {string}
 * @const
 */
zemobile.page.CSS_CLASS_PAGE_ACTIVE = 'page-active';

/**
 * @enum {string}
 */
zemobile.page.Page = {
    MENU : 'menu',
    ANMELDUNG : 'anmeldung',
    ZEITEDITOR : 'zeitEditor',
    UEBERSICHT : 'uebersicht'
};

/**
 *
 * @param {string} pageId
 */
zemobile.page.activatePage = function(pageId) {
    goog.dom.classes.remove(goog.dom.getElement(zemobile.page.activepage_),zemobile.page.CSS_CLASS_PAGE_ACTIVE);
    goog.dom.classes.add(goog.dom.getElement(pageId),zemobile.page.CSS_CLASS_PAGE_ACTIVE);

    if (pageId === zemobile.page.Page.ZEITEDITOR) {
        zemobile.taetigkeitsauswahl.ladeTaetigkeiten();
    }
    zemobile.page.activepage_ = pageId;
}

/**
 * @type {string}
 * @private
 */
zemobile.page.activepage_ = zemobile.page.Page.MENU;

goog.events.listen(goog.dom.getElement('zeitEditorLink'), goog.events.EventType.CLICK, function(e) {
    zemobile.page.activatePage(zemobile.page.Page.ZEITEDITOR);
    e.preventDefault();
});

goog.events.listen(goog.dom.getElement('uebersichtLink'), goog.events.EventType.CLICK, function(e) {
    zemobile.page.activatePage(zemobile.page.Page.UEBERSICHT);
    e.preventDefault();
});

goog.events.listen(goog.dom.getElement('anmeldungLink'), goog.events.EventType.CLICK, function(e) {
    zemobile.page.activatePage(zemobile.page.Page.ANMELDUNG);
    e.preventDefault();
});

goog.events.listen(goog.dom.getElement('anmeldungmenubacklink'), goog.events.EventType.CLICK, function(e) {
    zemobile.page.activatePage(zemobile.page.Page.MENU);
    e.preventDefault();
});

goog.events.listen(goog.dom.getElement('zeitEditormenubacklink'), goog.events.EventType.CLICK, function(e) {
    zemobile.page.activatePage(zemobile.page.Page.MENU);
    e.preventDefault();
});

goog.events.listen(goog.dom.getElement('uebersichtmenubacklink'), goog.events.EventType.CLICK, function(e) {
    zemobile.page.activatePage(zemobile.page.Page.MENU);
    e.preventDefault();
});


