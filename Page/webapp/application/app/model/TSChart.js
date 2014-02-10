Ext.define('CE.model.TSChart', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'temperature', type: 'number'},
        {name: 'enthalpy', type: 'number'}
    ],
    proxy : {
        type: 'memory'
    }
});
