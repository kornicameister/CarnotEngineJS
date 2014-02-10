Ext.define('CE.view.form.CarnotFormPanel', {
    extend       : 'Ext.form.Panel',
    alias        : 'widget.carnotForm',
    fieldDefaults: {
        msgTarget : 'under',
        labelAlign: 'top'
    },
    autoScroll   : true,
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
                    text    : 'Start',
                    itemId  : 'startAnimation',
                    formBind: true
                },
                {
                    text    : 'Stop',
                    itemId  : 'stopAnimation',
                    disabled: true
                },
                {
                    text    : 'Reset',
                    itemId  : 'resetAll',
                    formBind: true
                },
                {
                    text  : 'Example',
                    itemId: 'exemplaryData'
                }
            ]
        }
    ],
    items        : {
        xtype   : 'container',
        layout  : 'fit',
        defaults: {
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
                hideTrigger        : true,
                keyNavEnabled      : false,
                mouseWheelEnabled  : false,
                margin             : '0 5 0 0'
            }
        },
        items   : [
            {
                fieldLabel: 'Reservoir temperatures',
                items     : [
                    {
                        itemId    : 'reservoir_t1',
                        name      : 'th',
                        fieldLabel: 'T_H (K)'
                    },
                    {
                        itemId    : 'reservoir_t2',
                        name      : 'tl',
                        fieldLabel: 'T_L (K)'
                    }
                ]
            },
            {
                fieldLabel: 'Silnik - objętości',
                items     : [
                    {
                        name      : 'volume1',
                        fieldLabel: 'Objętość <b>I</b> (cm3)',
                        minValue  : 0.01
                    },
                    {
                        name      : 'volume2',
                        fieldLabel: 'Objętość <b>II</b> (cm3)',
                        minValue  : 0.01
                    },
                    {
                        name      : 'volume3',
                        fieldLabel: 'Objętość <b>III</b> (cm3)',
                        minValue  : 0.01
                    },
                    {
                        name      : 'volume4',
                        fieldLabel: 'Objętość <b>IV</b> (cm3)',
                        minValue  : 0.01
                    }
                ]
            },
            {
                fieldLabel: 'Ideal gas',
                layout    : {
                    type : 'vbox',
                    align: 'stretch',
                    pack : 'center'
                },
                items     : [
                    {
                        xtype            : 'combo',
                        name             : 'cv',
                        fieldLabel       : 'Gaz',
                        store            : Ext.create('Ext.data.Store', {
                            fields : [
                                {
                                    name: 'name',
                                    type: 'string'
                                },
                                {
                                    name: 'symbol',
                                    type: 'string'
                                },
                                {
                                    name: 'cv',
                                    type: 'number'
                                }
                            ],
                            data   : [
                                {name: 'Hel', symbol: 'He', cv: 12.5},
                                {name: 'Argon', symbol: 'Ar', cv: 12.5},
                                {name: 'Azot', symbol: 'N<sub>2</sub>', cv: 20.7},
                                {name: 'Tlen', symbol: 'O<sub>2</sub>', cv: 20.8},
                                {name: 'Jon amonowy', symbol: 'NH<sub>4</sub>', cv: 29.0},
                                {name: 'Dwutlenek węgla', symbol: 'CO<sub>2</sub>', cv: 29.7}
                            ],
                            sorters: [
                                {
                                    property : 'cv',
                                    direction: 'DESC'
                                }
                            ]
                        }),
                        queryMode        : 'local',
                        valueField       : 'cv',
                        tpl              : Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item">{symbol} - <em>{cv} J / mol*K</em></div>',
                            '</tpl>'
                        ),
                        displayTpl       : Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '{name}',
                            '</tpl>'
                        ),
                        hideTrigger      : false,
                        keyNavEnabled    : true,
                        mouseWheelEnabled: true
                    },
                    {
                        name      : 'mols',
                        fieldLabel: 'N'
                    }
                ]
            }
        ]
    }
});
