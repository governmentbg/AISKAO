define('documents/MotorVehicleRegistrationRequest',
    ['ko', 'Utils', 'regix/MotorVehicleRegistrationRequest'],
    function (ko, Utils, MotorVehicleRegistrationRequest) {

        var MotorVehicleRegistrationRequestDocument = function () {
            this.segment = ko.observable(new MotorVehicleRegistrationRequest());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/MPS/MotorVehicleRegistrationRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'MotorVehicleRegistrationRequest'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        MotorVehicleRegistrationRequestDocument.prototype = function () {
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

        return MotorVehicleRegistrationRequestDocument;

    }
);