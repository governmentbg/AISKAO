define('regix/AddressesType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/AddressTypeBL'],
    function (ko, Utils,
        gp,
        Enums,
        AddressTypeBL) {

        var AddressesType = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Адреси';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.address = ko.observable(new AddressTypeBL());
        }

        AddressesType.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return AddressesType;

    });