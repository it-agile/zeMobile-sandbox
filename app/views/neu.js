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

        value: 'HEADER',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label',

        label: M.LabelView.design({

            value: 'neu3'

        })

    }),

    tabs: zeMobile.tabsView


});

