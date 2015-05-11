define('babh/FoodSubItem',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'babh/FoodItems'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        FoodItems) {

        var FoodSubItem = function () {

            this.foodItems = ko.observable(new FoodItems());
            this.foodItems.foodsItemList = ko.observableArray([]);
            this.foodItems.foodGroupCode = ko.observable();
            this.foodItems.foodSubGroupCode = ko.observable();
            this.foodItems.foodSubGroupCode.subscribtion = this.foodItems.foodSubGroupCode.subscribe(this.changeFoodItemsByFoodSubGroup, this);
            if (gp.isLoadingDocument === true) {
                this.foodItems.foodGroupCode.subscribe(this.initFoodItemsByFoodSubGroup, this);
            }
        };

        FoodSubItem.prototype = function () {
            var createFoodItems = function () {
                return new FoodItems();
            },
             initFoodItemsByFoodSubGroup = function () {
                 if (gp.isLoadingDocument === true) {
                     this.foodItems.foodSubGroupCode.subscribtion.dispose();
                     var self = this;
                     if (self.foodItems.foodSubGroupCode() && self.foodItems.foodGroupCode()) {
                         datacontext.getFoodItems(self.foodItems.foodSubGroupCode(), self.foodItems.foodGroupCode(), self.foodItems.foodsItemList)
                                 .then(function () {
                                     //self.foodItems(new FoodItems());
                                     self.foodItems().foodItem.nomFoodItems(ko.utils.arrayMap(self.foodItems.foodsItemList(), function (item) {
                                         item.selectedFoodItem = ko.observable();
                                         item.selectedFoodItem(ko.utils.arrayFirst(self.foodItems().foodItem(), function (checkedItem) {
                                             if (item.name() == checkedItem.foodItemName())
                                                 return checkedItem;
                                         }));
                                         return item;
                                     }));
                                 });
                     }
                     self.foodItems.foodSubGroupCode.subscribe(self.changeFoodItemsByFoodSubGroup, self);
                 }
             },
                changeFoodItemsByFoodSubGroup = function () {
                    if (gp.isLoadingDocument === false) {
                        var self = this;
                        if (this.foodItems.foodSubGroupCode() && self.foodItems.foodGroupCode()) {
                            datacontext.getFoodItems(self.foodItems.foodSubGroupCode(), self.foodItems.foodGroupCode(), self.foodItems.foodsItemList)
                                    .then(function () {
                                        //self.foodItems(new FoodItems());
                                        self.foodItems().foodItem.nomFoodItems(ko.utils.arrayMap(self.foodItems.foodsItemList(), function (item) {
                                            item.selectedFoodItem = ko.observable();
                                            return item;
                                        }));
                                    });
                        }
                    }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                initFoodItemsByFoodSubGroup: initFoodItemsByFoodSubGroup,
                createFoodItems: createFoodItems,
                changeFoodItemsByFoodSubGroup: changeFoodItemsByFoodSubGroup,
                toJSON: toJSON
            }
        }();

        return FoodSubItem;

    });