define('common/RegisteredErrorInDocumentContent',
    ['ko', 'Utils', 'common/RegisterObjectURI'],
    function (ko, Utils, RegisterObjectURI) {

        var RegisteredErrorInDocumentContent = function () {
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000024';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.termURI = ko.observable(new RegisterObjectURI());                                                //segment
            this.errorDescription = ko.observable();
        }

        RegisteredErrorInDocumentContent.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return RegisteredErrorInDocumentContent;
    }
);