goog.provide('zemobile.taetigkeitsauswahl');

goog.require('goog.net.XhrIo');
goog.require('goog.crypt.base64');
goog.require('goog.dom');
goog.require('goog.array');

goog.require('zemobile.benutzer');



zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_ = [];

/**
 * @param {string} projektName
 */
zemobile.taetigkeitsauswahl.waehleProjekt = function(projektName) {
    var projekt = goog.array.find(zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_, function(projekt) {
        if (projekt.name === projektName) {
            return true;
        }
    });
    var taetigkeiten = projekt.taetigkeiten;

    var taetigkeitZeitEditor = goog.dom.getElement('taetigkeitZeitEditor');
    while (taetigkeitZeitEditor.length > 0) {
        taetigkeitZeitEditor.remove(0);
    }

    goog.array.forEach(taetigkeiten, function(taetigkeit) {
        taetigkeitZeitEditor.add(new Option(taetigkeit.name, taetigkeit.name));
    });
}

zemobile.taetigkeitsauswahl.ladeTaetigkeiten = function() {
    var username = zemobile.benutzer.username();
    var passwort = zemobile.benutzer.passwort();
    var auth = 'Basic ' + goog.crypt.base64.encodeString(username+':'+passwort, false);
    goog.net.XhrIo.send('/api/projekte', function(e) {
        var xhr = e.target;
        zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_ =  xhr.getResponseJson();

        var projektZeitEditor = goog.dom.getElement('projektZeitEditor');
        while (projektZeitEditor.length > 0) {
            projektZeitEditor.remove(0);
        }
        goog.array.forEach(zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_, function(projekt) {
            projektZeitEditor.add(new Option(projekt.name, projekt.name));
        });
        zemobile.taetigkeitsauswahl.waehleProjekt(zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_[0].name);

    },'GET', null,{'Authorization': auth});
};

goog.events.listen(goog.dom.getElement('projektZeitEditor'), goog.events.EventType.CHANGE, function(e) {
    zemobile.taetigkeitsauswahl.waehleProjekt(zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_[e.target.selectedIndex].name);
});


