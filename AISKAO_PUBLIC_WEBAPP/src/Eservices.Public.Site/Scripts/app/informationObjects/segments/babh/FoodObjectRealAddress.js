define('babh/FoodObjectRealAddress',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'common/EKATTEAddress'],
    function (ko, Utils,
        gp,
        Enums,
        EKATTEAddress) {

        var FoodObjectRealAddress = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Адрес на обект за производство и търговия с храни';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1023';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.foodObjectRealAddress = ko.observable(new EKATTEAddress());
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