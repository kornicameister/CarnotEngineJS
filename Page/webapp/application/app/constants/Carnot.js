Ext.define('CE.constants.Carnot', {
    singleton      : true,
    t1             : 0,
    t2             : 0,
    mols           : 0,
    volume         : 0,
    pressure       : 0,
    convertToKelvin: function (temp) {
        if (!Ext.isNumber(temp)) {
            temp = Ext.Number.from(temp);
        }
        console.log('Converting ' + temp + ' to Kelvins');
        return {
            celsius: temp,
            kelvins: 273.15 + temp
        };
    },
    isValid        : function () {
        var t1 = this['t1']['kelvins'],
            t2 = this['t2']['kelvins'];
        return t1 > t2;
    }
});
