define('documents/ValidPersonRequest',
    ['ko', 'Utils', 'regix/ValidPersonRequest'],
    function (ko, Utils, ValidPersonRequest) {

        var ValidPersonRequestDocument = function () {
            this.segment = ko.observable(new ValidPersonRequest());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://egov.bg/RegiX/GRAO/NBD/ValidPersonRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'ValidPersonRequest'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        ValidPersonRequestDocument.prototype = function () {
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

        return ValidPersonRequestDocument;

    }
);