define('babh/FoodItem',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext) {

        var FoodItem = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.foodItemName = ko.observable();
            //this.foodGroupCode = ko.observable();
            this.foodItemName.foodGroupCode = ko.observable();
            this.foodItemName.title = "Наименование на хранa";
            this.foodItemName.nomFoodItems = ko.observableArray();

            this.foodItemDescription = ko.observable();
            this.foodItemDescription.title = "Друго описание на хранa";
        }

        FoodItem.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return FoodItem;

    });