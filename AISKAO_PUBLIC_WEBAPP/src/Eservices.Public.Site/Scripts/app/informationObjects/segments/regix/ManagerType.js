define('regix/ManagerType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/PersonType'],
    function (ko, Utils,
        gp,
        Enums,
        PersonType) {

        var ManagerType = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.personInfo = ko.observable(new PersonType());

            this.role = ko.observable();
            this.role.title = "Роля";

            this.position = ko.observable();
            this.position.title = "Длъжност";

        }

        ManagerType.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ManagerType;

    });