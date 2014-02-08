Ext.define('CE.controller.CarnotFormController', function () {
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
            {
                ref     : 'carnotForm',
                selector: 'carnotParams'
            }
        ],
        init    : function () {
            var me = this;
            me.control({
                'carnotParams button[itemId=saveParameters]': {
                    click: function (button) {
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
                    }
                }
            });
            console.log('Initialized CarnotFormController');
        }
    }
});
