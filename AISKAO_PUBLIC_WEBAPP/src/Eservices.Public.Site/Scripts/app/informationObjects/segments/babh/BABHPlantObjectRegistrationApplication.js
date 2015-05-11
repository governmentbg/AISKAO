define('babh/BABHPlantObjectRegistrationApplication',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'common/ElectronicAdministrativeServiceHeader',
    'common/ServiceApplicantReceiptData',
    'common/EKATTEAddress',
    'common/AttachedDocuments',
    'common/ElectronicAdministrativeServiceFooter'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        ElectronicAdministrativeServiceHeader,
        ServiceApplicantReceiptData,
        EKATTEAddress,
        AttachedDocuments,
        ElectronicAdministrativeServiceFooter) {

        var BABHPlantObjectRegistrationApplication = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Заявление за издаване на удостоверение за търговия и преопаковане на продукти за растителна защита';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1097';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    regionalDirectionCode: 'BABHRegionalDirectionCode',
                    regionalDirectionName: 'BABHRegionalDirectionName'
                }
            };

            var headerData = {
                sunauServiceURI: '0011-000010',
                sunauServiceName: '"Издаване на удостоверение за търговия и преопаковане на продукти за растителна защита"',
                registerIndex: '10',
                batchNumber: '7',
                documentTypeName: '"Заявление за издаване на удостоверение за търговия и преопаковане на продукти за растителна защита"'
            };
            var localEHeader = new ElectronicAdministrativeServiceHeader();
            localEHeader.initElectronicServiceHeader(headerData);
            this.electronicAdministrativeServiceHeader = ko.observable(localEHeader);

            this.serviceTermType = ko.observable();
            //this.serviceTermType.nomServiceTermTypes = ko.observableArray(Enums.serviceTermTypes);
            this.serviceTermType.serviceTermTypes = ko.observableArray();
            this.serviceTermType.displayValue = ko.observable();
            var self = this;
            self.serviceTermType.isLoading = ko.observable(true);
            datacontext.getServiceTermTypes(this._settings.xmlns, this.serviceTermType.serviceTermTypes)
               .then((function (data) {
                   if (gp.isLoadingDocument === true) {
                       var self = this;
                       var serviceTermTypeCode = self.serviceTermType();
                       if (serviceTermTypeCode) {
                           self.serviceTermType.displayValue(ko.utils.arrayFirst(self.serviceTermType.serviceTermTypes(), function (item) {
                               if (item.key === serviceTermTypeCode) {
                                   return item;
                               }
                           }));
                       }
                   }
                   this.serviceTermType.isLoading(false);
               }).bind(this));

            this.serviceTermType.title = 'Вид на услугата, спрямо срока за предоставянето й';
            this.serviceTermType.extend({
                fieldIsFromEnum: {
                    field: this.serviceTermType,
                    nomenclatureTitle: 'Номенклатура на видовете услуги, спрямо срока за предоставянето им',
                    nomenclatureValues: Enums.serviceTermTypes
                },
                fieldIsrequired: {
                    field: this.serviceTermType,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.serviceApplicantReceiptData = ko.observable(new ServiceApplicantReceiptData());
            this.serviceApplicantReceiptData()._settings.applicationXmlNS(this._settings.xmlns);
            this.serviceApplicantReceiptData.extend({
                fieldIsRequired: {
                    field: this.serviceApplicantReceiptData,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.regionalDirectionCode = ko.observable();
            this.regionalDirectionName = ko.observable();

            this.plantObjectActivityNomenlatyre = ko.observable();
            this.plantObjectActivityNomenlatyre.nomPlantObjectActivityTypes = ko.observableArray(Enums.plantObjectActivityTypes);
            this.plantObjectActivityNomenlatyre.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.plantObjectActivityNomenlatyre.subscribe(this.initPlant, this);
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
            this.plantObjectType.nomPlantObjectTypes = ko.observableArray(Enums.plantObjectTypes);
            this.plantObjectType.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.plantObjectType.subscribe(this.initPlantObjectType, this);
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
            this.plantObjectRealAddress()._settings.sectionIsRequired(true);
            this.plantObjectRealAddress.extend({
                fieldIsRequired: {
                    field: this.plantObjectRealAddress,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.plantObjectRealAddress().districtCode.subscribe(function () {
                datacontext.getDirectionsByCode(this.plantObjectRealAddress().districtCode, this.regionalDirectionName);
            }, this);

            this.regionalDirectionName.isLoading = ko.observable(false);
            this.regionalDirectionCode = ko.computed({
                read: function () {
                    return this.plantObjectRealAddress().districtCode();
                },
                write: function (value) {
                    return value;
                },
                owner: this
            });

            this.attachedDocuments = ko.observable(new AttachedDocuments());

            this.electronicAdministrativeServiceFooter = ko.observable(new ElectronicAdministrativeServiceFooter());
            this.electronicAdministrativeServiceFooter.extend({
                fieldIsRequired: {
                    field: this.electronicAdministrativeServiceFooter,
                    sectionTitle: this._settings.sectionTitle
                }
            });
        }
        BABHPlantObjectRegistrationApplication.prototype = function () {
            var initServiceTermType = function () {
                if (gp.isLoadingDocument === true) {
                    var self = this;
                    var serviceTermTypeCode = this.serviceTermType();
                    if (serviceTermTypeCode) {
                        datacontext.getServiceTermTypes(self._settings.xmlns, self.serviceTermType.serviceTermTypes)
                          .then(function () {
                              self.serviceTermType.displayValue(ko.utils.arrayFirst(self.serviceTermType.serviceTermTypes(), function (item) {
                            if (item.key === serviceTermTypeCode) {
                                return item;
                            }
                              }));
                          });
                    }
                }
            },
            initPlant = function () {
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
            initPlantObjectType = function () {
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
            initPlant = function () {
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
            toJSON = function () {
                if (this.attachedDocuments && this.attachedDocuments.attachedDocument && this.attachedDocuments.attachedXmlDocument && this.attachedDocuments.attachedDocument.length === 0 && this.attachedDocuments.attachedXmlDocument.length === 0) {
                    this.attachedDocuments = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initServiceTermType: initServiceTermType,
                initPlant: initPlant,
                initPlantObjectType: initPlantObjectType,
                initPlant: initPlant,
                toJSON: toJSON
            }
        }();

        return BABHPlantObjectRegistrationApplication;

    });