define('babh/ForageForTransportationByFormMedical',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageFormTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageFormTypes) {

        var ForageForTransportationByFormMedical = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражи за транспортиране по форма - медикаментозни фуражи';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1337';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageFormTypes = ko.observable(new ForageFormTypes());
        }

        ForageForTransportationByFormMedical.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageForTransportationByFormMedical;

    });