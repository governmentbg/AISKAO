define('babh/ForageForTransportationData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageForTransportationByFormData'],
    function (ko, Utils,
        gp,
        Enums,
        ForageForTransportationByFormData) {

        var ForageForTransportationData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражи за транспортиране';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1341';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageForTransportationByFormData = ko.observable(new ForageForTransportationByFormData());
        }

        ForageForTransportationData.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageForTransportationData;

    });