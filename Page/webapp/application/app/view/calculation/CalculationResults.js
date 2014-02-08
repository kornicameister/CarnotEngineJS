Ext.define('CE.view.calculation.CalculationResults', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.carnotResults',
    uses    : [
        'CE.constants.RenderFunctions'
    ],
    defaults: {
        xtype   : 'container',
        layout  : 'hbox',
        defaults: {
            labelWidth: 100,
            value     : 0
        }
    },
    items   : [
        {
            items: [
                {
                    xtype     : 'displayfield',
                    itemId    : 'carnotEfficiency',
                    fieldLabel: 'Efficiency',
                    renderer  : function (value) {
                        return CE.constants.RenderFunctions.renderAsPercent(value);
                    },
                    flex      : 5
                },
                {
                    xtype  : 'button',
                    text   : '&#9830;',
                    flex   : 1,
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Info',
                            msg  : 'Sprawność silnika Carnot zależy jedynie od temperatur'
                        });
                    }
                }
            ]
        },
        {
            items: [
                {
                    xtype     : 'displayfield',
                    itemId    : 'totalWork',
                    fieldLabel: 'Praca całkowita',
                    renderer  : function (value) {
                        return CE.constants.RenderFunctions.renderAsValue(value);
                    },
                    flex      : 5
                },
                {
                    xtype  : 'button',
                    text   : '&#9830;',
                    flex   : 1,
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Info',
                            msg  : 'Całkowita praca w cyklu Carnot\'a'
                        });
                    }
                }
            ]
        },
        {
            items: [
                {
                    xtype     : 'displayfield',
                    fieldLabel: '&#916;T',
                    value     : 0,
                    flex      : 5
                },
                {
                    xtype  : 'button',
                    text   : '&#9830;',
                    flex   : 1,
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Info',
                            msg  : '&#916;T w cyklu jest stała i wynosi 0'
                        });
                    }
                }
            ]
        },
        {
            items: [
                {
                    xtype     : 'displayfield',
                    fieldLabel: '&#916;H',
                    value     : 0,
                    flex      : 5
                },
                {
                    xtype  : 'button',
                    text   : '&#9830;',
                    flex   : 1,
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Info',
                            msg  : '&#916;H w cyklu jest stała i wynosi 0'
                        });
                    }
                }
            ]
        },
        {
            items: [
                {
                    xtype     : 'displayfield',
                    fieldLabel: '&#916;U',
                    value     : 0,
                    flex      : 5
                },
                {
                    xtype  : 'button',
                    text   : '&#9830;',
                    flex   : 1,
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Info',
                            msg  : '&#916;U w cyklu jest stała i wynosi 0'
                        });
                    }
                }
            ]
        },
        {
            items: [
                {
                    xtype     : 'displayfield',
                    fieldLabel: '&#916;S',
                    value     : 0,
                    flex      : 5
                },
                {
                    xtype  : 'button',
                    text   : '&#9830;',
                    flex   : 1,
                    handler: function () {
                        Ext.Msg.show({
                            title: 'Info',
                            msg  : '&#916;S w cyklu jest stała i wynosi 0'
                        });
                    }
                }
            ]
        }
    ]
});
