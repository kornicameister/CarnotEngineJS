Ext.define('CE.controller.CarnotCalculationController', function () {

    var getEfficiency = function (th, tl) {
        return 1 - tl['kelvins'] / th['kelvins'];
    };

    return  {
        extend          : 'Ext.app.Controller',
        views           : [
            'CE.view.calculation.CalculationResults'
        ],
        uses            : [
            'CE.view.calculation.CalculationResults',
            'CE.constants.CarnotConstants',
            'CE.constants.Carnot'
        ],
        refs            : [
            {ref: 'efficiencyField', selector: 'field[itemId=carnotEfficiency]'}
        ],
        init            : function () {
            var me = this;
            console.log('Initialized CarnotCalculationController');
        },
        startCalculation: function () {
            var me = this,
                effField = me.getEfficiencyField();
            effField.setValue(getEfficiency(CE.constants.Carnot['th'], CE.constants.Carnot['tl']));
        }
    }
});
