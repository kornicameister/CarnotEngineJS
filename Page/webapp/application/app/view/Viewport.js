Ext.define('CE.view.Viewport', {
    extend : 'Ext.Viewport',
    uses   : [
        'CE.view.CarnotAnimationPanel',
        'CE.view.CarnotFormPanel'
    ],
    layout : {
        type   : 'border',
        split  : true,
        padding: 5
    },
    default: {
        margins     : '5 0 0 5',
        bodyPadding : 5,
        monitorValid: true,
        autoScroll  : true
    },
    items  : [
        {
            region : 'north',
            html   : '<h1 class="x-panel-header">Carnot Engine Simulation</h1>',
            border : true,
            margins: '5 5 5 5'
        },
        {
            xtype      : 'carnotParams',
            region     : 'west',
            title      : 'Parameters',
            autoHeight : true,
            bodyPadding: 5,
            width      : 500,
            collapsible: true
        },
        {
            xtype : 'carnotAnimation',
            region: 'center',
            title : 'Animation and charts'
        }
    ]
});
