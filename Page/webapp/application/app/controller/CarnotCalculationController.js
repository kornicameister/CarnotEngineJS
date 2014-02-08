Ext.define('CE.controller.CarnotCalculationController', function () {
    var getEfficiency = function (th, tl) {
            return 1 - tl['kelvins'] / th['kelvins'];
        },
        getTotalWork = function (carnot) {
            return carnot['mols'] * CE.constants.CarnotConstants.getIdealGasConstant()
                * (carnot['th']['kelvins'] - carnot['tl']['kelvins'])
                * Math.log(getVolumeInStep(carnot, 2) / getVolumeInStep(carnot, 1));
        },
        getWork = {
            /**
             * @return {number}
             */
            ISOTHERM : function (carnot, step) {
                var mols = carnot['mols'],
                    R = CE.constants.CarnotConstants.getIdealGasConstant(),
                    t = getTempInStep(carnot, step),
                    v1 = getVolumeInStep(carnot, step),
                    v2 = getVolumeInStep(carnot, step + 1);
                return -mols * R * t * Math.log((v1 / v2));
            },
            /**
             * @return {number}
             */
            ADIABATIC: function () {
                console.log('getWork in adiabatic change is always 0.0');
                return 0.0;
            }
        },
        getHeat = {
            /**
             * @return {number}
             */
            ISOTHERM : function (carnot, step) {
                return -getWork['ISOTHERM'].apply(this, [carnot, step]);
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
                return 0.0;
            },
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
            ADIABATIC: function (carnot, step) {
                return getWork['ADIABATIC'].apply(this, [carnot, step]);
            }
        },
        getTempInStep = function (carnot, step) {
            if (step % 2 === 0) {
                return carnot['tl']['kelvins'];
            } else {
                return carnot['th']['kelvins'];
            }
        },
        getVolumeInStep = function (carnot, step) {
            if (step % 2 !== 0) {
                return carnot['volume1'];
            } else {
                return carnot['volume2'];
            }
        };
    return  {
        extend          : 'Ext.app.Controller',
        uses            : [
            'CE.view.calculation.CalculationResults',
            'CE.constants.CarnotConstants',
            'CE.constants.Carnot',
            'CE.store.MeasurementsStore',
            'CE.model.Measurement'
        ],
        models          : ['Measurement'],
        views           : [
            'CE.view.calculation.CalculationResults'
        ],
        refs            : [
            {ref: 'efficiencyField', selector: 'field[itemId=carnotEfficiency]'},
            {ref: 'totalWorkField', selector: 'field[itemId=totalWork]'},
            {ref: 'measurementsGrid', selector: 'grid[itemId=measurementsGrid]'}
        ],
        statics         : {
            TIME_STEP     : 500,
            PHASE_PER_STEP: {
                1: 'ISOTHERM',
                2: 'ADIABATIC',
                3: 'ISOTHERM',
                4: 'ADIABATIC'
            }
        },
        config          : {
            animationRunning: true,
            step            : 1
        },
        init            : function () {
            var me = this;

            // add events
            me.addEvents({
                phaseCompleted: true,
                loopCompleted : true
            });

            console.log('Initialized CarnotCalculationController');
        },
        startCalculation: function () {
            var me = this,
                effField = me.getEfficiencyField(),
                twField = me.getTotalWorkField(),
                delay = CE.controller.CarnotCalculationController.TIME_STEP,
                phasePerStep = CE.controller.CarnotCalculationController.PHASE_PER_STEP,
                Measurement = me.getMeasurementModel(),
                carnot = CE.constants.Carnot,
                grid = me.getMeasurementsGrid(),
                MeasurementStore = grid.getStore();

            effField.setValue(getEfficiency(CE.constants.Carnot['th'], CE.constants.Carnot['tl']));
            twField.setValue(getTotalWork(carnot));

            var loop = function () {

                // 1. create new record;
                var step = me.getStep();
                var currentPhase = phasePerStep[step];

                var record = new Measurement({
                    th   : carnot.th.kelvins,
                    tl   : carnot.tl.kelvins,
                    phase: currentPhase,
                    work : getWork[currentPhase].apply(me, [carnot, step]),
                    heat : getHeat[currentPhase].apply(me, [carnot, step]),
                    dU   : getDU[currentPhase].apply(me, [carnot, step]),
                    dH   : getDH[currentPhase].apply(me, [carnot, step])
                });
                MeasurementStore.add(record);

                grid.getSelectionModel().select(record);
                grid.getView().focusRow(record);

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
