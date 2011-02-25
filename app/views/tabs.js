zeMobile.tabsView = M.TabBarView.design({
    childViews: 'tabNeu tabUebersicht tabEinstellungen',
    transition: M.TRANSITION.FLIP,
    anchorLocation:M.BOTTOM,
    id: 'tabbbar',

    tabNeu: M.TabBarItemView.design({
        id: 'neuTab',
        value: 'Neu',
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
})
