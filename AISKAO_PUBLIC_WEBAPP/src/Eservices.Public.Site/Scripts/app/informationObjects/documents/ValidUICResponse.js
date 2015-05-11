define('documents/ValidUICResponse',
    ['ko', 'Utils', 'regix/ValidUICResponse'],
    function (ko, Utils, ValidUICResponse) {

        var ValidUICResponseDocument = function () {
            this.segment = ko.observable(new ValidUICResponse());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR/ValidUICResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'ValidUICResponse'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        ValidUICResponseDocument.prototype = function () {
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

        return ValidUICResponseDocument;

    }
);