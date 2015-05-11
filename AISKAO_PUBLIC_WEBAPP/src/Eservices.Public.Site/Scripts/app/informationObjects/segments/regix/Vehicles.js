define('regix/Vehicles',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/Vehicle'],
    function (ko, Utils,
        gp,
        Enums,
        Vehicle) {

        var Vehicles = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за МПС-та';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/MPS/MotorVehicleRegistrationResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.vehicle = ko.observableArray([new Vehicle()]);
        }

        Vehicles.prototype = function () {
            var createVehicle = function () {
                return new Vehicle();
            },
            addVehicle = function (data) {
                this.vehicle.push(new Vehicle());
            },
            removeVehicle = function (value) {
                if (this.vehicle().length > 1) {
                    this.vehicle.remove(value);
                }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createVehicle: createVehicle,
                addVehicle: addVehicle,
                removeVehicle: removeVehicle,
                toJSON: toJSON
            }
        }();

        return Vehicles;

    });