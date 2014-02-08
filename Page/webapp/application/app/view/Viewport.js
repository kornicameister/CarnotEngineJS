Ext.define('CE.view.Viewport', {
    extend  : 'Ext.Viewport',
    uses    : [
        'CE.view.CarnotAnimationPanel',
        'CE.view.CarnotNavigator'
    ],
    layout  : {
        type   : 'border',
        split  : true,
        padding: 5
    },
    defaults: {
        margins     : '5 5 5 5',
        bodyPadding : 5,
        monitorValid: true,
        autoScroll  : true
    },
    items   : [
        {
            region: 'north',
            html  : '<h1 class="x-panel-header">Carnot Engine Simulation</h1>'
        },
        {
            xtype      : 'carnotNavigator',
            region     : 'west',
            title      : 'Navigation',
            collapsible: true,
            width      : 250
        },
        {
            xtype : 'carnotAnimation',
            region: 'center',
            title : 'Animation and charts'
        }
    ]
});
