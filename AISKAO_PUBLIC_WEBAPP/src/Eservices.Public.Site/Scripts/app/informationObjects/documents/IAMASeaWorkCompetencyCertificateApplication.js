define('documents/IAMASeaWorkCompetencyCertificateApplication',
    ['ko', 'Utils', 'iama/IAMASeaWorkCompetencyCertificateApplication'],
    function (ko, Utils, IAMASeaWorkCompetencyCertificateApplication) {

        var IAMASeaWorkCompetencyCertificateApplicationDocument = function () {
            this.segment = ko.observable(new IAMASeaWorkCompetencyCertificateApplication());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1033';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'IAMASeaWorkCompetencyCertificateApplication'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        IAMASeaWorkCompetencyCertificateApplicationDocument.prototype = function () {
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

        return IAMASeaWorkCompetencyCertificateApplicationDocument;

    }
);