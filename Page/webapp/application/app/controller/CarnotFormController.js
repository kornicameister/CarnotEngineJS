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
                    if (key === 't1' || key === 't2') {
                        CE.constants.Carnot[key] = CE.constants.Carnot.convertToKelvin(value);
                    } else {
                        CE.constants.Carnot[key] = Ext.isNumber(value) ? value : Ext.Number.from(value);
                    }
                    console.log('CE.constants.Carnot[' + key + '] => ' + Ext.JSON.encode(CE.constants.Carnot[key]));
                });
            }
            if (!CE.constants.Carnot.isValid()) {
                Ext.Msg.alert('Invalid temperatures', 'T2 must be lower than T1 in order to run the cycle');
                form.reset();
            }
            // enable start and stop
            this.getStartAnimationButton().enable();
        },
        onResetAll = function (button) {
            console.log('Resetting animation');
            var form = button.up('form').getForm();
            form.reset();
            this.getStartAnimationButton().disable();
            this.getStopAnimationButton().disable();
        },
        onStartAnimation = function (button) {
            console.log('Starting animation');
            this.getStartAnimationButton().disable();
            this.getStopAnimationButton().enable();
        },
        onStopAnimation = function (button) {
            console.log('Stopping animation');
            this.getStartAnimationButton().enable();
            this.getStopAnimationButton().disable();
        };

    return  {
        extend  : 'Ext.app.Controller',
        views   : [
            'CE.view.CarnotFormPanel'
        ],
        requires: [
            'CE.constants.CarnotConstants',
            'CE.constants.Carnot'
        ],
        refs    : [
            {ref: 'carnotForm', selector: 'carnotParams'},
            {ref: 'resetButton', selector: 'carnotParams button[itemId=resetAll]'},
            {ref: 'startAnimationButton', selector: 'carnotParams button[itemId=startAnimation]'},
            {ref: 'stopAnimationButton', selector: 'carnotParams button[itemId=stopAnimation]'}
        ],
        init    : function () {
            var me = this;
            me.control({
                'carnotParams button[itemId=saveParameters]': {click: onSaveParameters},
                'carnotParams button[itemId=resetAll]'      : {click: onResetAll},
                'carnotParams button[itemId=startAnimation]': {click: onStartAnimation},
                'carnotParams button[itemId=stopAnimation]' : {click: onStopAnimation}
            });
            console.log('Initialized CarnotFormController');
        }
    }
});
