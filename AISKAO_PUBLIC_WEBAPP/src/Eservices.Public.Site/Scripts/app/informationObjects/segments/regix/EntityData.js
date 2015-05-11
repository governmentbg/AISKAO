define('regix/EntityData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var EntityData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за юридическо лице';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/MPS/MotorVehicleRegistrationResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.identifier = ko.observable();
            this.identifier.title = "ЕИК/БУЛСТАТ";

            this.name = ko.observable();
            this.name.title = "Фирмено име";

            this.nameLatin = ko.observable();
            this.nameLatin.title = "Фирмено име, изписано на латиница";

        }

        EntityData.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return EntityData;

    });