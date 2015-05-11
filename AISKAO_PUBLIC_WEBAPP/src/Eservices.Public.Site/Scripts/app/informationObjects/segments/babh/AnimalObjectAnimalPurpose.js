define('babh/AnimalObjectAnimalPurpose',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext) {

        var AnimalObjectAnimalPurpose = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за предназначение на животни в животновъден обект';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1390';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.animalPurposeCode = ko.observable();
            this.animalPurposeCode.title = "Код на предназначение на животните";
            this.animalPurposeCode.nomAnimalPurposes = ko.observableArray();
            this.animalPurposeCode.selectedAnimalPurpose = ko.observable();
            var self = this;
            this.animalPurposeCode.extend({
                fieldIsRequired: {
                    field: this.animalPurposeCode,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.animalPurposeName = ko.observable();
            this.animalPurposeName.nomAnimalPurposes = ko.observableArray();
            this.animalPurposeName.title = "Наименование на предназначение на животните";
            this.animalPurposeName.extend({
                fieldIsRequired: {
                    field: this.animalPurposeName,
                    sectionTitle: this._settings.sectionTitle
                }
            });
        }

        AnimalObjectAnimalPurpose.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
        return {
                toJSON: toJSON
            }
        }();

        return AnimalObjectAnimalPurpose;

    });