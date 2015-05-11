define('babh/PlantObjectRealAddress',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'common/EKATTEAddress'],
    function (ko, Utils,
        gp,
        Enums,
        EKATTEAddress) {

        var PlantObjectRealAddress = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Адрес на обект за растителна защита';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1095';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.plantObjectRealAddress = ko.observable(new EKATTEAddress());
        }

        PlantObjectRealAddress.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return PlantObjectRealAddress;

    });