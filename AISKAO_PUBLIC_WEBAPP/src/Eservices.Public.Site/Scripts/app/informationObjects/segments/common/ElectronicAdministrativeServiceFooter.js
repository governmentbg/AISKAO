define('common/ElectronicAdministrativeServiceFooter',
    ['ko', 'Utils', 'common/XMLDigitalSignature'],
    function (ko, Utils, XMLDigitalSignature) {

        var ElectronicAdministrativeServiceFooter = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за подписване на заявление за предоставяне на електронна административна услуга, подадено по електронен път';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000153';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    xmlDigitalSignature: 'XMLDigitalSignature'
                }
            };
            this._settings.isSigned = ko.observable(false);

            this.applicationSigningTime = ko.observable();
            this.applicationSigningTime.title = 'Време на подписване на заявление, подадено по електронен път';
            //this.applicationSigningTime.extend({
            //    fieldIsRequired: {
            //        field: this.applicationSigningTime,
            //        sectionTitle: this._settings.sectionTitle
            //    }
            //});
            this.xmlDigitalSignature = ko.observable();
            this.xmlDigitalSignature.title = 'Данни за електронен подпис на XML документ по XADES стандарта';
            //this.xmlDigitalSignature.extend({
            //    fieldIsRequired: {
            //        field: this.xmlDigitalSignature,
            //        sectionTitle: this._settings.sectionTitle
            //    }
            //});
        }

        ElectronicAdministrativeServiceFooter.prototype = function () {
            var toJSON = function () {
                    this.applicationSigningTime = new Date();
                    return Utils.toJSONForXML(this, this._settings.options);
            },                
            createXMLDigitalSignature = function () {
                return new XMLDigitalSignature();
            };
            return {
                createXMLDigitalSignature: createXMLDigitalSignature,
                toJSON: toJSON
            }
        }();

        return ElectronicAdministrativeServiceFooter;

    }
);