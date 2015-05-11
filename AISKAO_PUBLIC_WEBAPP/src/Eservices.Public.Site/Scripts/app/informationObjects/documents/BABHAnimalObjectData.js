define('documents/BABHAnimalObjectData',
    ['ko', 'Utils', 'babh/BABHAnimalObjectData'],
    function (ko, Utils, BABHAnimalObjectData) {

        var BABHAnimalObjectDataDocument = function () {
            this.segment = ko.observable(new BABHAnimalObjectData());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1420';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'BABHAnimalObjectData'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        BABHAnimalObjectDataDocument.prototype = function () {
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

        return BABHAnimalObjectDataDocument;

    }
);