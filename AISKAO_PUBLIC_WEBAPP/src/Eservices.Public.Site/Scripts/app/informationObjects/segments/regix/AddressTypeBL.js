define('regix/AddressTypeBL',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var AddressTypeBL = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Адрес';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    TVM: 'tvm',
                }
            };

            this.type = ko.observable();
            this.type.title = 'Вид адрес';

            this.countryCode = ko.observable();
            this.countryCode.title = "Код на държава";
            
            this.countryName = ko.observable();
            this.countryName.title = "Име на държава";

            this.districtCode = ko.observable();
            this.districtCode.title = "Код на област";

            this.districtName = ko.observable();
            this.districtName.title = "Име на област";

            this.municipalityCode = ko.observable();
            this.municipalityCode.title = "Код на община";

            this.municipalityName = ko.observable();
            this.municipalityName.title = "Име на община";

            this.settlementEkkate = ko.observable();
            this.settlementEkkate.title = "Код на населено място";

            this.settlementName = ko.observable();
            this.settlementName.title = "Населено място";

            this.regionCode = ko.observable();
            this.regionCode.title = "Код на район";

            this.regionName = ko.observable();
            this.regionName.title = "Име на район";

            this.tvm = ko.observable();
            this.tvm.title = "Гр./с.";

            this.street = ko.observable();
            this.street.title = "Улица/ж.к.";

            this.buildingNumber = ko.observable();
            this.buildingNumber.title = "Номер на сграда";

            this.streetNumber = ko.observable();
            this.streetNumber.title = "Номер";

            this.entrance = ko.observable();
            this.entrance.title = "Вход";

            this.floor = ko.observable();
            this.floor.title = "Етаж";

            this.apartment = ko.observable();
            this.apartment.title = "Апартамент";

            this.postCode = ko.observable();
            this.postCode.title = "Пощенски код";

            this.postBox = ko.observable();
            this.postBox.title = "Пощенска кутия";

        }

        AddressTypeBL.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return AddressTypeBL;

    });