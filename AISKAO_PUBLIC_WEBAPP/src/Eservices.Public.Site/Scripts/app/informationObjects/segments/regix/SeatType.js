define('regix/SeatType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/AddressTypeTR',
    'regix/ContactsType'],
    function (ko, Utils,
        gp,
        Enums,
        AddressTypeTR,
        ContactsType) {

        var SeatType = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.address = ko.observable(new AddressTypeTR());
            this.contacts = ko.observable(new ContactsType());
        }

        SeatType.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return SeatType;

    });