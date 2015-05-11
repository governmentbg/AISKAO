define('regix/AddressTypeTR',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var AddressTypeTR = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Адрес';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.countryCode = ko.observable();
            this.countryCode.title = "Код на държава";

            this.country = ko.observable();
            this.country.title = "Име на държава";

            this.isForeign = ko.observable();

            this.districtEkatte = ko.observable();
            this.districtEkatte.title = "Код на област";

            this.district = ko.observable();
            this.district.title = "Име на област";

            this.municipalityEkatte = ko.observable();
            this.municipalityEkatte.title = "Код на община";

            this.municipality = ko.observable();
            this.municipality.title = "Име на община";

            this.settlementEKATTE = ko.observable();
            this.settlementEKATTE.title = "Код на населено място";

            this.settlement = ko.observable();
            this.settlement.title = "Населено място";

            this.area = ko.observable();

            this.areaEkatte = ko.observable();

            this.postCode = ko.observable();
            this.postCode.title = "Пощенски код";

            this.foreignPlace = ko.observable();

            this.housingEstate = ko.observable();

            this.street = ko.observable();
            this.street.title = "Улица/ж.к.";

            this.streetNumber = ko.observable();

            this.block = ko.observable();

            this.entrance = ko.observable();
            this.entrance.title = "Вход";

            this.floor = ko.observable();

            this.apartment = ko.observable();
            this.apartment.title = "Апартамент";

        }

        AddressTypeTR.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return AddressTypeTR;

    });