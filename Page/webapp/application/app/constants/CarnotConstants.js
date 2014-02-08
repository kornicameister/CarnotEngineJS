Ext.define('CE.constants.CarnotConstants', {
    singleton: true,
    statics  : {
        getIdealGasConstant: function () {
            return 8.3144621;
        },
        getIsothermName    : function () {
            return 'ISOTHERM';
        },
        getAdiabaticName   : function () {
            return 'ADIABATIC';
        }
    }
});
