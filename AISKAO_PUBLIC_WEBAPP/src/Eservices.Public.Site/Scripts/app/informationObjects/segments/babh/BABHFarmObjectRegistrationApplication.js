define('babh/BABHFarmObjectRegistrationApplication',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'common/ElectronicAdministrativeServiceHeader',
    'common/ServiceApplicantReceiptData',
    'babh/AnimalHoldingAddressData',
    'babh/BABHAnimalObjectData',
    'common/AttachedDocuments',
    'common/ElectronicAdministrativeServiceFooter',
     'dataPackages/datacontext'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        ElectronicAdministrativeServiceHeader,
        ServiceApplicantReceiptData,
        AnimalHoldingAddressData,
        BABHAnimalObjectData,
        AttachedDocuments,
        ElectronicAdministrativeServiceFooter,
        datacontext) {

        var BABHFarmObjectRegistrationApplication = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Заявление за регистрация на зоопаркове, аквариуми, терариуми, циркове, ферми, волиери и вивариуми';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1424';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    regionalDirectionCode: 'BABHRegionalDirectionCode',
                    regionalDirectionName: 'BABHRegionalDirectionName',
                    animalObjectData: 'BABHAnimalObjectData'
                }
            };


            var headerData = {
                sunauServiceURI: '0011-000010',
                sunauServiceName: '"Регистрация на зоопаркове, аквариуми, терариуми, циркове, ферми, волиери и вивариуми"',
                registerIndex: '10',
                batchNumber: '7',
                documentTypeName: '"Заявление за регистрация на зоопаркове, аквариуми, терариуми, циркове, ферми, волиери и вивариуми"'
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

            //this.serviceTermType.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.serviceTermType.subscribe(this.initServiceTermType, this);
            }
            this.serviceTermType.title = 'Вид на услугата, спрямо срока за предоставянето й';
            this.serviceTermType.extend({
                fieldIsFromEnum: {
                    field: this.serviceTermType,
                    nomenclatureTitle: 'Номенклатура на видовете услуги, спрямо срока за предоставянето им',
                    nomenclatureValues: Enums.serviceTermTypes
                },
                fieldIsRequired: {
                    field: this.serviceTermType,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.serviceApplicantReceiptData = ko.observable(new ServiceApplicantReceiptData());
            this.serviceApplicantReceiptData()._settings.applicationXmlNS(this._settings.xmlns);

            this.farmObjectRecipientActing = ko.observable();
            this.farmObjectRecipientActing.title = "Качество на получателя на услугата по отношение на животновъдния обект (собственик/ упълномощено лице/ползвател)";

            this.regionalDirectionCode = ko.observable();
            this.regionalDirectionName = ko.observable();

            this.animalHoldingAddressData = ko.observable(new AnimalHoldingAddressData());
            this.animalHoldingAddressData().EKATTEAddress().districtCode.subscribe(function () {
                datacontext.getDirectionsByCode(this.animalHoldingAddressData().EKATTEAddress().districtCode, this.regionalDirectionName);
            }, this);
            this.animalHoldingAddressData.title = "Данни за местонахождение на животновъден обект";
            this.animalHoldingAddressData.extend({
                fieldIsRequired: {
                    field: this.animalHoldingAddressData,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.regionalDirectionName.isLoading = ko.observable(false);
            this.regionalDirectionCode = ko.computed({
                read: function() {  
                    return this.animalHoldingAddressData().EKATTEAddress().districtCode();
                },
                write: function (value) {
                    return value;
                },
                owner: this
            });

            this.animalObjectData = ko.observable(new BABHAnimalObjectData());

            this.attachedDocuments = ko.observable(new AttachedDocuments());

            this.electronicAdministrativeServiceFooter = ko.observable(new ElectronicAdministrativeServiceFooter());
        }
        BABHFarmObjectRegistrationApplication.prototype = function () {
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
            toJSON = function () {
                if (this.attachedDocuments &&
                    this.attachedDocuments.attachedDocument &&
                    this.attachedDocuments.attachedXmlDocument &&
                    this.attachedDocuments.attachedDocument.length === 0 &&
                    this.attachedDocuments.attachedXmlDocument.length === 0) {
                        this.attachedDocuments = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initServiceTermType: initServiceTermType,
                toJSON: toJSON
            }
        }();

        return BABHFarmObjectRegistrationApplication;

    });