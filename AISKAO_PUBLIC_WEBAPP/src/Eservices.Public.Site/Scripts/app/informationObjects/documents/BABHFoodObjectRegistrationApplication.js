define('documents/BABHFoodObjectRegistrationApplication',
    ['ko', 'Utils', 'babh/BABHFoodObjectRegistrationApplication'],
    function (ko, Utils, BABHFoodObjectRegistrationApplication) {

        var BABHFoodObjectRegistrationApplicationDocument = function () {
            this.segment = ko.observable(new BABHFoodObjectRegistrationApplication());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1063';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'BABHFoodObjectRegistrationApplication'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        BABHFoodObjectRegistrationApplicationDocument.prototype = function () {
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

        return BABHFoodObjectRegistrationApplicationDocument;

    }
);