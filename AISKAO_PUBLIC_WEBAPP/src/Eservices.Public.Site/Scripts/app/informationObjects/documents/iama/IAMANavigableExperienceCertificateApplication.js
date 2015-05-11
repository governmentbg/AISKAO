define('documents/iama/IAMANavigableExperienceCertificateApplication',
    ['ko', 'Utils', 'iama/IAMANavigableExperienceCertificateApplication'],
    function (ko, Utils, IAMANavigableExperienceCertificateApplication) {

        var IAMANavigableExperienceCertificateApplicationDocument = function () {
            this.segment = ko.observable(new IAMANavigableExperienceCertificateApplication());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1029';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'IAMANavigableExperienceCertificateApplication'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        IAMANavigableExperienceCertificateApplicationDocument.prototype = function () {
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

        return IAMANavigableExperienceCertificateApplicationDocument;

    }
);