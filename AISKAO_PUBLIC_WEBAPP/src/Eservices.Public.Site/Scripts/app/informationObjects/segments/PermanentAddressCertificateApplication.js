define('segments/PermanentAddressCertificateApplication',
    ['ko', 'GlobalParameters', 'jquery', 'Enums', 'Utils',
        'common/ElectronicServiceProviderBasicData',
        'common/EntityBasicData',
        'common/PersonBasicData',
        'common/ServiceApplicantReceiptData',
        'common/ElectronicAdministrativeServiceHeader',
        'common/RegisterObjectURI',
        'common/ElectronicAdministrativeServiceFooter',
        'common/AttachedDocuments',
       'dataPackages/datacontext'],
    function (ko, gp, $, Enums, Utils,
        ElectronicServiceProviderBasicData,
        EntityBasicData,
        PersonBasicData,
        ServiceApplicantReceiptData,
        ElectronicAdministrativeServiceHeader,
        RegisterObjectURI,
        ElectronicAdministrativeServiceFooter,
        AttachedDocuments,
        datacontext) {

        var PermanentAddressCertificateApplication = function () {

            this._settings = {};
            this._settings.sectionTitle = 'Заявление за издаване на удостоверение за постоянен адрес';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000146';
            //this._settings.needsToInstallFlash = gp.needsToInstallFlash;
            
            var headerData = {
                sunauServiceURI: '0011-000010',
                sunauServiceName: 'Издаване на удостоверение за постоянен адрес',
                registerIndex: '10',
                batchNumber: '7',
                documentTypeName: 'Заявление за издаване на удостоверение за постоянен адрес'
            };
            var localEHeader = new ElectronicAdministrativeServiceHeader();
            localEHeader.initElectronicServiceHeader(headerData);
            this.electronicAdministrativeServiceHeader = ko.observable(localEHeader);
            this.electronicAdministrativeServiceHeader.title = 'Водеща част на заявление за предоставяне на електронна административна услуга';
            this.electronicAdministrativeServiceHeader.extend({
                fieldIsRequired: {
                    field: this.electronicAdministrativeServiceHeader,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.serviceTermType = ko.observable();
            //this.serviceTermType.serviceTermTypes = ko.observableArray(Enums.serviceTermTypes);

            this.serviceTermType.serviceTermTypes = ko.observableArray();
            var self = this;
            self.serviceTermType.isLoading = ko.observable(true);
            datacontext.getServiceTermTypes(this._settings.xmlns, this.serviceTermType.serviceTermTypes)
                        .then(function () {
                            self.serviceTermType.isLoading(false);
                        });

            this.serviceTermType.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.serviceTermType.subscribe(this.initServiceTermType, this);
            }
            this.serviceTermType.title = 'Вид на услугата, спрямо срока за предоставянето й';
            this.serviceTermType.extend({
                fieldIsRequired: {
                    field: this.serviceTermType,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromEnum: {
                    field: this.serviceTermType,
                    nomenclatureTitle: 'Номенклатура на видовете услуги, спрямо срока за предоставянето им',
                    nomenclatureValues: Enums.serviceTermTypes
                }
            });


            this.serviceApplicantReceiptData = ko.observable(new ServiceApplicantReceiptData());
            this.serviceApplicantReceiptData()._settings.applicationXmlNS(this._settings.xmlns);
            this.serviceApplicantReceiptData.title = 'Данни за получаване на резултат от услуга от заявителя';
            this.serviceApplicantReceiptData.extend({
                fieldIsRequired: {
                    field: this.serviceApplicantReceiptData,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.applicationSubject = ko.observable(new PersonBasicData());

            //file upload...fileAPI
            this.attachedDocuments = ko.observable(new AttachedDocuments());
            //this.attachedDocuments().attachedDocuments1 = ko.observableArray();

            this.electronicAdministrativeServiceFooter = ko.observable(new ElectronicAdministrativeServiceFooter());
        };

        PermanentAddressCertificateApplication.prototype = function () {
            var initServiceTermType = function () {
                var self = this;
                var serviceTypeCode = self.serviceTermType();
                if (gp.isLoadingDocument === true) {
                    datacontext.getServiceTermTypes(self._settings.xmlns, self.serviceTermType.serviceTermTypes)
                        .then(function () {
                            self.serviceTermType.displayValue(ko.utils.arrayFirst(self.serviceTermType.serviceTermTypes(), function (item) {
                                if (item.key === serviceTypeCode) {
                                    return item;
                                }
                            }));
                        });

                    //var serviceTypeCode = this.serviceTermType();
                    //if (serviceTypeCode) {
                    //    this.serviceTermType.displayValue(ko.utils.arrayFirst(this.serviceTermType.serviceTermTypes(), function (item) {
                    //        if (item.key === serviceTypeCode) {
                    //            return item;
                    //        }
                    //    }));
                    //}
                }
            },
                toJSON = function () {
                    if (this.attachedDocuments && this.attachedDocuments.attachedDocument && this.attachedDocuments.attachedXmlDocument && this.attachedDocuments.attachedDocument.length === 0 && this.attachedDocuments.attachedXmlDocument.length === 0) {
                            this.attachedDocuments = undefined;
                    }
                    //if (this.electronicAdministrativeServiceHeader.electronicServiceProviderBasicData) {
                    //    this.electronicAdministrativeServiceHeader.electronicServiceProviderBasicData.electronicServiceProviderType = this.electronicAdministrativeServiceHeader.electronicServiceProviderBasicData.electronicServiceProviderType.key;
                    //}
                    return Utils.toJSONForXML(this);
                };
            return {
                toJSON: toJSON,
                initServiceTermType: initServiceTermType
            }
        }();

        return PermanentAddressCertificateApplication;
    }
);