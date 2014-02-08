Ext.define('CE.store.MeasurementsStore', {
    extend  : 'Ext.data.Store',
    storeId : 'mStore',
    require : [
        'CE.model.Measurement'
    ],
    model   : 'CE.model.Measurement',
    autoSync: true,
    sorters : [
        {
            property : 'id',
            direction: 'DESC'
        }
    ]
});
