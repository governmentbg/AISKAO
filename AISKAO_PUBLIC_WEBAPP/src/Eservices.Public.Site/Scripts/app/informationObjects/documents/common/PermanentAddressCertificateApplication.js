define('documents/common/PermanentAddressCertificateApplication',
    ['ko', 'Utils', 'segments/PermanentAddressCertificateApplication'],
    function (ko, Utils, PermanentAddressCertificateApplication) {

        var PermanentAddressCertificateApplicationDocument = function (area) {
            this.segment = ko.observable(new PermanentAddressCertificateApplication());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000146';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'PermanentAddressCertificateApplication'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        PermanentAddressCertificateApplicationDocument.prototype = function () {
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
        return PermanentAddressCertificateApplicationDocument;

    }
);