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
        value: '†bersicht',
        page: 'uebersich'
    }),
    tabEinstellungen: M.TabBarItemView.design({
        value: 'Einstellungen',
        page: 'einstellungen'
    })
})