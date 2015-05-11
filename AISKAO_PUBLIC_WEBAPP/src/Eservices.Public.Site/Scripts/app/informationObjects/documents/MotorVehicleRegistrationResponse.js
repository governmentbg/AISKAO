define('documents/MotorVehicleRegistrationResponse',
    ['ko', 'Utils', 'regix/MotorVehicleRegistrationResponse'],
    function (ko, Utils, MotorVehicleRegistrationResponse) {

        var MotorVehicleRegistrationResponseDocument = function () {
            this.segment = ko.observable(new MotorVehicleRegistrationResponse());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/MPS/MotorVehicleRegistrationResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'MotorVehicleRegistrationResponse'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        MotorVehicleRegistrationResponseDocument.prototype = function () {
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

        return MotorVehicleRegistrationResponseDocument;

    }
);