Ext.define('CE.model.Measurement', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'th',
            type: 'number'
        },
        {
            name: 'tl',
            type: 'number'
        },
        {
            name: 'step',
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
        },
        {
            name: 'pressure',
            type: 'number'
        },
        {
            name: 'volume',
            type: 'number'
        },
        {
            name: 'dU',
            type: 'number'
        },
        {
            name: 'dH',
            type: 'number'
        }
    ],
    proxy : {
        type: 'memory'
    }
});
