Ext.define('CE.constants.RenderFunctions', {
    singleton      : true,
    renderAsValue  : function (value) {
        if (!Ext.isNumber(value)) {
            value = Ext.Number.from(value, 0.0);
        }
        return Ext.Number.toFixed(value, 2);
    },
    renderAsPercent: function (value) {
        return Ext.String.format('{0} %', this.renderAsValue(value * 100.0));
    }
});
