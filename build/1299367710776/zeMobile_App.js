// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile
// Model: Zeit
// ==========================================================================

zeMobile.Zeit = M.Model.create({
    __name__: 'Zeit', // do not delete this property!

 // Sample model properties:

    firstName: M.Model.attr('String',{
        isRequired:YES
    }),

    lastName: M.Model.attr('String', {
        isRequired:YES
    }),

    zip: M.Model.attr('Integer', {
        isRequired:NO,
        validators: [M.NumberValidator]
    })

}, M.DataProviderLocalStorage);// adapted from here: http://ostermiller.org/calc/encode.html
var base64 = {};

(function () {
  var END_OF_INPUT = -1,
      base64Chars = new Array(
        'A','B','C','D','E','F','G','H',
        'I','J','K','L','M','N','O','P',
        'Q','R','S','T','U','V','W','X',
        'Y','Z','a','b','c','d','e','f',
        'g','h','i','j','k','l','m','n',
        'o','p','q','r','s','t','u','v',
        'w','x','y','z','0','1','2','3',
        '4','5','6','7','8','9','+','/'),
      reverseBase64Chars = new Array(),
      base64Str,
      base64Count;

  for (var i=0; i < base64Chars.length; i++){
      reverseBase64Chars[base64Chars[i]] = i;
  }

  function setBase64Str(str){
      base64Str = str;
      base64Count = 0;
  }
  function readBase64(){
      if (!base64Str) return END_OF_INPUT;
      if (base64Count >= base64Str.length) return END_OF_INPUT;
      var c = base64Str.charCodeAt(base64Count) & 0xff;
      base64Count++;
      return c;
  }
  function readReverseBase64(){
      if (!base64Str) return END_OF_INPUT;
      while (true){
          if (base64Count >= base64Str.length) return END_OF_INPUT;
          var nextCharacter = base64Str.charAt(base64Count);
          base64Count++;
          if (reverseBase64Chars[nextCharacter]){
              return reverseBase64Chars[nextCharacter];
          }
          if (nextCharacter == 'A') return 0;
      }
      return END_OF_INPUT;
  }

  function ntos(n){
      n=n.toString(16);
      if (n.length == 1) n="0"+n;
      n="%"+n;
      return unescape(n);
  }

  base64.encode = function(str){
      setBase64Str(str);
      var result = '';
      var inBuffer = new Array(3);
      var lineCount = 0;
      var done = false;
      while (!done && (inBuffer[0] = readBase64()) != END_OF_INPUT){
          inBuffer[1] = readBase64();
          inBuffer[2] = readBase64();
          result += (base64Chars[ inBuffer[0] >> 2 ]);
          if (inBuffer[1] != END_OF_INPUT){
              result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30) | (inBuffer[1] >> 4) ]);
              if (inBuffer[2] != END_OF_INPUT){
                  result += (base64Chars [((inBuffer[1] << 2) & 0x3c) | (inBuffer[2] >> 6) ]);
                  result += (base64Chars [inBuffer[2] & 0x3F]);
              } else {
                  result += (base64Chars [((inBuffer[1] << 2) & 0x3c)]);
                  result += ('=');
                  done = true;
              }
          } else {
              result += (base64Chars [(( inBuffer[0] << 4 ) & 0x30)]);
              result += ('=');
              result += ('=');
              done = true;
          }
          lineCount += 4;
          if (lineCount >= 76){
              result += ('\n');
              lineCount = 0;
          }
      }
      return result;
  }

  base64.decode = function(str){
      setBase64Str(str);
      var result = "";
      var inBuffer = new Array(4);
      var done = false;
      while (!done && (inBuffer[0] = readReverseBase64()) != END_OF_INPUT
          && (inBuffer[1] = readReverseBase64()) != END_OF_INPUT){
          inBuffer[2] = readReverseBase64();
          inBuffer[3] = readReverseBase64();
          result += ntos((((inBuffer[0] << 2) & 0xff)| inBuffer[1] >> 4));
          if (inBuffer[2] != END_OF_INPUT){
              result +=  ntos((((inBuffer[1] << 4) & 0xff)| inBuffer[2] >> 2));
              if (inBuffer[3] != END_OF_INPUT){
                  result +=  ntos((((inBuffer[2] << 6)  & 0xff) | inBuffer[3]));
              } else {
                  done = true;
              }
          } else {
              done = true;
          }
      }
      return result;
  }
})()// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile-sandbox
// Controller: EintragenController
// ==========================================================================

