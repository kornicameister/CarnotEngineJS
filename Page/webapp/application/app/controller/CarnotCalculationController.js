Ext.define('CE.controller.CarnotCalculationController', function () {
    var getEfficiency = function (th, tl) {
            return 1 - tl / th;
        },
        getTotalWork = function (carnot) {
            return carnot['mols'] * CE.constants.CarnotConstants.getR()
                * (carnot['th']['kelvins'] - carnot['tl']['kelvins'])
                * Math.log(getVolumeInStep(carnot, 2) / getVolumeInStep(carnot, 1));
        },
        _getEnthalpy = function (mols, v1, v2) {
            return -mols
                * CE.constants.CarnotConstants.getR()
                * Math.log(v1 / v2)
        },
        getEnthalpy = {
            1: function (carnot) {
                return {
                    temperature: carnot['th'],
                    enthalpy   : _getEnthalpy(carnot['mols'], getVolumeInStep(carnot, 2), getVolumeInStep(carnot, 1))
                }
            },
            2: function (carnot) {
                return {
                    temperature: carnot['th'],
                    enthalpy   : _getEnthalpy(carnot['mols'], getVolumeInStep(carnot, 3), getVolumeInStep(carnot, 2))
                }
            },
            3: function (carnot) {
                return {
                    temperature: carnot['tl'],
                    enthalpy   : getEnthalpy[2].apply(this, [carnot]).enthalpy
                }
            },
            4: function (carnot) {
                return {
                    temperature: carnot['tl'],
                    enthalpy   : getEnthalpy[1].apply(this, [carnot]).enthalpy
                }
            }
        },
        getWork = {
            /**
             * @return {number}
             */
            ISOTHERM : function (carnot, step) {
                var mols = carnot['mols'],
                    R = CE.constants.CarnotConstants.getR(),
                    t = getTempInStep(carnot, step),
                    v1 = getVolumeInStep(carnot, step),
                    v2 = getVolumeInStep(carnot, step + 1);
                return -mols * R * t * Math.log((v1 / v2));
            },
            /**
             * @return {number}
             */
            ADIABATIC: function (carnot, step) {
                return carnot['mols']
                    * carnot['cv']
                    * (getTempInStep(carnot, step) - getTempInStep(carnot, step + 1));
            }
        },
        getHeat = {
            /**
             * @return {number}
             */
            ISOTHERM : function (carnot, step) {
                return getWork['ISOTHERM'].apply(this, [carnot, step]);
            },
            /**
             * @return {number}
             */
            ADIABATIC: function () {
                return 0.0;
            }
        },
        getDU = {
            /**
             * @return {number}
             */
            ISOTHERM : function () {
                return 0.0
            },
            /**
             * @return {number}
             */
            ADIABATIC: function (carnot, step) {
                return getWork['ADIABATIC'].apply(this, [carnot, step]);
            }
        },
        getDH = {
            /**
             * @return {number}
             */
            ISOTHERM : function () {
                return 0.0;
            },
            /**
             * @return {number}
             */
            ADIABATIC: function (carnot, step) {
                return carnot.mols
                    * (carnot['cv'] + CE.constants.CarnotConstants.getR())
                    * (getTempInStep(carnot, step) * getTempInStep(carnot, step + 1));
            }
        },
        getPressure = function (carnot, step) {
            var temp = 0;
            if (step == 1 || step === 2) {
                temp = carnot['th'];
            } else {
                temp = carnot['tl'];
            }
            var top = (carnot['mols'] * CE.constants.CarnotConstants.getR() * temp);
            var down = getVolumeInStep(carnot, step);
            var number = top / down;
            number = number / Math.pow(10, 5);
            return  number;
        },
        getTempInStep = function (carnot, step) {
            if (step % 2 === 0) {
                return carnot['tl'];
            } else {
                return carnot['th'];
            }
        },
        getVolumeInStep = function (carnot, step) {
            return carnot['volume' + step];
        };
    return  {
        extend          : 'Ext.app.Controller',
        uses            : [
            'CE.view.calculation.CalculationResults',
            'CE.constants.CarnotConstants',
            'CE.constants.Carnot',
            'CE.store.MeasurementsStore',
            'CE.model.Measurement',
            'CE.model.PStepChart',
            'CE.model.PVChart',
            'CE.model.TSChart',
            'CE.view.chart.Charts'
        ],
        models          : ['Measurement', 'PVChart', 'TSChart', 'PStepChart'],
        views           : [
            'CE.view.calculation.CalculationResults'
        ],
        refs            : [
            {ref: 'efficiencyField', selector: 'field[itemId=carnotEfficiency]'},
            {ref: 'totalWorkField', selector: 'field[itemId=totalWork]'},
            {ref: 'measurementsGrid', selector: 'grid[itemId=measurementsGrid]'}
        ],
        statics         : {
            TIME_STEP     : 2000,
            PHASE_PER_STEP: {
                1: 'ISOTHERM',
                2: 'ADIABATIC',
                3: 'ISOTHERM',
                4: 'ADIABATIC'
            }
        },
        config          : {
            animationRunning: true,
            step            : 1,
            pvStore         : undefined,
            tsStore         : undefined,
            pStepStore      : undefined
        },
        init            : function () {
            var me = this;

            // init stores
            me.setPvStore(Ext.create('Ext.data.Store', {
                model   : 'CE.model.PVChart',
                autoSync: true
            }));
            me.setTsStore(Ext.create('Ext.data.Store', {
                model   : 'CE.model.TSChart',
                autoSync: true
            }));
            me.setPStepStore(Ext.create('Ext.data.Store', {
                model   : 'CE.model.PStepChart',
                autoSync: true
            }));

            // add events
            me.addEvents({
                phaseCompleted: true,
                loopCompleted : true
            });

            me.control({
                'panel[itemId=charts]': {
                    afterrender: function (panel) {
                        panel.add(CE.view.chart.Charts.getPVChart(me.getPvStore()));
                        panel.add(CE.view.chart.Charts.getTSChart(me.getTsStore()));
                        panel.add(CE.view.chart.Charts.getPressureChart(me.getPStepStore()));
                    }
                }
            });

            console.log('Initialized CarnotCalculationController');
        },
        startCalculation: function () {
            var me = this,
                effField = me.getEfficiencyField(),
                twField = me.getTotalWorkField(),
                delay = CE.controller.CarnotCalculationController.TIME_STEP,
                phasePerStep = CE.controller.CarnotCalculationController.PHASE_PER_STEP,
            // models
                Measurement = me.getMeasurementModel(),
                PVChartModel = me.getPVChartModel(),
                TSChartModel = me.getTSChartModel(),
                PStepChartModel = me.getPStepChartModel(),
            // models
                carnot = CE.constants.Carnot,
                grid = me.getMeasurementsGrid(),
            // stores
                MeasurementStore = grid.getStore(),
                pStepStore = me.getPStepStore(),
                pvStore = me.getPvStore(),
                tsStore = me.getTsStore();

            effField.setValue(getEfficiency(CE.constants.Carnot['th'], CE.constants.Carnot['tl']));
            twField.setValue(getTotalWork(carnot));

            var loop = function () {

                // 1. create new record;
                var step = me.getStep();
                var currentPhase = phasePerStep[step];

                var record = new Measurement({
                    th      : carnot.th,
                    tl      : carnot.tl,
                    step    : step,
                    pressure: getPressure(carnot, step),
                    volume  : getVolumeInStep(carnot, step),
                    phase   : Ext.String.format('{0} - {1}', step, currentPhase),
                    work    : getWork[currentPhase].apply(me, [carnot, step]),
                    heat    : getHeat[currentPhase].apply(me, [carnot, step]),
                    dU      : getDU[currentPhase].apply(me, [carnot, step]),
                    dH      : getDH[currentPhase].apply(me, [carnot, step])
                });
                MeasurementStore.add(record);

                grid.getSelectionModel().select(record);
                grid.getView().focusRow(record);

                // create records for charts and add to stores

                pStepStore.add(new PStepChartModel({
                    step    : step,
                    pressure: getPressure(carnot, step)
                }));
                pvStore.add(new PVChartModel({
                    pressure: getPressure(carnot, step),
                    volume  : getVolumeInStep(carnot, step)
                }));
                tsStore.add(getEnthalpy[step].apply(me, [carnot]));

                if (me.getAnimationRunning()) {
                    if (step === 4) {
                        me.setStep(1);
                    } else {
                        me.setStep(step + 1);
                    }
                    setTimeout(loop, delay)
                }
            };
            setTimeout(loop, delay);
        }
    }
});
