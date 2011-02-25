// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile-sandbox
// Controller: EintragenController
// ==========================================================================

zeMobile.EintragenController = M.Controller.extend({

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
            url: 'http://127.0.0.1:8090/api/projekte/',
            username: 'sz',
            password: '123',
            async:false,
            success: function(data) {
                alert(data);
            },
            error: function(data) {
                alert(data);
            }

        })

/*        M.Request.init({
            url: 'http://sz:123@ze-test.it-agile.de/api/zeiten/2010/8/sz/',
            data: "tag=13.08.2010&start=9:00&ende=17:00&taetigkeit=31&kommentar=Dies ist ein Test",
            method: 'POST',
            onSuccess: function(data) {
                alert('funzt' +data);
            },
            onError: function(data) {
                alert('funzt nicht' + data);
            }
        }).send();    */
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