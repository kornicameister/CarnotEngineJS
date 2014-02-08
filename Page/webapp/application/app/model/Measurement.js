Ext.define('CE.model.Measurement', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'number',
            type: 'number',
            min : 1
        }
    ],
    proxy : {
        type  : 'memory',
        reader: {
            type: 'json',
            root: 'measurements'
        }
    }
});
