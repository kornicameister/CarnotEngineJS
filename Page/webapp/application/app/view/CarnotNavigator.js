Ext.define('CE.view.CarnotNavigator', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.carnotNavigator',
    uses  : [
        'CE.view.form.CarnotFormPanel',
        'CE.view.calculation.CalculationResults'
    ],
    layout: {
        type         : 'accordion',
        titleCollapse: true,
        animate      : true,
        activeOnTop  : true
    },
    items : [
        {
            xtype     : 'carnotForm',
            title     : 'Parameters',
            autoHeight: true
        },
        {
            xtype     : 'carnotResults',
            title     : 'Results',
            autoHeight: true
        }
    ]
});
