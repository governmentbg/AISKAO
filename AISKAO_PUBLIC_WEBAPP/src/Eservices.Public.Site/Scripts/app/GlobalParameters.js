define('GlobalParameters',
    ['ko', 'breeze'], function (ko, breeze) {

        var GlobalParameters = function () {

            var needsToInstallFlash = ko.observable(false),
                isLoadingDocument = false,
                applicationRootURL = ko.observable("");
            var publicDataURL = PublicDataURL,
            //дали има нужда от Флаш...
            checkForFlash = function () {
                if (!window.FileReader || window.FileAPIProxy) {
                    require(['libs/swfobject'], function () {
                        var ver = swfobject.ua.pv;
                        for (var i in ver) {
                            if (ver[i] !== 0) {
                                needsToInstallFlash(false);
                                return;
                            }
                        }
                        needsToInstallFlash(true);
                    });

                } else {
                    needsToInstallFlash(false);
                }
            },
                configureBreezeManager = function () {
                    breeze.config.initializeAdapterInstances({
                        dataService: "OData"
                    });
                    breeze.NamingConvention.camelCase.setAsDefault();
                    var manager = new breeze.EntityManager(applicationRootURL() + 'odata');
                    return manager;
                };

            return {
                needsToInstallFlash: needsToInstallFlash,
                isLoadingDocument: isLoadingDocument,
                checkForFlash: checkForFlash,
                applicationRootURL: applicationRootURL,
                configureBreezeManager: configureBreezeManager,
                publicDataURL: publicDataURL,
            }
        }();

        return GlobalParameters;

    });
