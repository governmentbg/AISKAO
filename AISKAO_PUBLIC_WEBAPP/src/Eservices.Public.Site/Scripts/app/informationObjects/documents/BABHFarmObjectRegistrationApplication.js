define('documents/BABHFarmObjectRegistrationApplication',
    ['ko', 'Utils', 'babh/BABHFarmObjectRegistrationApplication'],
    function (ko, Utils, BABHFarmObjectRegistrationApplication) {

        var BABHFarmObjectRegistrationApplicationDocument = function () {
            this.segment = ko.observable(new BABHFarmObjectRegistrationApplication());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1424';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'BABHFarmObjectRegistrationApplication'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        BABHFarmObjectRegistrationApplicationDocument.prototype = function () {
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

        return BABHFarmObjectRegistrationApplicationDocument;

    }
);