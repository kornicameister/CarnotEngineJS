Ext.define('CE.view.chart.Charts', function () {
    var getCommonProperties = function () {
        return {
            xtype      : 'chart',
            style      : 'background:#fff',
            animate    : true,
            shadow     : true,
            autoShow   : true,
            autoRefresh: true,
            autoRender : true,
            height     : 200
        }
    };
    return {
        singleton       : true,
        getPressureChart: function (store) {
            return Ext.apply({
                itemId: 'pressureChart',
                store : store,
                title : 'P/Krok',
                axes  : [
                    {
                        type          : 'Numeric',
                        minimum       : 0,
                        position      : 'left',
                        fields        : [ 'pressure', 'step' ],
                        title         : 'P(10^5 Pa)',
                        minorTickSteps: 10,
                        grid          : {
                            odd: {
                                opacity       : 1,
                                fill          : '#ddd',
                                stroke        : '#bbb',
                                'stroke-width': 0.5
                            }
                        }
                    },
                    {
                        type    : 'Numeric',
                        position: 'bottom',
                        fields  : [ 'pressure', 'step' ],
                        title   : 'Step'
                    }
                ],
                series: [
                    {
                        type  : 'column',
                        axis  : 'left',
                        yField: 'pressure',
                        xField: 'step',
                        color : '#bbb'
                    }
                ]
            }, getCommonProperties());
        },
        getTSChart      : function (store) {
            return Ext.apply({
                itemId: 'tsChart',
                store : store,
                title : 'T/S',
                axes  : [
                    {
                        type          : 'Numeric',
                        minimum       : 0,
                        position      : 'left',
                        fields        : [ 'temperature', 'enthalpy' ],
                        title         : 'T (K)',
                        minorTickSteps: 50,
                        grid          : {
                            odd: {
                                opacity       : 1,
                                fill          : '#ddd',
                                stroke        : '#bbb',
                                'stroke-width': 0.5
                            }
                        }
                    },
                    {
                        type    : 'Numeric',
                        position: 'bottom',
                        fields  : [ 'temperature', 'enthalpy' ],
                        title   : 'S'
                    }
                ],
                series: [
                    {
                        type  : 'line',
                        axis  : 'left',
                        xField: 'enthalpy',
                        yField: 'temperature',
                        color : '#bbb'
                    }
                ]
            }, getCommonProperties());
        },
        getPVChart      : function (store) {
            return Ext.apply({
                itemId: 'pvChart',
                store : store,
                title : 'P/V',
                axes  : [
                    {
                        type          : 'Numeric',
                        minimum       : 0,
                        position      : 'left',
                        fields        : [ 'pressure', 'volume' ],
                        title         : 'P(10^5 Pa)',
                        minorTickSteps: 10,
                        grid          : {
                            odd: {
                                opacity       : 1,
                                fill          : '#ddd',
                                stroke        : '#bbb',
                                'stroke-width': 0.5
                            }
                        }
                    },
                    {
                        type          : 'Numeric',
                        position      : 'bottom',
                        fields        : [ 'pressure', 'volume' ],
                        title         : 'V (m3)',
                        minorTickSteps: 0.01,
                        maximum       : 1
                    }
                ],
                series: [
                    {
                        type        : 'line',
                        markerConfig: {
                            radius: 5,
                            size  : 5
                        },
                        axis        : 'left',
                        yField      : 'pressure',
                        xField      : 'volume',
                        color       : '#a00'
                    }
                ]
            }, getCommonProperties());
        }
    }
});
