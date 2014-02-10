Ext.define('CE.constants.Carnot', {
    singleton  : true,
    th         : 0,
    tl         : 0,
    mols       : 0,
    volume1    : 0,
    volume2    : 0,
    volume3    : 0,
    volume4    : 0,
    compression: 0,
    cv         : 0,
    isValid    : function () {
        var t1 = this['th'],
            t2 = this['tl'];
        return t1 > t2;
    }
});
