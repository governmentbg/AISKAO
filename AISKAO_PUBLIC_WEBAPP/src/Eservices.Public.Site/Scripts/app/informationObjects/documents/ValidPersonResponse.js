define('documents/ValidPersonResponse',
    ['ko', 'Utils', 'regix/ValidPersonResponse'],
    function (ko, Utils, ValidPersonResponse) {

        var ValidPersonResponseDocument = function () {
            this.segment = ko.observable(new ValidPersonResponse());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://egov.bg/RegiX/GRAO/NBD/ValidPersonResponse"';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'ValidPersonResponse'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        ValidPersonResponseDocument.prototype = function () {
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

        return ValidPersonResponseDocument;

    }
);