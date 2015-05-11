define('babh/AnimalHoldingAddressData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'common/EKATTEAddress',
    'babh/AnimalHoldingPhones'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        EKATTEAddress,
        AnimalHoldingPhones) {

        var AnimalHoldingAddressData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за местонахождение на животновъден обект';
            this._settings.sectionIsRequired = ko.observable(false);
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1372';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.EKATTEAddress = ko.observable(new EKATTEAddress());
            this.EKATTEAddress.title = "Данни за ЕКАТТЕ адрес";
            this.EKATTEAddress()._settings.sectionIsRequired(true);
            this.EKATTEAddress.extend({
                fieldIsRequired: {
                    field: this.EKATTEAddress,
                    sectionTitle: this._settings.sectionTitle
                }
            });


            this.animalHoldingAddressGPSCoordinateX = ko.observable();
            this.animalHoldingAddressGPSCoordinateX.title = "GPS координати на местонахождение на животновъден обект- X";

            this.animalHoldingAddressGPSCoordinateY = ko.observable();
            this.animalHoldingAddressGPSCoordinateY.tile = "GPS координати на местонахождение на животновъден обект - Y";

            this.animalHoldingPhones = ko.observable(new AnimalHoldingPhones());
            this.animalHoldingPhones.title = "Телефонен номер за контакт с животновъден обект";

            this.animalHoldingFax = ko.observable();
            this.animalHoldingFax.title = "Номер на факс за контакт в животновъден обект";

            this.animalHoldingEMail = ko.observable();
            this.animalHoldingEMail.title = "Адрес на електронна поща за контакт с животновъден обект";
            this.animalHoldingEMail.extend({ 
                fieldIsValidEmail: {
                    field: this.animalHoldingEMail
                }
            });
        }

        AnimalHoldingAddressData.prototype = function () {
            toJSON = function () {
                if (this.animalHoldingPhones != undefined &&
                   this.animalHoldingPhones.animalHoldingPhone != undefined &&
                   this.animalHoldingPhones.animalHoldingPhone.length === 0) {
                    this.animalHoldingPhones = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return AnimalHoldingAddressData;

    });