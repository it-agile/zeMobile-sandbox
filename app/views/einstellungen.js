// ==========================================================================
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

