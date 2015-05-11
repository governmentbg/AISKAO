define('babh/FoodItems',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'babh/FoodItem'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        FoodItem) {

        var FoodItems = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.foodItem = ko.observableArray([]);
            this.foodItem.foodPurpose = ko.observable();
            this.foodItem.foodLists = ko.observableArray([]);
            this.foodItem.nomFoodItems = ko.observableArray([]);

            this.foodItem.foodPurpose.subscribe(function () {
                datacontext.getFoodItemsPerPurpose(this.foodItem.foodPurpose(), this.foodItem.foodLists);
            }, this);

            
            this.foodItem.foodGroupCode = ko.observable();
            this.foodItem.foodGroupCode.subscribe(function () {
                datacontext.getFoodItemsByFoodGroup(this.foodItem.foodGroupCode(), this.foodItem.foodLists);
            }, this);

            this.foodItem.foodSubGroupCode = ko.observable();
            this.foodItem.foodSubGroupCode.foodGroupCode = ko.observable();
            this.foodItem.foodSubGroupCode.foodGroupCode.subscribe(function (data) {
                datacontext.getFoodItems(this.foodItem.foodSubGroupCode(), this.foodItem.foodSubGroupCode.foodGroupCode(), this.foodItem.foodLists);
            }, this);

            this.foodItem.nomFoodItems = ko.computed(function () {
                var self = this,
                    newArr = [];
                ko.utils.arrayForEach(self.foodItem.foodLists(), function (item) {
                    var newItem = {
                        name: item.name,
                        canAddFreeText: item.canAddFreeText
                    };
                    newItem.selectedFoodItem = ko.observable();
                    ko.utils.arrayFirst(self.foodItem(), function (checkedItem) {
                        if (newItem.name() == checkedItem.foodItemName()) {
                            newItem.selectedFoodItem(checkedItem);
                            return newItem;
                        }
                    });
                    newArr.push(newItem);
                });
                return newArr;
            }, this);
        }

        FoodItems.prototype = function () {
            var createFoodItem = function () {
                return new FoodItem();
            },
                changeFoodItem = function (data, selectedItem) {
                var selectedFoodItem = ko.utils.arrayFirst(data.foodItem(), function (item) {
                    return item.foodItemName() == selectedItem.name()
                });
                if (!selectedFoodItem) {
                    selectedFoodItem = new FoodItem();
                    selectedFoodItem.foodItemName(selectedItem.name());
                    if (selectedItem.canAddFreeText() == true) {
                        selectedFoodItem.foodItemDescription(' ');
                    }
                    data.foodItem.push(selectedFoodItem);
                    selectedItem.selectedFoodItem(selectedFoodItem);
                } else {
                    ko.utils.arrayRemoveItem(data.foodItem(), selectedFoodItem);
                    selectedItem.selectedFoodItem(undefined);
                }
                return true;
            },
            toJSON = function () {
                if (this.foodItem !== undefined &&
                   this.foodItem.length == 0) {
                    this.foodItem = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createFoodItem: createFoodItem,
                changeFoodItem: changeFoodItem,
                toJSON: toJSON
            }
        }();

        return FoodItems;

    });