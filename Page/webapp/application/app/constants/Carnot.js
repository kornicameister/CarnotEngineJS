Ext.define('CE.constants.Carnot', {
    singleton      : true,
    th             : 0,
    tl             : 0,
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
        var t1 = this['th']['kelvins'],
            t2 = this['tl']['kelvins'];
        return t1 > t2;
    }
});
