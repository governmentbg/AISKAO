define('babh/BABHFoodObjectRegistrationCertificate',
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
        'babh/FoodGroupsList',
        'common/Officials',
        'common/PersonNames',
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
        FoodGroupsList,
        Officials,
        PersonNames,
        ForeignCitizenNames,
        XMLDigitalSignature,
        RegisteredDocumentURI) {

        var BABHFoodObjectRegistrationCertificate = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Удостоверение за регистрация на обект за производство и търговия с храни';
            this._settings.sectionIsRequired = ko.observable(false);
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1077';
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

            this.foodObjectRegistrationType = ko.observable();
            this.foodObjectRegistrationType.nomFoodObjectRegistrationTypes = ko.observableArray(Enums.foodObjectRegistrationTypes);
            this.foodObjectRegistrationType.title = "Вид регистрация на обект за производство и търговия с храни";
            this.foodObjectRegistrationType.displayValue = ko.observable();
            this.foodObjectRegistrationType.displayValue = ko.computed(function () {
                var foodObjectRegistrationTypeCode = this.foodObjectRegistrationType();
                var res = ko.utils.arrayFirst(this.foodObjectRegistrationType.nomFoodObjectRegistrationTypes(), function (item) {
                    if (item.key === foodObjectRegistrationTypeCode) {
                        return item;
                    }
                });
                res = (res !== undefined && res !== null) ? res : { key: -1, name: "-" };
                return res;
            }, this);
            
            //if (gp.isLoadingDocument === true) {
                //this.foodObjectRegistrationType.subscribe(this.initFoodObjectRegistrationType, this);
            //}
            this.foodObjectRegistrationType.subscribtion = this.foodObjectRegistrationType.subscribe(this.changeFoodObjectRegistrationType, this);
            this.foodObjectRegistrationType.extend({
                //fieldIsRequired: {
                //    field: this.foodObjectRegistrationType,
                //    sectionTitle: this._settings.sectionTitle
                //},
                fieldIsFromEnum: {
                    field: this.foodObjectRegistrationType,
                    nomenclatureTitle: 'Номенклатура за вид на обект за производство и търговия с храни',
                    nomenclatureValues: Enums.foodObjectRegistrationTypes
                }
            });

            this.foodObjectPurpose = ko.observable();
            this.foodObjectPurpose.nomFoodObjectPurposeTypes = ko.observable(Enums.foodObjectPurposeTypes);
            this.foodObjectPurpose.title = "Вид обект за производство и търговия с храни";
            this.foodObjectPurpose.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.foodObjectPurpose.subscribe(this.initFoodObjectPurpose, this);
            }
            this.foodObjectPurpose.subscribtion = this.foodObjectPurpose.subscribe(this.changeFoodObjectPurpose, this);
            this.foodObjectPurpose.extend({
                fieldIsRequired: {
                    field: this.foodObjectPurpose,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromEnum: {
                    field: this.foodObjectPurpose,
                    nomenclatureTitle: 'Номенклатура за вид на обект за производство и търговия с храни',
                    nomenclatureValues: Enums.foodObjectPurposeTypes
                }
            });

            this.foodObjectCategory = ko.observable();
            this.foodObjectCategory.title = "Категория обект за производство и търговия с храни";
            this.foodObjectCategory.extend({
                fieldIsRequired: {
                    field: this.foodObjectCategory,
                    sectionTitle: this._settings.sectionTitle
                }
            });

             this.foodObjectRequirementsMetDescription = ko.observable();
             this.foodObjectRequirementsMetDescription.title = "Изисквания за обект";
             this.foodObjectRequirementsMetDescription.extend({
                     fieldIsRequired: {
                         field: this.foodObjectRequirementsMetDescription,
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

            this.foodObjectRegistrationTemporaryStartDate = ko.observable();
            this.foodObjectRegistrationTemporaryStartDate.title = "Начална дата на временна регистрация";
            var self = this;
            this.foodObjectRegistrationTemporaryStartDate.extend({
                fieldIsRequired: {
                    params: {
                        field: this.foodObjectRegistrationTemporaryStartDate,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return (self.foodObjectRegistrationType() === 'R-1066')
                    }
                }
            });

            this.foodObjectRegistrationTemporaryEndDate = ko.observable();
            this.foodObjectRegistrationTemporaryEndDate.title = "Крайна дата на временна регистрация";
            var self = this;
            this.foodObjectRegistrationTemporaryEndDate.extend({
                fieldIsRequired: {
                    params: {
                        field: this.foodObjectRegistrationTemporaryEndDate,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return (self.foodObjectRegistrationType() === 'R-1066')
                    }
                }
            });

            this.foodObjectName = ko.observable();
            this.foodObjectName.title = "Наименование на обект";
            this.foodObjectName.extend({
                fieldIsRequired: {
                    field: this.foodObjectName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.foodObjectRealAddress = ko.observable(new EKATTEAddress());
            this.foodObjectRealAddress.title = "Адрес на обект за производство и търговия с храни";
            this.foodObjectRealAddress.extend({
                fieldIsRequired: {
                    field: this.foodObjectRealAddress,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.residence = ko.observable(new Residence());
            this.residence.title = "Седалище";

            

            this.foodObjectRegistrationNumber = ko.observable();
            this.foodObjectRegistrationNumber.title = "Регистрационен номер на обект";
            this.foodObjectRegistrationNumber.extend({
                fieldIsRequired: {
                    field: this.foodObjectRegistrationNumber,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.foodGroupsList = ko.observable(new FoodGroupsList());
            this.foodGroupsList.title = "Списък на групите храни в обекта";
            this.foodGroupsList.extend({
                fieldIsRequired: {
                    field: this.foodGroupsList,
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

            this.xmlDigitalSignature = ko.observable();
            this.xmlDigitalSignature.title = "Данни за електронен подпис на XML документ по XADES стандарта";
            //this.xmlDigitalSignature.extend({
            //    fieldIsRequired: {
            //        field: this.xmlDigitalSignature,
            //        sectionTitle: this._settings.sectionTitle
            //    }
            //});
        }

        BABHFoodObjectRegistrationCertificate.prototype = function () {
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
        initFoodObjectPurpose = function () {
            if (gp.isLoadingDocument === true) {
                this.foodObjectPurpose.subscribtion.dispose();
                var self = this;
                foodObjectPurposeCode = this.foodObjectPurpose();
                if (foodObjectPurposeCode) {

                    self.foodObjectPurpose.displayValue(ko.utils.arrayFirst(self.foodObjectPurpose.nomFoodObjectPurposeTypes(), function (item) {
                        if (item.key === foodObjectPurposeCode) {
                            return item;
                        }
                    }));
                    self.foodGroupsList().foodGroups.foodPurpose(foodObjectPurposeCode);
                    self.foodObjectPurpose.subscribe(self.changeFoodObjectPurpose, self);
                }
            }
        },
         changeFoodObjectPurpose = function (data) {
             if (gp.isLoadingDocument === false) {
                 var self = this;
                 if (data) {
                     this.foodObjectPurpose(data);
                     this.foodGroupsList(new FoodGroupsList());
                     this.foodGroupsList().foodGroups.foodPurpose(data);
                 }
                 else if (!data) {
                     this.foodGroupsList(undefined);
                 }
             }
         },
         initFoodObjectRegistrationType = function () {
             if (gp.isLoadingDocument === true) {
                 this.foodObjectRegistrationType.subscribtion.dispose();
                 var self = this,
                     foodObjectRegistrationTypeCode = this.foodObjectRegistrationType();
                 if (foodObjectRegistrationTypeCode) {
                     this.foodObjectRegistrationType.displayValue(ko.utils.arrayFirst(this.foodObjectRegistrationType.nomFoodObjectRegistrationTypes(), function (item) {
                         if (item.key === foodObjectRegistrationTypeCode) {
                             return item;
                         }
                     }));
                 }
                 this.foodObjectRegistrationType.subscribe(this.changeFoodObjectRegistrationType, this);
             }
         },
         changeFoodObjectRegistrationType = function (data) {
             if (gp.isLoadingDocument === false) {
                 if (data === "R-1067") {
                     this.foodObjectRegistrationTemporaryStartDate(undefined);
                     this.foodObjectRegistrationTemporaryEndDate(undefined);
                 }
                 //else if (data === "R-1052") {
                 //    this.foodObjectRegistrationType(data);
                 //}
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
                initFoodObjectPurpose: initFoodObjectPurpose,
                changeFoodObjectPurpose: changeFoodObjectPurpose,
                initFoodObjectRegistrationType: initFoodObjectRegistrationType,
                changeFoodObjectRegistrationType: changeFoodObjectRegistrationType,
                createXMLDigitalSignature: createXMLDigitalSignature,
                toJSON: toJSON
            }
        }();
            return BABHFoodObjectRegistrationCertificate;
    });