goog.provide('zemobile.taetigkeitsauswahl');

goog.require('goog.net.XhrIo');
goog.require('goog.dom');
goog.require('goog.array');

/**
 * @private
 * @type {Object}
 */
zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_ = [];

/**
 * @private
 * @type {Number}
 */
zemobile.taetigkeitsauswahl.letzteAktualisierung_ = null;

/**
 * @const
 * @type {Number}
 */
zemobile.taetigkeitsauswahl.AKTUALISIERUNGSINTERVAL = 60 * 60 * 1000;

/**
 *
 * @param {Function} callbackNachdemLaden
 * @private
 */
zemobile.taetigkeitsauswahl.ladeProjekteVomServer = function (callbackNachDemLaden) {
    goog.net.XhrIo.send('/api/projekte', function (e) {
        var xhr = e.target;
        zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_ = xhr.getResponseJson();
        callbackNachDemLaden(zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_);
    }, 'GET');
};

/**
 * @param {string} projektName
 * @returns {Array}
 */
zemobile.taetigkeitsauswahl.getTaetigkeitenFuerProjekt= function (projektName) {

    var projekt = goog.array.find(zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_, function (projekt) {
        if (projekt['name'] === projektName) {
            return true;
        }
    });
    return projekt.taetigkeiten;
};

/**
 *
 * @param {Function} callbackNachDemLaden
 */
zemobile.taetigkeitsauswahl.ladeProjekte = function (callbackNachDemLaden) {
    var aktuelleZeitInMilis = Date.now()
    if (zemobile.taetigkeitsauswahl.letzteAktualisierung_ === null ||
        (zemobile.taetigkeitsauswahl.letzteAktualisierung_ < (aktuelleZeitInMilis - zemobile.taetigkeitsauswahl.AKTUALISIERUNGSINTERVAL))) {
        zemobile.taetigkeitsauswahl.ladeProjekteVomServer(callbackNachDemLaden);
    } else {
        callbackNachDemLaden(zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_);
    }
};

