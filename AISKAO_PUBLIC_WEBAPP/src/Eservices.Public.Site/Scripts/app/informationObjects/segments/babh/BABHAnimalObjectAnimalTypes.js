define('babh/BABHAnimalObjectAnimalTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/BABHAnimalObjectAnimalType'],
    function (ko, Utils,
        gp,
        Enums,
        BABHAnimalObjectAnimalType) {

        var BABHAnimalObjectAnimalTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    animalObjectAnimalType: 'BABHAnimalObjectAnimalType'
                }
            };

            this.animalObjectAnimalType = ko.observableArray([new BABHAnimalObjectAnimalType()]);
        }

        BABHAnimalObjectAnimalTypes.prototype = function () {
            var createBABHAnimalObjectAnimalType = function () {
                return new BABHAnimalObjectAnimalType();
            },
            addBABHAnimalObjectAnimalType = function (data) {
                this.animalObjectAnimalType.push(new BABHAnimalObjectAnimalType());
            },
            removeBABHAnimalObjectAnimalType = function (value) {
                if (this.animalObjectAnimalType().length > 1) {
                    this.animalObjectAnimalType.remove(value);
                }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createBABHAnimalObjectAnimalType: createBABHAnimalObjectAnimalType,
                addBABHAnimalObjectAnimalType: addBABHAnimalObjectAnimalType,
                removeBABHAnimalObjectAnimalType: removeBABHAnimalObjectAnimalType,
                toJSON: toJSON
            }
        }();

        return BABHAnimalObjectAnimalTypes;

    });