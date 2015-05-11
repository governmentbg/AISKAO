define('regix/MotorVehicleRegistrationRequest',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var MotorVehicleRegistrationRequest = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Входни данни за справка от свидетелство за регистрация на МПС';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/MPS/MotorVehicleRegistrationRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns      
            };

            this.identifier = ko.observable();
            this.identifier.title = "Регистрационен номер (без разделители)";

        }

        MotorVehicleRegistrationRequest.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return MotorVehicleRegistrationRequest;

    });