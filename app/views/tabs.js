zeMobile.tabsView = M.TabBarView.design({
    childViews: 'tabNeu tabUebersicht tabEinstellungen',
    transition: M.TRANSITION.FLIP,
    anchorLocation:M.BOTTOM,
    name: 'tabbar',

    tabNeu: M.TabBarItemView.design({
        value: 'Neu',
        page: 'neu',
        isActive: YES
    }),
    tabUebersicht: M.TabBarItemView.design({
        value: '�bersicht',
        page: 'uebersicht'
    }),
    tabEinstellungen: M.TabBarItemView.design({
        value: 'Einstellungen',
        page: 'einstellungen'
    })
})