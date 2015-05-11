define('documents/IAMAWorkCompetencyCertificateProlongationApplication',
    ['ko', 'Utils', 'iama/IAMAWorkCompetencyCertificateProlongationApplication'],
    function (ko, Utils, IAMAWorkCompetencyCertificateProlongationApplication) {

        var IAMAWorkCompetencyCertificateProlongationApplicationDocument = function () {
            this.segment = ko.observable(new IAMAWorkCompetencyCertificateProlongationApplication());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1037';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'IAMAWorkCompetencyCertificateProlongationApplication'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        IAMAWorkCompetencyCertificateProlongationApplicationDocument.prototype = function () {
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

        return IAMAWorkCompetencyCertificateProlongationApplicationDocument;

    }
);