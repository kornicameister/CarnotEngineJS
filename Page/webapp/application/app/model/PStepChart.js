Ext.define('CE.model.PStepChart', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'pressure', type: 'number'},
        {name: 'step', type: 'number'}
    ],
    proxy : {
        type: 'memory'
    }
});
