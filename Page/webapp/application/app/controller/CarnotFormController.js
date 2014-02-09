Ext.define('CE.controller.CarnotFormController', function () {
    var onSaveParameters = function (button) {
            console.log('onSaveParameters...');
            var form = button.up('form').getForm(),
                formValid = form.isValid(),
                formValues = form.getValues();
            console.log('Working with values ', formValues);
            if (formValid) {
                Ext.iterate(formValues, function (key, value) {
                    if (!key) {
                        Ext.Error.raise({
                            msg      : 'Invalid key detected, null or undefined',
                            errorCode: '1'
                        })
                    }
                    CE.constants.Carnot[key] = Ext.isNumber(value) ? value : Ext.Number.from(value);
                    if (key === 'volume1' || key === 'volume2') {
                        CE.constants.Carnot[key] = CE.constants.Carnot[key] / 1000.0;
                    }
                    console.log('CE.constants.Carnot[' + key + '] => ' + Ext.JSON.encode(CE.constants.Carnot[key]));
                });
            }
            if (!CE.constants.Carnot.isValid()) {
                Ext.Msg.alert('Invalid temperatures', 'T2 must be lower than T1 in order to run the cycle');
                onResetAll(button);
            }
        },
        onResetAll = function (button) {
            console.log('Resetting animation');
            var form = button.up('form').getForm();
            form.reset();
            this.getStopAnimationButton().disable();
        },
        onStartAnimation = function (button) {
            onSaveParameters(button);
            console.log('Starting animation');
            this.getStopAnimationButton().enable();
            this.getCarnotResults().expand();
            this.getController('CarnotCalculationController').startCalculation();
        },
        onStopAnimation = function (button) {
            console.log('Stopping animation');
            this.getStopAnimationButton().disable();
        };

    return  {
        extend  : 'Ext.app.Controller',
        views   : [
            'CE.view.form.CarnotFormPanel'
        ],
        requires: [
            'CE.constants.CarnotConstants',
            'CE.constants.Carnot'
        ],
        refs    : [
            {ref: 'resetButton', selector: 'carnotForm button[itemId=resetAll]'},
            {ref: 'stopAnimationButton', selector: 'carnotForm button[itemId=stopAnimation]'},
            {ref: 'carnotForm', selector: 'carnotForm'},
            {ref: 'carnotResults', selector: 'carnotResults'}
        ],
        init    : function () {
            var me = this;
            me.control({
                'carnotForm button[itemId=resetAll]'      : {click: onResetAll},
                'carnotForm button[itemId=startAnimation]': {click: onStartAnimation},
                'carnotForm button[itemId=stopAnimation]' : {click: onStopAnimation}
            });
            console.log('Initialized CarnotFormController');
        }
    }
});
