// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile
// Page: einstllungen
// ==========================================================================

zeMobile.einstllungen = M.PageView.design({

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

    childViews: 'header content',

    header: M.ToolbarView.design({

        value: 'HEADER',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label',

        label: M.LabelView.design({

            value: 'einstllungen'

        })

    }),

    tabs: zeMobile.tabs
});

// ==========================================================================
// The M-Project - Mobile HTML5 Application Framework
// Generated with: Espresso 0.0.9
//
// Project: zeMobile
// Page: neu
// ==========================================================================

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

    childViews: 'header content tabs',

    header: M.ToolbarView.design({

        value: 'HEADER',

        anchorLocation: M.TOP

    }),

    content: M.ScrollView.design({

        childViews: 'label',

        label: M.LabelView.design({

            value: 'neu'

        })

    }),

    tabs: M.TabBarView.design({
        childViews: 'tabNeu tabUebersicht tabEinstellungen',
        anchorLocation:M.BOTTOM,
        transition:M.TRANSITION.FLIP,
        name: 'tabbar',

        tabNeu: M.TabBarItemView.design({
            value: 'Neu',
            page: 'neu',
            isActive: YES
        }),
        tabUebersicht: M.TabBarItemView.design({
            value: '�bersicht',
            page: 'uebersich'
        }),
        tabEinstellungen: M.TabBarItemView.design({
            value: 'Einstellungen',
            page: 'einstellungen'
        })
    })


});

zeMobile.tabs = M.TabBarView.design({
    childViews: 'tabNeu tabUebersicht tabEinstellungen',
    anchorLocation:M.BOTTOM,
    transition:M.TRANSITION.FLIP,
    name: 'tabbar',

    tabNeu: M.TabBarItemView.design({
        value: 'Neu',
        page: 'neu',
        isActive: YES
    }),
    tabUebersicht: M.TabBarItemView.design({
        value: '�bersicht',
        page: 'uebersich'
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
// Page: uebersicht
// ==========================================================================

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

    childViews: 'header content',

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

    tabs: zeMobile.tabs
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
    einstellungen: zeMobile.einstllungen
});