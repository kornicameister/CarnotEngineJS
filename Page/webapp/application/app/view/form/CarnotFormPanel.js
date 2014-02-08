Ext.define('CE.view.form.CarnotFormPanel', {
    extend       : 'Ext.form.Panel',
    alias        : 'widget.carnotForm',
    fieldDefaults: {
        msgTarget : 'under',
        labelAlign: 'top'
    },
    defaults     : {
        xtype        : 'fieldcontainer',
        combineErrors: true,
        layout       : 'hbox',
        defaults     : {
            flex               : 1,
            minValue           : 1,
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
                    fieldLabel: 'T1 (C)'
                },
                {
                    itemId    : 'reservoir_t2',
                    name      : 't2',
                    fieldLabel: 'T2 (C)'
                }
            ]
        },
        {
            fieldLabel: 'Ideal gas properties',
            items     : [
                {
                    name      : 'mols',
                    fieldLabel: 'Mols (n)'
                },
                {
                    name      : 'volume',
                    fieldLabel: 'Volume (v)'
                },
                {
                    name      : 'pressure',
                    fieldLabel: 'Pressure (p)'
                }
            ]
        }
    ],
    dockedItems  : [
        {
            xtype : 'toolbar',
            dock  : 'bottom',
            ui    : 'footer',
            layout: {
                type : 'vbox',
                align: 'stretch',
                pack : 'center'
            },
            items : [
                {
                    text    : 'Save',
                    itemId  : 'saveParameters',
                    formBind: true
                },
                {
                    text    : 'Reset',
                    itemId  : 'resetAll',
                    formBind: true
                },
                {
                    text    : 'Start',
                    itemId  : 'startAnimation',
                    disabled: true
                },
                {
                    text    : 'Stop',
                    itemId  : 'stopAnimation',
                    disabled: true
                }
            ]
        }
    ]
});