m_require('app/controllers/base64.js');

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
            url: 'http://ze-test.it-agile.de/api/projekte/',
            dataType: 'text',
            'beforeSend': function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + base64.encode("sz:123"));
            },
            success: function(data) {
                alert('Erfolg:' + data);
            },
            error: function(data) {
                alert('Fehler:'+ data);
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

});zeMobile.tabsView = M.TabBarView.design({
    childViews: 'tabNeu tabUebersicht tabEinstellungen',
    transition: M.TRANSITION.FLIP,
    anchorLocation:M.BOTTOM,
    id: 'tabbbar',

    tabNeu: M.TabBarItemView.design({
        id: 'neuTab',
        value: 'Neu 3',
        page: 'neu',
        isActive: YES
    }),
    tabUebersicht: M.TabBarItemView.design({
        value: 'Übersicht',
        page: 'uebersicht'
    }),
    tabEinstellungen: M.TabBarItemView.design({
        value: 'Einstellungen',
        page: 'einstellungen'
    })
})// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile
// Page: einstllungen
// ==========================================================================

m_require('app/views/tabs.js');

zeMobile.einstellungen = M.PageView.design({

    /*
     * uncomment the following lines, to use the onLoad function
     * to trigger a function every time the page is rendered.
     */

    /*
     onLoad: {
     target: ServerTest.MyController,
     action: 'init'
     },
     */

    childViews: 'header content tabs',

    header: M.ToolbarView.design({

        value: 'HEADER',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label',

        label: M.LabelView.design({

            value: 'einstellungen'

        })

    }),
    tabs: zeMobile.tabsView
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile
// Page: neu
// ==========================================================================

m_require('app/views/tabs.js');

zeMobile.neu = M.PageView.design({

    /*
     * uncomment the following lines, to use the onLoad function
     * to trigger a function every time the page is rendered.
     */

    /*
     onLoad: {
     target: ServerTest.MyController,
     action: 'init'
     },
     */

    name: 'neuPage',

    childViews: 'header content tabs',

    header: M.ToolbarView.design({

        id: 'neuHeader',
        value: 'HEADER',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'neuForm',

        neuForm: M.FormView.design({
            childViews: 'textZeitVon textZeitBis textProject textTaetigkeit buttonEintragen',

            textZeitVon: M.TextFieldView.design({
                label: 'Zeit',
                name: 'zeitVon',
                inline: YES
            }),

            textZeitBis: M.TextFieldView.design({
                name: 'zeitBis',
                inline: YES
            }),

            textProject: M.TextFieldView.design({
                label: 'Project',
                name: 'project'
            }),

            textTaetigkeit: M.TextFieldView.design({
                label: 'Tätigkeit',
                name: 'taetigkeit'
            }),

            buttonEintragen: M.ButtonView.design({
                value: 'Eintragen',
                type: 'submit',
                target: zeMobile.EintragenController,
                action: 'neueZeitEintragen'
            })
        })
    }),

    tabs: zeMobile.tabsView


});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile
// Page: uebersicht
// ==========================================================================

m_require('app/views/tabs.js');

zeMobile.uebersicht = M.PageView.design({

    /*
     * uncomment the following lines, to use the onLoad function
     * to trigger a function every time the page is rendered.
     */

    /*
     onLoad: {
     target: ServerTest.MyController,
     action: 'init'
     },
     */

    childViews: 'header content tabs',

    header: M.ToolbarView.design({

        value: 'HEADER',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label',

        label: M.LabelView.design({

            value: 'uebersicht'

        })

    }),

    tabs: zeMobile.tabsView
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile 
// ==========================================================================

var zeMobile = zeMobile || {};

zeMobile.app = M.Application.design({

    entryPage : 'neu', // define the entry/start page of your app. This property must be provided!

    neu: zeMobile.neu,
    uebersicht: zeMobile.uebersicht,
    einstellungen: zeMobile.einstellungen
});