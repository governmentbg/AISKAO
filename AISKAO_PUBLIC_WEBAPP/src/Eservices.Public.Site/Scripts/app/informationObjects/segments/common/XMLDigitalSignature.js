define('common/XMLDigitalSignature',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var XMLDigitalSignature = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за електронен подпис на XML документ по XADES стандарта';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000004';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };
            this._settings.isSigned = ko.observable(false);

            this.issuarName = ko.observable();
            this.issuarAddress = ko.observable();
            this.issuarIdentifier = ko.observable();
            this.issuarNationality = ko.observable();


            this.titularName = ko.observable();
            this.titularAddress = ko.observable();
            this.titularRegistration = ko.observable();
            this.authorQuality = ko.observable();

            this.authorName = ko.observable();
            this.authorAddress = ko.observable();
            //Дата и час на издаването <дата и час на издаването> (във формат ДД.ММ.ГГГГ, ЧЧ:ММ:СС)
            //Удостоверение за време <удостоверение за време> (във формат ДД.ММ.ГГГГ, ЧЧ:ММ:СС)

            this.validFrom = ko.observable();
            this.validTo = ko.observable();
           
            this.restriction = ko.observable();
            this.serialNumber = ko.observable();
        }

        XMLDigitalSignature.prototype = function () {
            var toJSON = function () {
                return '';
            };
            return {
                toJSON: toJSON
            }
        }();

        return XMLDigitalSignature;

    }
);