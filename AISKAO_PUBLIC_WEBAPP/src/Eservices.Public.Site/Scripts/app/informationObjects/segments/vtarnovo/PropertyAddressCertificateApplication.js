define('vtarnovo/PropertyAddressCertificateApplication',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'common/ElectronicAdministrativeServiceHeader',
    'common/ServiceApplicantReceiptData',
    'common/AttachedDocuments',
    'common/ElectronicAdministrativeServiceFooter'],
    function (ko, Utils,
        gp,
        Enums,
        ElectronicAdministrativeServiceHeader,
        ServiceApplicantReceiptData,
        AttachedDocuments,
        ElectronicAdministrativeServiceFooter) {

        var PropertyAddressCertificateApplication = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Заявление за издаване на удостоверение за административен адрес на поземлени имоти';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1030';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            var headerData = {
                sunauServiceURI: '0011-000010',
                sunauServiceName: '"Издаване на удостоверение за административен адрес на поземлени имоти"',
                registerIndex: '10',
                batchNumber: '7',
                documentTypeName: '"Заявление за издаване на удостоверение за административен адрес на поземлени имоти"',
                providerEntityName: 'Община Велико Търново',
                providerEntityId: '000133634'
            };
            var localEHeader = new ElectronicAdministrativeServiceHeader();
            localEHeader.initElectronicServiceHeader(headerData);
            this.electronicAdministrativeServiceHeader = ko.observable(localEHeader);

            this.serviceTermType = ko.observable();
            this.serviceTermType.nomServiceTermTypes = ko.observableArray(Enums.serviceTermTypes);
            this.serviceTermType.displayValue = ko.observable();
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

            this.propertyDescription = ko.observable();
            this.propertyDescription.title = "Описание на поземлен имот";

            this.attachedDocuments = ko.observable(new AttachedDocuments());

            this.electronicAdministrativeServiceFooter = ko.observable(new ElectronicAdministrativeServiceFooter());
        }

        PropertyAddressCertificateApplication.prototype = function () {
            var initServiceTermType = function () {
                if (gp.isLoadingDocument === true) {
                    var serviceTermTypeCode = this.serviceTermType();
                    if (serviceTermTypeCode) {
                        this.serviceTermType.displayValue(ko.utils.arrayFirst(this.serviceTermType.nomServiceTermTypes(), function (item) {
                            if (item.key === serviceTermTypeCode) {
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
                toJSON: toJSON
            }
        }();

        return PropertyAddressCertificateApplication;

    });