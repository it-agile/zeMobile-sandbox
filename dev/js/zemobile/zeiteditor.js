goog.provide('zemobile.ZeitEditor');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.net.XhrIo');
goog.require('goog.Uri.QueryData');


goog.require('zemobile.seite');
goog.require('zemobile.seite.Seite');
goog.require('zemobile.taetigkeitsauswahl');
goog.require('zemobile.Menu');
goog.require('zemobile.Einstellungen');


/**
 * @constructor
 * @extends {zemobile.seite.Seite}
 */
zemobile.ZeitEditor = function () {
    goog.base(this, 'zeitEditor');

    goog.events.listen(goog.dom.getElement('zeitEditorForm'), goog.events.EventType.SUBMIT, function (e) {
        var tag = this.getTagInput().value;
        if (tag.indexOf('-') > 0) {
            tag = tag.replace(/(\d*)-(\d*)-(\d*)./, '$3.$2.$1');
        }
        var jahr = tag.replace(/\d*.\d*.(\d*)/, '$1');
        var monat = tag.replace(/\d*.(\d*).\d*/, '$1');
        var von = this.getVonZeitInput().value;
        var bis = this.getBisZeitInput().value;
        var taetigkeitsId = this.getTaetigkeitSelect()[this.getTaetigkeitSelect().selectedIndex].value;
        var kommentar = this.getKommentarInput().value;

        var benuzter = zemobile.Einstellungen.getInstance().benutzerKuerzel;

        var postData = goog.Uri.QueryData.createFromMapind({
            'tag': tag,
            'start': von,
            'ende': bis,
            'taetigkeit': taetigkeitsId,
            'kommentar': kommentar
        });

        var postDataString = postData.toDecodedString();

        goog.net.XhrIo.send('/api/zeiten/'+ jahr + '/' + monat + '/' + benuzter + '/', function() {
            var xhr = /** @type {goog.net.XhrIo} */ (e.target);
            var text = xhr.getResponseText();

        }, 'POST', postDataString);

        e.preventDefault();
    }, false, this);


    goog.events.listen(goog.dom.getElement('projektZeitEditor'), goog.events.EventType.CHANGE, function (e) {
        this.reagiereAufProjektAuswahl();
    }, false, this);

    goog.events.listen(goog.dom.getElement('zeitEditormenubacklink'), goog.events.EventType.CLICK, function (e) {
        zemobile.seite.aktiviereSeite(zemobile.Menu.getInstance().id());
        e.preventDefault();
    });
};

goog.inherits(zemobile.ZeitEditor, zemobile.seite.Seite);
goog.addSingletonGetter(zemobile.ZeitEditor);

/**
 * @inheritDoc
 */
zemobile.ZeitEditor.prototype.nachAktivierung = function () {
    var projektSelect = this.getProjektSelect();
    var zeitEditor = this;

    zemobile.taetigkeitsauswahl.ladeProjekte(function(projekte) {
        while (projektSelect.length > 0) {
            projektSelect.remove(0);
        }
        goog.array.forEach(zemobile.taetigkeitsauswahl.projekteUndTaetigkeiten_, function (projekt) {
            projektSelect.add(new Option(projekt['name'], projekt['name']));
        });
        projektSelect.selectedIndex = 0;
        zeitEditor.reagiereAufProjektAuswahl();
    });
};

zemobile.ZeitEditor.prototype.reagiereAufProjektAuswahl = function() {
    var taetigkeitZeitEditor = this.getTaetigkeitSelect();;
    while (taetigkeitZeitEditor.length > 0) {
        taetigkeitZeitEditor.remove(0);
    }

    var ausgewaehltesProjekt = this.getProjektSelect()[this.getProjektSelect().selectedIndex].text;
    var taetigkeiten = zemobile.taetigkeitsauswahl.getTaetigkeitenFuerProjekt(ausgewaehltesProjekt);
    goog.array.forEach(taetigkeiten, function (taetigkeit) {
        taetigkeitZeitEditor.add(new Option(taetigkeit['name'], taetigkeit['id']));
    });
};



/**
 * @returns {HTMLInputElement}
 */
zemobile.ZeitEditor.prototype.getTagInput = function () {
    return goog.dom.getElement('tagZeitEditor');
};

/**
 * @returns {HTMLInputElement}
 */
zemobile.ZeitEditor.prototype.getVonZeitInput = function () {
    return goog.dom.getElement('vonZeitZeitEditor');
};

/**
 * @returns {HTMLInputElement}
 */
zemobile.ZeitEditor.prototype.getBisZeitInput = function () {
    return goog.dom.getElement('bisZeitZeitEditor');
};

/**
 * @returns {HTMLSelectElement}
 */
zemobile.ZeitEditor.prototype.getProjektSelect = function () {
    return goog.dom.getElement('projektZeitEditor');
};

/**
 * @returns {HTMLSelectElement}
 */
zemobile.ZeitEditor.prototype.getTaetigkeitSelect = function () {
    return goog.dom.getElement('taetigkeitZeitEditor');
};

/**
 * @returns {HTMLInputElement}
 */
zemobile.ZeitEditor.prototype.getKommentarInput = function () {
    return goog.dom.getElement('kommentarZeitEditor');
};

zemobile.seite.seiteAnmelden(zemobile.ZeitEditor.getInstance());







