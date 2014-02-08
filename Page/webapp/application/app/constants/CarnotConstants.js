Ext.define('CE.constants.CarnotConstants', {
    singleton       : true,
    getR            : function () {
        return 8.3144621;
    },
    getCV           : function () {
        return 12.5;
    },
    getCP           : function () {
        return this.getCV() + this.getR();
    },
    getIsothermName : function () {
        return 'ISOTHERM';
    },
    getAdiabaticName: function () {
        return 'ADIABATIC';
    }
});
