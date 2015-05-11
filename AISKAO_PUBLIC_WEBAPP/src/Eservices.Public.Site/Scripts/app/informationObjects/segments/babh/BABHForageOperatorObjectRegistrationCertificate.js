define('babh/BABHForageOperatorObjectRegistrationCertificate',
        ['ko', 'Utils',
        'GlobalParameters',
        'Enums',
        'dataPackages/datacontext',
        'common/RegisterObjectURI',
        'common/DocumentURI',
        'common/ElectronicServiceProviderBasicData',
        'common/ElectronicServiceApplicant',
        'babh/ForageOperatorActivitiesData',
        'common/EKATTEAddress',
        'common/Residence',
        'common/Officials',
        'common/PersonNames',
        'common/ForeignCitizenNames',
        'babh/ForageMaterialData',
        'babh/ForageSupplementProductionData',
        'babh/ForagePremixProductionData',
        'babh/ForageCombinedMaterialCountData',
        'babh/ForageCombinedSupplementPremixData',
        'babh/ForageMaterialByProductionData',
        'babh/ForageSupplementTradingData',
        'babh/ForagePremixTradingData',
        'babh/ForageCombinedTradingData',
        'babh/ForageTradingWarehouseData',
        'babh/ForageCombinedProducesQTYMonthlyAnimalTypeData',
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
        ForageOperatorActivitiesData,
        EKATTEAddress,
        Residence,
        Officials,
        PersonNames,
        ForeignCitizenNames,
        ForageMaterialData,
        ForageSupplementProductionData,
        ForagePremixProductionData,
        ForageCombinedMaterialCountData,
        ForageCombinedSupplementPremixData,
        ForageMaterialByProductionData,
        ForageSupplementTradingData,
        ForagePremixTradingData,
        ForageCombinedTradingData,
        ForageTradingWarehouseData,
        ForageCombinedProducesQTYMonthlyAnimalTypeData,
        XMLDigitalSignature,
        RegisteredDocumentURI) {

        var BABHForageOperatorObjectRegistrationCertificate = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Удостоверение за регистрация на обекти и оператори, които не задържат фуражи на склад';
            this._settings.sectionIsRequired = ko.observable(false);
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1293';
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

            this.forageOperatorActivitiesData = ko.observable(new ForageOperatorActivitiesData());
            this.forageOperatorActivitiesData.title = "Данни за дейности на оператор във фуражния сектор";
            this.forageOperatorActivitiesData.selectedForageOperatorActivities = ko.observable();
            this.forageOperatorActivitiesData.extend({
                fieldIsRequired: {
                    field: this.forageOperatorActivitiesData,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.forageCombinedProducesQTYMonthlyAnimalTypeData = ko.observable(new ForageCombinedProducesQTYMonthlyAnimalTypeData());

            this.forageObjectAddress = ko.observable(new EKATTEAddress());
            this.forageObjectAddress.extend({
                fieldIsRequired: {
                    field: this.forageObjectAddress,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.forageOperatorObjectRegistrationNumber = ko.observable();
            this.forageOperatorObjectRegistrationNumber.title = "Регистрационен номер на обект на оператор във фуражния сектор";
            this.forageOperatorObjectRegistrationNumber.extend({
                fieldIsRequired: {
                    field: this.forageOperatorObjectRegistrationNumber,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.residence = ko.observable(new Residence());
            this.residence.title = "Седалище";

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

            this.xmlDigitalSignature = ko.observable();
            this.xmlDigitalSignature.title = "Данни за електронен подпис на XML документ по XADES стандарта";
            //this.xmlDigitalSignature.extend({
            //    fieldIsRequired: {
            //        field: this.xmlDigitalSignature,
            //        sectionTitle: this._settings.sectionTitle
            //    }
            //});
        }

        BABHForageOperatorObjectRegistrationCertificate.prototype = function () {
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
                this.regionalDirectionCode.subscribtion.dispose();
                var self = this,
                    dCode = this.regionalDirectionCode();
                if (dCode) {
                    this.regionalDirectionCode.isLoading(true);
                    datacontext.getDirections(this.regionalDirectionCode.nomDirections)
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
            createXMLDigitalSignature = function () {
                return new XMLDigitalSignature();
            },
            toJSON = function () {
            return Utils.toJSONForXML(this, this._settings.options);
        };
            return {
                initOfficial: initOfficial,
                changeOfficial: changeOfficial,
                changeDirection: changeDirection,
                initDirection: initDirection,
                createXMLDigitalSignature: createXMLDigitalSignature,
                toJSON: toJSON
            }
        }();
        return BABHForageOperatorObjectRegistrationCertificate;
    });