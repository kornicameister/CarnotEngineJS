Ext.define('CE.model.Measurement', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'number',
            type: 'number',
            min : 1
        },
        {
            name: 't1',
            type: 'number'
        },
        {
            name: 't2',
            type: 'number'
        },
        {
            name: 'phase',
            type: 'string'
        },
        {
            name: 'work',
            type: 'number'
        },
        {
            name: 'heat',
            type: 'number'
        }
    ],
    proxy : {
        type    : 'memory',
        autoLoad: false,
        reader  : {
            type: 'json',
            root: 'measurements'
        }
    }
});
