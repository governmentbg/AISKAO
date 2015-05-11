define('common/ReceiptNotAcknowledgedMessage',
    ['ko', 'Utils',
    'common/DocumentURI',
    'common/Discrepancies',
    'common/ElectronicServiceProviderBasicData',
    'common/ElectronicServiceApplicant',
    'common/RegisterObjectURI',
    'GlobalParameters',
    'Enums',
    'common/XMLDigitalSignature'],
    function (ko, Utils,
        DocumentURI,
        Discrepancies,
        ElectronicServiceProviderBasicData,
        ElectronicServiceApplicant,
        RegisterObjectURI,
        gp,
        Enums,
        XMLDigitalSignature) {

        var ReceiptNotAcknowledgedMessage = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Съобщение, че получаването не се потвърждава';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000017';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlDigitalSignature: 'Signature'
            };


            this.messageURI = ko.observable(new DocumentURI());
            this.messageURI.title = 'УРИ на регистриран документ в официален документен регистър';
            this.messageURI.extend({
                fieldIsRequired: {
                    field: this.messageURI,
                    sectionTitle: this._settings.sectionTitle
                }
            });


            this.electronicServiceProvider = ko.observable(new ElectronicServiceProviderBasicData());
            this.electronicServiceProvider.title = 'Вид на доставчик на електронни административни услуги';
            this.electronicServiceProvider.extend({
                fieldIsRequired: {
                    field: this.electronicServiceProvider,
                    sectionTitle: this._settings.sectionTitle
                }
            });


            this.transportType = ko.observable();
            this.transportType.transportTypes = ko.observableArray(Enums.transportTypes);
            this.transportType.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.transportType.subscribe(this.initTransportType, this);
            };
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


            this.discrepancies = ko.observable(new Discrepancies());
            this.discrepancies.nomDiscrepancies = ko.observableArray(Enums.discrepanciesTypes);
            this.discrepancies.displayValue = ko.observableArray();
            if (gp.isLoadingDocument === true) {
                this.discrepancies.subscribe(this.initDiscrepancies, this);
            };


            this.applicant = ko.observable(new ElectronicServiceApplicant());
            this.applicant.title = 'Заявител на електронна административна услуга';
            this.applicant.extend({
                fieldIsRequired: {
                    field: this.applicant,
                    sectionTitle: this._settings.sectionTitle
                }
            });


            this.documentTypeURI = ko.observable(new RegisterObjectURI());
            this.documentTypeURI.title = 'УРИ на документ, вписан в регистъра на информационните обекти';
            this.documentTypeURI.extend({
                fieldIsRequired: {
                    field: this.documentTypeURI,
                    sectionTitle: this._settings.sectionTitle
                }
            });


            this.documentTypeName = ko.observable();
            this.documentTypeName.title = 'Наименование на документ, вписан в регистъра на информационните обекти';


            this.messageCreationTime = ko.observable();

            this.xmlDigitalSignature = ko.observable(new XMLDigitalSignature());
            this.xmlDigitalSignature.title = 'Данни за електронен подпис на XML документ по XADES стандарта';
            this.xmlDigitalSignature.extend({
                fieldIsRequired: {
                    field: this.xmlDigitalSignature,
                    sectionTitle: this._settings.sectionTitle
                }
            });
        }

        ReceiptNotAcknowledgedMessage.prototype = function () {

            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
                },
            initDiscrepancies = function () {
                if (gp.isLoadingDocument === true) {
                    var discrepanciesCode = this.discrepancies();
                    if (discrepanciesCode) {
                        this.discrepancies.displayValue(ko.utils.arrayFirst(this.discrepancies.nomDiscrepancies(), function (item) {
                            if (item.key === discrepanciesCode) {
                                return item;
                                }
                            }));
                        }
                    }
                },
           
               initTransportType = function () {
                   if (gp.isLoadingDocument === true) {
                      var transportTypeCode = this.transportType();
                        if (transportTypeCode) {
                            this.transportType.displayValue(ko.utils.arrayFirst(this.transportType.transportTypes(), function (item) {
                                if (item.key === transportTypeCode) {
                                    return item;
                                }
                            }));
                        }
                    }
                };

            return {
                toJSON: toJSON,
                initDiscrepancies: initDiscrepancies,
                initTransportType: initTransportType
            }
        }();

        return ReceiptNotAcknowledgedMessage;

    });
