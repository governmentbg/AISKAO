define('regix/ManagersType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/ManagerType'],
    function (ko, Utils,
        gp,
        Enums,
        ManagerType) {

        var ManagersType = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Управляващи';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.manager = ko.observable(new ManagerType());
        }

        ManagersType.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ManagersType;

    });