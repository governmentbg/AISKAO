define('regix/ValidBulstatInfoType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/AddressesType',
    'regix/ManagersType'],
    function (ko, Utils,
        gp,
        Enums,
        AddressesType,
        ManagersType) {

        var ValidBulstatInfoType = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.fullName = ko.observable();
            this.fullName.title = 'Пълно наименование';

            this.address = ko.observable(new AddressesType());
            this.address.title = "Седалище / адрес на управление";

            this.managers = ko.observable(new ManagersType());
            this.managers.title = "Управляващ(и)";

        }

        ValidBulstatInfoType.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ValidBulstatInfoType;

    });