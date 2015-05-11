define('babh/Food',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'babh/FoodSubGroup',
    'babh/FoodItem'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        FoodSubGroup,
        FoodItem) {

        var Food = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.foodSubGroup = ko.observableArray([]);
            this.foodSubGroup.nomFoodSubGroups = ko.observableArray([]);

            this.foodItem = ko.observableArray([]);
            this.foodItem.nomfoodItems = ko.observableArray([]);
        }

        Food.prototype = function () {
            var createFoodSubGroup = function () {
                return new FoodSubGroup();
            },
            createFoodItem = function () {
                return new FoodItem();
            },
                changeFoodSubGroup = function (data, selectedItem) {
                var selectedFoodSubGroup = ko.utils.arrayFirst(data.foodSubGroup(), function (item) {
                    return item.foodSubGroupCode() == selectedItem.code()
                });
                if (!selectedFoodSubGroup) {
                    selectedFoodSubGroup = new FoodSubGroup();
                    //selectedFoodSubGroup.foodSubGroupCode.foodGroupCode(selectedItem.foodGroupCode());
                    selectedFoodSubGroup.foodSubItem().foodItems.foodGroupCode(selectedItem.foodGroupCode());
                    selectedFoodSubGroup.foodSubGroupCode(selectedItem.code());
                    selectedFoodSubGroup.foodSubGroupName(selectedItem.name());
                    data.foodSubGroup.push(selectedFoodSubGroup);
                    selectedItem.selectedFoodSubGroup(selectedFoodSubGroup);
                } else {
                    ko.utils.arrayRemoveItem(data.foodSubGroup(), selectedFoodSubGroup);
                    selectedItem.selectedFoodSubGroup(undefined);
                }
                return true;
            },
            changeFoodItem = function (data, selectedItem) {
                //var data = this;
                //var selectedItem = selectedNomItem.selectedFoodItem() ? selectedNomItem.selectedFoodItem() : selectedNomItem;
                var selectedFoodItem = ko.utils.arrayFirst(data.foodItem(), function (item) {
                    return item.foodItemName() == selectedItem.name();
                });
                if (!selectedFoodItem) {
                    selectedFoodItem = new FoodItem();
                    selectedFoodItem.foodItemName(selectedItem.name());
                    selectedFoodItem.foodItemName.foodGroupCode(selectedItem.foodGroupCode());
                    //selectedFoodItem.foodGroupCode(selectedItem.foodGroupCode());
                    //if (selectedItem.canAddFreeText() == "true") {
                    //    selectedFoodItem.foodItemDescription(' ');
                    //}
                    data.foodItem.push(selectedFoodItem);
                    selectedItem.selectedFoodItem(selectedFoodItem);
                } else {
                    ko.utils.arrayRemoveItem(data.foodItem(), selectedFoodItem);
                    selectedItem.selectedFoodItem(undefined);
                }
                return true;
            },
            toJSON = function () {
                if (this.foodSubGroup !== undefined &&
                   this.foodSubGroup.length == 0) {
                    this.foodSubGroup = undefined;
                }
                if (this.foodItem !== undefined &&
                   this.foodItem.length == 0) {
                    this.foodItem = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createFoodSubGroup: createFoodSubGroup,
                createFoodItem: createFoodItem,
                changeFoodSubGroup: changeFoodSubGroup,
                changeFoodItem: changeFoodItem,
                toJSON: toJSON
            }
        }();

        return Food;

    });
