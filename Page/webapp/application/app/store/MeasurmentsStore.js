Ext.define('CE.store.MeasurementsStore', {
    extend : 'Ext.data.Store',
    storeId: 'measurementsStore',
    require: [
        'CE.model.Measurement'
    ],
    model  : 'CE.model.Measurement',
    sorters: [
        {
            property : 'number',
            direction: 'DESC'
        }
    ]
});
