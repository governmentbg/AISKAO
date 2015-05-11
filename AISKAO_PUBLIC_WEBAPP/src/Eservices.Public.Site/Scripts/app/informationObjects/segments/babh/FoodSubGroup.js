define('babh/FoodSubGroup',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    //'babh/FoodSubItem',
    'babh/FoodItems'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        FoodItems) {

        var FoodSubGroup = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.foodSubGroupCode = ko.observable();
            this.foodSubGroupCode.foodGroupCode = ko.observable();
            this.foodSubGroupCode.title = "Код на подгрупа храни";
            this.foodSubGroupCode.nomFoodSubGroups = ko.observableArray();

            this.foodSubGroupCode.subscribe(this.changeFoodSubGroup, this);
            if (gp.isLoadingDocument === true) {
                this.foodSubGroupCode.foodGroupCode.subscribe(this.initFoodSubGroups, this);
            }
            this.foodSubGroupName = ko.observable();
            this.foodSubGroupName.title = "Наименование на подгрупа храни";
            this.foodSubGroupName.nomFoodSubGroups = ko.observableArray();

            this.foodItems = ko.observable(new FoodItems());
        }

        FoodSubGroup.prototype = function () {
            var initFoodSubGroups = function () {
                if (gp.isLoadingDocument === true) {
                    var self = this,
                        dCode = self.foodSubGroupCode();
                    var grCode = this.foodSubGroupCode.foodGroupCode();
                    this.foodItems().foodItem.foodSubGroupCode(dCode);
                    if (grCode) {
                        this.foodItems().foodItem.foodSubGroupCode.foodGroupCode(grCode);
                    }
                }
            },
            changeFoodSubGroup = function (newValue) {
                if (gp.isLoadingDocument === false) {
                    var self = this;
                    if (newValue) {
                        this.foodSubGroupCode(newValue);
                        var grCode = this.foodSubGroupCode.foodGroupCode();
                        this.foodItems().foodItem.foodSubGroupCode(newValue);
                        if (grCode) {
                            this.foodItems().foodItem.foodSubGroupCode.foodGroupCode(grCode);
                        }
                    }
                }
            },
            toJSON = function () {
                if (this.foodItems !== undefined &&
                   (this.foodItems.foodItem == undefined ||
                   this.foodItems.foodItem.length == 0)) {
                    this.foodItems = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initFoodSubGroups: initFoodSubGroups,
                changeFoodSubGroup: changeFoodSubGroup,
                toJSON: toJSON
            }
        }();

        return FoodSubGroup;

    });