Ext.define('CE.view.CarnotAnimationPanel', function () {
    return {
        extend  : 'Ext.panel.Panel',
        alias   : 'widget.carnotAnimation',
        uses    : [
            'CE.store.MeasurementsStore'
        ],
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
                        xtype     : 'grid',
                        title     : 'Measurements',
                        itemId    : 'measurementsGrid',
                        height    : 250,
                        autoScroll: true,
                        border    : true,
                        store     : Ext.StoreManager.lookup('mStore'),
                        columns   : [
                            {
                                text     : 'T1',
                                dataIndex: 'th',
                                width    : 75,
                                sortable : false,
                                filter   : false,
                                renderer : function (value) {
                                    return CE.constants.RenderFunctions.renderAsValue(value);
                                }
                            },
                            {
                                text     : 'T2',
                                dataIndex: 'tl',
                                width    : 75,
                                sortable : false,
                                filter   : false,
                                renderer : function (value) {
                                    return CE.constants.RenderFunctions.renderAsValue(value);
                                }
                            },
                            {
                                text     : 'W',
                                dataIndex: 'work',
                                width    : 120,
                                sortable : false,
                                filter   : false,
                                renderer : function (value) {
                                    return CE.constants.RenderFunctions.renderAsValue(value);
                                }
                            },
                            {
                                text     : 'H',
                                dataIndex: 'heat',
                                width    : 120,
                                sortable : false,
                                filter   : false,
                                renderer : function (value) {
                                    return CE.constants.RenderFunctions.renderAsValue(value);
                                }
                            },
                            {
                                text     : '&#916;U',
                                dataIndex: 'dU',
                                width    : 75,
                                sortable : false,
                                filter   : false,
                                renderer : function (value) {
                                    return CE.constants.RenderFunctions.renderAsValue(value);
                                }
                            },
                            {
                                text     : '&#916;H',
                                dataIndex: 'dH',
                                width    : 75,
                                sortable : false,
                                filter   : false,
                                renderer : function (value) {
                                    return CE.constants.RenderFunctions.renderAsValue(value);
                                }
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
            },
            {
                xtype : 'panel',
                title : 'Charts',
                itemId: 'charts',
                layout: 'fit',
                flex  : 1
            }
        ]
    }
});
