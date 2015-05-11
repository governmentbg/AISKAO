define('babh/FoodObjectRealAddress',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'common/PersonAddress'],
    function (ko, Utils,
        gp,
        Enums,
        PersonAddress) {

        var FoodObjectRealAddress = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Адрес на животновъден обект';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1266';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.farmObjectRealAddress = ko.observable(new PersonAddress());
        }

        FoodObjectRealAddress.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return FoodObjectRealAddress;

    });