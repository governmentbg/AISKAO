define('babh/ForageForTransportationByFormPlantOrigin',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageFormTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageFormTypes) {

        var ForageForTransportationByFormPlantOrigin = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражи за транспортиране по форма - фуражни суровини от растителен произход';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1303';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageFormTypes = ko.observable(new ForageFormTypes());
        }

        ForageForTransportationByFormPlantOrigin.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageForTransportationByFormPlantOrigin;

    });