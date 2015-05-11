define('documents/IAMANavigableExperienceCertificateBG',
    ['ko', 'Utils', 'iama/IAMANavigableExperienceCertificateBG'],
    function (ko, Utils, IAMANavigableExperienceCertificateBG) {

        var IAMANavigableExperienceCertificateBGDocument = function () {
            this.segment = ko.observable(new IAMANavigableExperienceCertificateBG());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1119';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'IAMANavigableExperienceCertificateBG'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        IAMANavigableExperienceCertificateBGDocument.prototype = function () {
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

        return IAMANavigableExperienceCertificateBGDocument;

    }
);