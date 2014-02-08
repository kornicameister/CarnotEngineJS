Ext.define('CE.view.CarnotAnimationPanel', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.carnotAnimation',
    layout  : {
        type: 'hbox'
    },
    defaults: {
        margin: '5 5 5 5'
    },
    items   : [
        {
            xtype : 'container',
            layout: 'anchor',
            flex  : 2,
            items : [
                {
                    xtype      : 'panel',
                    title      : 'Engine',
                    anchor     : '100% 60%',
                    bodyPadding: 5,
                    items      : {
                        xtype  : 'draw',
                        viewBox: false,
                        items  : [
                            {
                                type  : 'circle',
                                fill  : '#79BB3F',
                                radius: 100,
                                x     : 100,
                                y     : 100
                            }
                        ]
                    }
                },
                {
                    xtype : 'panel',
                    title : 'Measurements',
                    anchor: '100% 40%',
                    items : [
                        {
                            xtype     : 'grid',
                            itemId    : 'measurementsGrid',
                            autoScroll: true,
                            store     : Ext.StoreManager.lookup('measurementsStore'),
                            columns   : [
                                {
                                    text     : 'PK',
                                    dataIndex: 'number',
                                    width    : 50,
                                    sortable : false,
                                    filter   : false
                                },
                                {
                                    text     : 'T1',
                                    dataIndex: 't1',
                                    width    : 50,
                                    sortable : false,
                                    filter   : false
                                },
                                {
                                    text     : 'T2',
                                    dataIndex: 't2',
                                    width    : 50,
                                    sortable : false,
                                    filter   : false
                                },
                                {
                                    text     : 'Faza',
                                    dataIndex: 'phase',
                                    sortable : false,
                                    filter   : false
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            title: 'Charts',
            flex : 1,
            items: [
            ]
        }
    ]
});
