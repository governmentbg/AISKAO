define('babh/BABHAnimalObjectDatas',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/BABHAnimalObjectData'],
    function (ko, Utils,
        gp,
        Enums,
        BABHAnimalObjectData) {

        var BABHAnimalObjectDatas = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    animalObjectData: 'BABHAnimalObjectData'
            }
            };


            this.animalObjectData = ko.observable(new BABHAnimalObjectData());
        }

        BABHAnimalObjectDatas.prototype = function () {
            var createBABHAnimalObjectData = function () {
                return new BABHAnimalObjectData();
            },
            addAnimalObjectData = function (data) {
                this.animalObjectData.push(new BABHAnimalObjectData());
            },
            removeAnimalObjectData = function (value) {
                if (this.animalObjectData().length > 1) {
                    this.animalObjectData.remove(value);
                }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createBABHAnimalObjectData: createBABHAnimalObjectData,
                addAnimalObjectData: addAnimalObjectData,
                removeAnimalObjectData: removeAnimalObjectData,
                toJSON: toJSON
            }
        }();

        return BABHAnimalObjectDatas;

    });