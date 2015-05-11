define('babh/BABHAnimalObjectGeneralData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var BABHAnimalObjectGeneralData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за предназначение на животновъден обект';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1416';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.animalObjectAnimalTypes = ko.observable();
            this.animalObjectAnimalTypes.title = "Видове животни за отглеждане в животновъден обект";

            this.animalObjectCapacity = ko.observable();
            this.animalObjectCapacity.title = "Капацитет на животновъден обект";
        }

        BABHAnimalObjectGeneralData.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return BABHAnimalObjectGeneralData;

    });