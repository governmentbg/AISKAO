define('documents/common/RegisteredErrorsInDocumentContentDocument',
    ['ko', 'Utils', 'common/RegisteredErrorsInDocumentContent'],
    function (ko, Utils, RegisteredErrorsInDocumentContent) {

        var RegisteredErrorsInDocumentContentDocument = function () {
            this.segment = new RegisteredErrorsInDocumentContent();

            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000146';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'RegisteredErrorsInDocumentContent'
                }
            };
        };

        RegisteredErrorsInDocumentContentDocument.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return RegisteredErrorsInDocumentContentDocument;

    }
);