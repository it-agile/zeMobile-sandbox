// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile-sandbox
// Controller: EintragenController
// ==========================================================================

eMobile.EintragenController = M.Controller.extend({

    // sample controller property.
	   myControllerProperty: '',


    neueZeitEintragen: function() {
        $.ajax({
/*            data: {
                tag:'14.08.2010',
                start:'9:00',
                ende:'17:00',
                taetigkeit:31,
                kommentar:'Dies ist ein Test'},
            url: 'http://ze-test.it-agile.de/api/zeiten/2010/8/sz/',
            type: 'POST',     */
            url: '/api/projekte/',
            dataType: 'text',
            username: 'rb',
            password: 'bla',
            success: function(data) {
                alert('Erfolg:' + data);
            },
            error: function(data) {
                alert('Fehler:'+ data);
            }

        })
    },


    /*
     * Sample function
     * To handle the first load of a page.
     */
    init: function(isFirstLoad) {

        if(isFirstLoad) {

            // do something here, when page is loaded the first time.

        }

        // do something, for any other load.

    }

    /*
     * Example function, which shows how to switch to another page
     * Function is triggered by setting target & action in a view.
    ,switchToExamplePage: function() {

        //this.switchToPage(M.ViewManager.getPage('examplePage'));

    }
    */

});