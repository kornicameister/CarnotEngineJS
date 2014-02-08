Ext.define('CE.constants.RenderFunctions', {
    singleton      : true,
    renderAsPercent: function (value) {
        if (!Ext.isNumber(value)) {
            value = Ext.Number.from(value, 0.0);
        }
        value = value * 100.0;
        return Ext.String.format('{0} %', Ext.Number.toFixed(value, 2));
    }
});
