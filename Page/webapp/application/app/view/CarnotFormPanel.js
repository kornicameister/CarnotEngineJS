Ext.define('CE.view.CarnotFormPanel', {
    extend       : 'Ext.form.Panel',
    alias        : 'widget.carnotParams',
    fieldDefaults: {
        msgTarget : 'side',
        labelWidth: 150
    },
    defaults     : {
        anchor       : '100%',
        xtype        : 'fieldcontainer',
        combineErrors: true,
        layout       : 'vbox',
        defaults     : {
            flex               : 1,
            minValue           : 0,
            value              : 0,
            xtype              : 'numberfield',
            allowOnlyWhitespace: false,
            allowBlank         : false,
            autoStripChars     : true,
            margin             : '0 5 0 0'
        }
    },
    items        : [
        {
            fieldLabel: 'Reservoir temperatures',
            items     : [
                {
                    itemId    : 'reservoir_t1',
                    name      : 't1',
                    fieldLabel: 'T1 (C)',
                    minValue  : 1
                },
                {
                    itemId    : 'reservoir_t2',
                    name      : 't2',
                    fieldLabel: 'T2 (C)',
                    minValue  : 1
                }
            ]
        },
        {
            fieldLabel: 'Ideal gas properties',
            items     : [
                {
                    name      : 'mols',
                    fieldLabel: 'Mols (n)',
                    minValue  : 1
                },
                {
                    name      : 'volume',
                    fieldLabel: 'Volume (v)',
                    minValue  : 1
                },
                {
                    name      : 'pressure',
                    fieldLabel: 'Pressure (p)',
                    minValue  : 1
                }
            ]
        }
    ],
    buttons      : [
        {
            text    : 'Save',
            itemId  : 'saveParameters',
            formBind: true
        },
        '->',
        {
            text   : 'Reset',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});
