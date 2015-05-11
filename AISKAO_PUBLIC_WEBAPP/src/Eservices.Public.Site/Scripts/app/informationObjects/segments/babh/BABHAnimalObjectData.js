define('babh/BABHAnimalObjectData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/BABHAnimalObjectGeneralData',
    'babh/BABHAnimalObjectAnimalTypes'],
    function (ko, Utils,
        gp,
        Enums,
        BABHAnimalObjectGeneralData,
        BABHAnimalObjectAnimalTypes) {

        var BABHAnimalObjectData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Характеристика на животновъден обект';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1420';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    animalObjectGeneralData: 'BABHAnimalObjectGeneralData',
                    animalObjectAnimalTypes: 'BABHAnimalObjectAnimalTypes'
                }
            };

            this.animalObjectGeneralData = ko.observable(new BABHAnimalObjectGeneralData());
            this.animalObjectGeneralData.title = "Данни за предназначение на животновъден обект";

            this.animalObjectAnimalTypes = ko.observable(new BABHAnimalObjectAnimalTypes());
        }

        BABHAnimalObjectData.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
         return {
                toJSON: toJSON
            }
        }();

        return BABHAnimalObjectData;

    });