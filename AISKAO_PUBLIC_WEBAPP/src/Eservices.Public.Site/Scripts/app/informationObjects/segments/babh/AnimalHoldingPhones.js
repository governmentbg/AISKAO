define('babh/AnimalHoldingPhones',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var AnimalHoldingPhones = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            // this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.animalHoldingPhone = ko.observableArray();
            this.animalHoldingPhone.itemToAdd = ko.observable();
        }

        AnimalHoldingPhones.prototype = function () {
            var addAnimalHoldingPhone = function () {
                if (this.animalHoldingPhone.itemToAdd() != undefined && this.animalHoldingPhone.itemToAdd() != "" && ko.utils.arrayIndexOf(this.animalHoldingPhone(), this.animalHoldingPhone.itemToAdd()) < 0) {
                    // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                    this.animalHoldingPhone.push(this.animalHoldingPhone.itemToAdd());
                    // Clears the text box, because it's bound to the "itemToAdd" observable
                    this.animalHoldingPhone.itemToAdd("");
                }
            },
            removeAnimalHoldingPhone = function (value) {
                this.animalHoldingPhone.remove(value);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                addAnimalHoldingPhone: addAnimalHoldingPhone,
                removeAnimalHoldingPhone: removeAnimalHoldingPhone,
                toJSON: toJSON
            }
        }();

        return AnimalHoldingPhones;

    });