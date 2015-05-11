define('documents/BABHFoodObjectRegistrationCertificate',
    ['ko', 'Utils', 'babh/BABHFoodObjectRegistrationCertificate'],
    function (ko, Utils, BABHFoodObjectRegistrationCertificate) {

        var BABHFoodObjectRegistrationCertificateDocument = function () {
            this.segment = ko.observable(new BABHFoodObjectRegistrationCertificate());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1077';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'BABHFoodObjectRegistrationCertificate'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        BABHFoodObjectRegistrationCertificateDocument.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            },
                fromJSON = function () {
                    return Utils.fromJSONToJS(this, this._settings.fromXML);
                };
            return {
                toJSON: toJSON,
                fromJSON: fromJSON
            }
        }();

        return BABHFoodObjectRegistrationCertificateDocument;

    }
);