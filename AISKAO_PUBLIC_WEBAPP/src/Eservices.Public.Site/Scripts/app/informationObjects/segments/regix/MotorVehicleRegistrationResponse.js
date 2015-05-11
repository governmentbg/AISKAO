define('regix/MotorVehicleRegistrationResponse',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/ReturnInformation',
    'regix/Vehicles'],
    function (ko, Utils,
        gp,
        Enums,
        ReturnInformation,
        Vehicles) {

        var MotorVehicleRegistrationResponse = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Справка на данни от свидетелство за регистрация на МПС';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/MPS/MotorVehicleRegistrationResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.returnInformation = ko.observable(new ReturnInformation());
            this.returnInformation.title = 'Статус';

            this.vehicles = ko.observable(new Vehicles());
            this.vehicles.title = "Справка за валидност на БУЛСТАТ ЕИК номер";
        }

        MotorVehicleRegistrationResponse.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return MotorVehicleRegistrationResponse;

    });