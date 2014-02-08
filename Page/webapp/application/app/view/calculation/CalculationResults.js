Ext.define('CE.view.calculation.CalculationResults', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.carnotResults',
    uses    : [
        'CE.constants.RenderFunctions'
    ],
    defaults: {
        labelWidth: 100
    },
    items   : [
        {
            xtype     : 'displayfield',
            itemId    : 'carnotEfficiency',
            fieldLabel: 'Efficiency',
            renderer  : function (value) {
                return CE.constants.RenderFunctions.renderAsPercent(value);
            }
        }
    ]
});
