Ext.onReady(function () {

    Ext.application({
        name              : 'CE',
        appFolder         : 'application/app',
        enableQuickTips   : true,
        autoCreateViewport: true,
        controllers       : [
            'CarnotFormController'
        ],
        launch            : function () {
            Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
        }
    });

});