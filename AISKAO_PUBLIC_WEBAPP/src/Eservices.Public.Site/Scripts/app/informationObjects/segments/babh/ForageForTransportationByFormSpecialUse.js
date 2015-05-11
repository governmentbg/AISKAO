define('babh/ForageForTransportationByFormSpecialUse',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageFormTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageFormTypes) {

        var ForageForTransportationByFormSpecialUse = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражи за транспортиране по форма - фуражи със специално предназначение';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1335';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageFormTypes = ko.observable(new ForageFormTypes());
        }

        ForageForTransportationByFormSpecialUse.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageForTransportationByFormSpecialUse;

    });