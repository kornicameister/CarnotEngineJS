Ext.define('CE.model.PVChart', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'pressure', type: 'number'},
        {name: 'volume', type: 'number'}
    ],
    proxy : {
        type: 'memory'
    }
});
