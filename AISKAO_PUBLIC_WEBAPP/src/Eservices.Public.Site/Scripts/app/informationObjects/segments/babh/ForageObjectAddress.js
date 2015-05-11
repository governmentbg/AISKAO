define('babh/ForageObjectAddress',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'common/EKATTEAddress'],
    function (ko, Utils,
        gp,
        Enums,
        EKATTEAddress) {

        var ForageObjectAddress = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Адрес на обект на оператор във фуражния сектор';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1110';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageObjectAddress = ko.observable(new EKATTEAddress());
        }

        ForageObjectAddress.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageObjectAddress;

    });