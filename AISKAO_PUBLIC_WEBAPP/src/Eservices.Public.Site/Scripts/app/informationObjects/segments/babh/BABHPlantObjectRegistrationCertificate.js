define('babh/BABHPlantObjectRegistrationCertificate',
        ['ko', 'Utils',
        'GlobalParameters',
        'Enums',
        'dataPackages/datacontext',
        'common/RegisterObjectURI',
        'common/DocumentURI',
        'common/ElectronicServiceProviderBasicData',
        'common/ElectronicServiceApplicant',
        'common/EKATTEAddress',
        'common/Residence',
        'common/Officials',
        'common/PersonNames',
        'babh/PlantObjectExecutingNamess',
        'common/ForeignCitizenNames',
        'common/XMLDigitalSignature',
        'common/RegisteredDocumentURI'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        RegisterObjectURI,
        DocumentURI,
        ElectronicServiceProviderBasicData,
        ElectronicServiceApplicant,
        EKATTEAddress,
        Residence,
        Officials,
        PersonNames,
        PlantObjectExecutingNamess,
        ForeignCitizenNames,
        XMLDigitalSignature,
        RegisteredDocumentURI) {

        var BABHPlantObjectRegistrationCertificate = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Удостоверение за търговия и преопаковане на продукти за растителна защита';
            this._settings.sectionIsRequired = ko.observable(false);
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1107';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    regionalDirectionCode: 'BABHRegionalDirectionCode',
                    regionalDirectionName: 'BABHRegionalDirectionName',
                    xmlDigitalSignature: 'XMLDigitalSignature',
                    aisCaseURI: 'AISCaseURI'
                }
            };

            this.documentTypeURI = ko.observable(new RegisterObjectURI());
            this.documentTypeURI.extend({
                fieldIsRequired: {
                    field: this.documentTypeURI,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.documentTypeName = ko.observable();
            this.documentTypeName.title = 'Наименование на документ, вписан в регистъра на информационните обекти';
            this.documentTypeName.extend({
                fieldIsRequired: {
                    field: this.documentTypeName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.documentURI = ko.observable(new DocumentURI());
            this.documentURI()._settings.sectionIsRequired(true);
            this.documentURI.extend({
                fieldIsRequired: {
                    field: this.documentURI,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.documentReceiptOrSigningDate = ko.observable();
            this.documentReceiptOrSigningDate.title = "Дата на получаване или подписване на документ";
            //this.documentReceiptOrSigningDate.extend({
            //    fieldIsRequired: {
            //        field: this.documentReceiptOrSigningDate,
            //        sectionTitle: this._settings.sectionTitle
            //    }
            //});

            var providerData = {
                providerEntityName: 'Българска Агенция по Безопасност на Храните',
                providerEntityId: '176040023'
            };
            var localEProvider = new ElectronicServiceProviderBasicData();
            localEProvider.initElectronicServiceProvider(providerData);
            this.electronicServiceProviderBasicData = ko.observable(localEProvider);

            this.electronicServiceApplicant = ko.observable(new ElectronicServiceApplicant());
            this.electronicServiceApplicant.extend({
                fieldIsRequired: {
                    field: this.electronicServiceApplicant,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.regionalDirectionCode = ko.observable();
            this.regionalDirectionCode.nomDirections = ko.observableArray();
            this.regionalDirectionCode.selectedDirection = ko.observable();
            // this.regionalDirectionCode.isLoaded = ko.observable(false);
            this.regionalDirectionCode.isLoading = ko.observable(false);
            this.regionalDirectionCode.subscribe(this.initDirection, this);
            var self = this;
            self.regionalDirectionCode.isLoading(true);
            datacontext.getDirections(this.regionalDirectionCode.nomDirections)
                       .then(function () {
                           //self.regionalDirectionCode.isLoaded(true);
                           self.regionalDirectionCode.isLoading(false);
                       });
            this.regionalDirectionCode.subscribtion = this.regionalDirectionCode.selectedDirection.subscribe(this.changeDirection, this);
            this.regionalDirectionCode.title = "Код на oбластна дирекция по безопасност на храните";
            this.regionalDirectionCode.extend({
                fieldIsRequired: {
                    field: this.regionalDirectionCode,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.regionalDirectionCode,
                    dataPackField: 'code',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.regionalDirectionCode.nomDirections
                },
            });

            this.regionalDirectionName = ko.observable();
            this.regionalDirectionName.title = "Наименование на oбластна дирекция по безопасност на храните";
            this.regionalDirectionName.extend({
                fieldIsRequired: {
                    field: this.regionalDirectionName,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.regionalDirectionName,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.regionalDirectionCode.nomDirections
                },
            });

            this.plantObjectExecutingNamess = ko.observable(new PlantObjectExecutingNamess());
            this.plantObjectExecutingNamess.extend({
                fieldIsRequired: {
                    field: this.plantObjectExecutingNamess,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.entityRepresentativeID = ko.observable();
            this.entityRepresentativeID.title = "ЕГН/ЛНЧ на представител на фирма";

            this.residence = ko.observable(new Residence());
            this.residence.title = "Седалище";

            this.plantObjectActivityNomenlatyre = ko.observable();
            this.plantObjectActivityNomenlatyre.nomPlantObjectActivityTypes = ko.observableArray(Enums.plantObjectActivityTypes);
            this.plantObjectActivityNomenlatyre.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.plantObjectActivityNomenlatyre.subscribe(this.initPlantObjectActivity, this);
            }
            this.plantObjectActivityNomenlatyre.title = "Вид дейност на обект за растителна защита";
            this.plantObjectActivityNomenlatyre.extend({
                fieldIsRequired: {
                    field: this.plantObjectActivityNomenlatyre,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromEnum: {
                    field: this.plantObjectActivityNomenlatyre,
                    nomenclatureTitle: 'Номенклатура за вид на дейност на обект за растителна защита',
                    nomenclatureValues: Enums.plantObjectActivityTypes
                }
            });

            this.plantObjectType = ko.observable();
            this.plantObjectType.nomPlantObjectTypes = ko.observable(Enums.plantObjectTypes);
            this.plantObjectType.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.plantObjectType.subscribe(this.initPlant, this);
            }
            this.plantObjectType.title = "Вид обект за растителна защита";
            this.plantObjectType.extend({
                fieldIsRequired: {
                    field: this.plantObjectType,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromEnum: {
                    field: this.plantObjectType,
                    nomenclatureTitle: 'Номенклатура за вид обект за растителна защита',
                    nomenclatureValues: Enums.plantObjectTypes
                }
            });

            this.plantObjectRealAddress = ko.observable(new EKATTEAddress());
            this.plantObjectRealAddress.extend({
                fieldIsRequired: {
                    field: this.plantObjectRealAddress,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.plantObjectRegistrationValidity = ko.observable();
            this.plantObjectRegistrationValidity.title = "Срок на валидност на разрешение (години)";
            this.plantObjectRegistrationValidity.extend({
                fieldIsRequired: {
                    field: this.plantObjectRegistrationValidity,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.aisCaseURI = ko.observable(new RegisteredDocumentURI());
            this.aisCaseURI.title = 'УРИ на преписка';

            this.official = ko.observable(new Officials());
            this.official.nomOfficial = ko.observableArray(Enums.officials);
            this.official.selectedOfficial = ko.observable();
            this.official.selectedOfficial.subscribtion = this.official.selectedOfficial.subscribe(this.changeOfficial, this);
            this.official.selectedOfficial(ko.utils.arrayFirst(this.official.nomOfficial(), function (item) {
                if (item.key === 'PersonNames') {
                    return item;
                };
            }));
            var self = this;
            this.official().personNames.subscribe(this.initOfficial, this);
            this.official().foreignCitizenNames.subscribe(this.initOfficial, this);
            this.official.extend({
                requiredOneOfFields: {
                    fields: [this.official().personNames, this.official().foreignCitizenNames],
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.xmlDigitalSignature = ko.observable();
            this.xmlDigitalSignature.title = "Данни за електронен подпис на XML документ по XADES стандарта";
            //this.xmlDigitalSignature.extend({
            //    fieldIsRequired: {
            //        field: this.xmlDigitalSignature,
            //        sectionTitle: this._settings.sectionTitle
            //    }
            //});
        }

        BABHPlantObjectRegistrationCertificate.prototype = function () {
            var initOfficial = function () {
                if (gp.isLoadingDocument === true) {
                    this.official.selectedOfficial.subscribtion.dispose();
                    official = this.official().foreignCitizenNames();
                    if (official) {
                        this.official.selectedOfficial(ko.utils.arrayFirst(this.official.nomOfficial(), function (item) {
                            if (item.key === 'ForeignCitizenNames') {
                                return item;
                            }
                        }));
                    } else {
                        this.official.selectedOfficial(ko.utils.arrayFirst(this.official.nomOfficial(), function (item) {
                            if (item.key === 'PersonNames') {
                                return item;
                            }
                        }));
                    }
                    this.official.selectedOfficial.subscribe(this.changeOfficial, this);
                }
            },
        changeOfficial = function (data) {
            if (gp.isLoadingDocument === false) {
                var self = this;
                switch (this.official.selectedOfficial().key) {
                    case 'PersonNames':
                        this.official().foreignCitizenNames(undefined);
                        this.official().personNames(new PersonNames());
                        break;
                    case 'ForeignCitizenNames':
                        this.official().personNames(undefined);
                        this.official().foreignCitizenNames(new ForeignCitizenNames());
                        break;
                }
            }
        },
        initDirection = function () {
            if (gp.isLoadingDocument === true) {
                var self = this;
                self.regionalDirectionCode.subscribtion.dispose();
                var dCode = self.regionalDirectionCode();
                if (dCode) {
                    self.regionalDirectionCode.isLoading(true);
                    datacontext.getDirections(self.regionalDirectionCode.nomDirections)
                    .then(function () {
                        self.regionalDirectionCode.isLoading(false);
                        self.regionalDirectionCode.selectedDirection(ko.utils.arrayFirst(self.regionalDirectionCode.nomDirections(), function (item) {
                            if (item.code && item.code() === dCode) {
                                return item;
                            }
                        }));
                        self.regionalDirectionCode.selectedDirection.subscribe(self.changeDirection, self);
                    });
                }
            }
        },
            changeDirection = function (newValue) {
                if (gp.isLoadingDocument === false) {
                    if (newValue) {
                        this.regionalDirectionCode(newValue.code);
                        this.regionalDirectionName(newValue.name);
                    }
                }
            },
            initPlant = function () {
                if (gp.isLoadingDocument === true) {
                    var plantObjectTypeCode = this.plantObjectType();
                    if (plantObjectTypeCode) {
                        this.plantObjectType.displayValue(ko.utils.arrayFirst(this.plantObjectType.nomPlantObjectTypes(), function (item) {
                            if (item.key === plantObjectTypeCode) {
                                return item;
                            }
                        }));
                    }
                }
            },
            initPlantObjectActivity = function () {
                if (gp.isLoadingDocument === true) {
                    var plantObjectActivityNomenlatyreCode = this.plantObjectActivityNomenlatyre();
                    if (plantObjectActivityNomenlatyreCode) {
                        this.plantObjectActivityNomenlatyre.displayValue(ko.utils.arrayFirst(this.plantObjectActivityNomenlatyre.nomPlantObjectActivityTypes(), function (item) {
                            if (item.key === plantObjectActivityNomenlatyreCode) {
                                return item;
                            }
                        }));
                    }
                }
            },
            createXMLDigitalSignature = function () {
                return new XMLDigitalSignature();
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initOfficial: initOfficial,
                changeOfficial: changeOfficial,
                initDirection: initDirection,
                changeDirection: changeDirection,
                initPlant: initPlant,
                initPlantObjectActivity: initPlantObjectActivity,
                createXMLDigitalSignature: createXMLDigitalSignature,
                toJSON: toJSON
            }
        }();
        return BABHPlantObjectRegistrationCertificate;
    });