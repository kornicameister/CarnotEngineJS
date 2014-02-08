Ext.onReady(function () {

    Ext.application({
        name              : 'CE',
        appFolder         : 'application/app',
        enableQuickTips   : true,
        autoCreateViewport: true,
        controllers       : [
            'CarnotFormController',
            'CarnotCalculationController'
        ],
        launch            : function () {
            Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
        }
    });

});