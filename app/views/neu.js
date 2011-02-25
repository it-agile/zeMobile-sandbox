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

