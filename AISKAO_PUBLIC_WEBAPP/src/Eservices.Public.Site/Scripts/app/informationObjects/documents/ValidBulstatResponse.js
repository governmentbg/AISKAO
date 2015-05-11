define('documents/ValidBulstatResponse',
    ['ko', 'Utils', 'regix/ValidBulstatResponse'],
    function (ko, Utils, ValidBulstatResponse) {

        var ValidBulstatResponseDocument = function () {
            this.segment = ko.observable(new ValidBulstatResponse());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT/ValidBulstatResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'ValidBulstatResponse'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        ValidBulstatResponseDocument.prototype = function () {
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

        return ValidBulstatResponseDocument;

    }
);