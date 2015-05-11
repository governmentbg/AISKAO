define('common/ReceiptAcknowledgedMessage',
    ['ko', 'Utils',
    'common/ElectronicServiceProviderBasicData',
    'common/DocumentURI',
    'common/ElectronicServiceApplicant',
    'common/RegisterObjectURI',
    'GlobalParameters',
    'Enums',
    'common/RegisteredBy',
    'common/XMLDigitalSignature'],
function (ko, Utils,
    ElectronicServiceProviderBasicData,
    DocumentURI,
    ElectronicServiceApplicant,
    RegisterObjectURI,
    gp,
    Enums,
    RegisteredBy,
    XMLDigitalSignature) {

    var ReceiptAcknowledgedMessage = function () {
        this._settings = {};
        this._settings.sectionTitle = 'Потвърждаване за получаване';
        this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000019';
        this._settings.options = {
            xmlns: this._settings.xmlns,
            xmlDigitalSignature: 'Signature'
        };

        this.electronicServiceProvider = ko.observable(new ElectronicServiceProviderBasicData());
        this.electronicServiceProvider.extend({
            fieldIsRequired: {
                field: this.electronicServiceProvider,
                sectionTitle: this._settings.sectionTitle
            }
        });


        this.transportType = ko.observable();
        this.transportType.nomTransportTypes = ko.observableArray(Enums.transportTypes);
        this.transportType.displayValue = ko.observable();
        if (gp.isLoadingDocument === true) {
            this.transportType.subscribe(this.initTransportType, this);
        }
        this.transportType.title = 'Вид на пренос по електронен път';
        this.transportType.extend({
            fieldIsRequired: {
                field: this.transportType,
                sectionTitle: this._settings.sectionTitle
            },
            fieldIsFromEnum: {
                field: this.transportType,
                nomenclatureTitle: 'Номенклатура на видовете пренос по електронен път',
                nomenclatureValues: Enums.transportTypes
            }
        });


        this.documentURI = ko.observable(new DocumentURI());
        this.documentURI.extend({
            fieldIsRequired: {
                field: this.documentURI,
                sectionTitle: this._settings.sectionTitle
            }
        });

        this.receiptTime = ko.observable();
        this.receiptTime.extend({
            fieldIsDate: {
                field: this.receiptTime
            }
        });

        this.registeredBy = ko.observable(new RegisteredBy());

        this.caseAccessIdentifier = ko.observable();
        this.caseAccessIdentifier.title = 'Информация за достъп до получения документ';
        this.caseAccessIdentifier.extend({
            fieldIsRequired: {
                field: this.caseAccessIdentifier,
                sectionTitle: this._settings.sectionTitle
            }
        });

        this.applicant = ko.observable(new ElectronicServiceApplicant());
        this.applicant.extend({
            fieldIsRequired: {
                field: this.applicant,
                sectionTitle: this._settings.sectionTitle
            }
        });

        this.documentTypeURI = ko.observable(new RegisterObjectURI());

        this.documentTypeName = ko.observable();
        this.documentTypeName.title = 'Наименование на документ, вписан в регистъра на информационните обекти';
        
        this.xmlDigitalSignature = ko.observable(new XMLDigitalSignature());
        this.xmlDigitalSignature.title = 'Данни за електронен подпис на XML документ по XADES стандарта';
        this.xmlDigitalSignature.extend({
            fieldIsRequired: {
                field: this.xmlDigitalSignature,
                sectionTitle: this._settings.sectionTitle
            }
        });
    }

  
    ReceiptAcknowledgedMessage.prototype = function () {

        var initTransportType = function () {
            if (gp.isLoadingDocument === true) {
                var transportTypeCode = this.transportType();
                if (transportTypeCode) {
                    this.transportType.displayValue(ko.utils.arrayFirst(this.transportType.nomTransportTypes(), function (item) {
                        if (item.key === transportTypeCode) {
                            return item;
                        }
                    }));
                }
            }
        },

        toJSON = function () {
            return Utils.toJSONForXML(this, this._settings.options);
        };
        return {
            toJSON: toJSON,
            initTransportType: initTransportType
        }
    }();

    return ReceiptAcknowledgedMessage;

});