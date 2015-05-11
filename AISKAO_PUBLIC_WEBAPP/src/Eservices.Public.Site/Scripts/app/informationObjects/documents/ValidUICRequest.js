define('documents/ValidUICRequest',
    ['ko', 'Utils', 'regix/ValidUICRequest'],
    function (ko, Utils, ValidUICRequest) {

        var ValidUICRequestDocument = function () {
            this.segment = ko.observable(new ValidUICRequest());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR/ValidUICRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'ValidUICRequest'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        ValidUICRequestDocument.prototype = function () {
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

        return ValidUICRequestDocument;

    }
);