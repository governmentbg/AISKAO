define('babh/Foods',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'babh/Food'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        Food) {

        var Foods = function () {

            this.food = ko.observableArray([]);
            //this.food.nomFood = ko.observableArray([]);
            this.food.foodsList = ko.observableArray([]);
            this.food.foodsLists = ko.observableArray([]);
            this.food.foodGroupCode = ko.observable();
            this.food.foodGroupCode.subscribtion = this.food.foodGroupCode.subscribe(this.changeFoodSubGroups, this);
            if (gp.isLoadingDocument === true) {
                this.food.foodGroupCode.subscribe(this.initFoodSubGroups, this);
            }
            //this.food.foodGroupCode.subscribe(this.initFoodSubGroups, this);
        }

        Foods.prototype = function () {
            var createFood = function () {
                return new Food();
            },

                initFoodSubGroups = function () {
                    if (gp.isLoadingDocument === true) {
                        this.food.foodGroupCode.subscribtion.dispose();
                        var self = this, 
                            grCode = this.food.foodGroupCode();
                        if (grCode) {

                            datacontext.getFoodSubGroups(self.food.foodGroupCode(), self.food.foodsList)
                                    .then(function () {
                                        for (var i in self.food()) {
                                            if (self.food()[i].foodSubGroup() != undefined && self.food()[i].foodSubGroup().length > 0) {
                                                //self.food()[i].foodSubGroup().foodSubGroupCode.foodGroupCode(grCode);
                                                self.food()[i].foodSubGroup.nomFoodSubGroups(ko.utils.arrayMap(self.food.foodsList(), function (item) {
                                                    item.selectedFoodSubGroup = ko.observable();
                                                    item.selectedFoodSubGroup(ko.utils.arrayFirst(self.food()[i].foodSubGroup(), function (checkedItem) {
                                                        if (item.code() === checkedItem.foodSubGroupCode()) {
                                                            checkedItem.foodSubItem().foodItems.foodGroupCode(grCode);
                                                            return checkedItem;
                                                        }
                                                    })); 
                                                    return item;
                                                }));
                                            }
                                        }
                                    });
                            datacontext.getFoodItemsByFoodGroup(self.food.foodGroupCode(), self.food.foodsLists)
                                        .then(function () {
                                            //null;
                                            //var newItem = new Food();
                                            for (var i in self.food()) {
                                                if (self.food()[i].foodItem() != undefined && self.food()[i].foodItem().length > 0) {

                                                    self.food()[i].foodItem.nomfoodItems(ko.utils.arrayMap(self.food.foodsLists(), function (item) {
                                                        item.selectedFoodItem = ko.observable();
                                                        item.selectedFoodItem(ko.utils.arrayFirst(self.food()[i].foodItem(), function (checkedItem) {
                                                            if (item.name() === checkedItem.foodItemName()) {
                                                                checkedItem.foodItemName.foodGroupCode(self.food.foodGroupCode());
                                                                return item;
                                                            }
                                                        }));
                                                        return item;
                                                    }));
                                                    //self.food.push(newItem);
                                                }
                                            }
                                        });
                        }
                            self.food.foodGroupCode.subscribe(self.changeFoodSubGroups, self);
                    }
                },

                changeFoodSubGroups = function () {
                    if (gp.isLoadingDocument === false) {
                        var self = this;
                        if (this.food.foodGroupCode()) {
                            datacontext.getFoodSubGroups(self.food.foodGroupCode(), self.food.foodsList)
                                    .then(function () {
                                        var newItem = new Food();
                                        newItem.foodSubGroup.nomFoodSubGroups(ko.utils.arrayMap(self.food.foodsList(), function (item) {
                                            item.selectedFoodSubGroup = ko.observable();
                                            return item;
                                        }));
                                        self.food.push(newItem);
                                    });
                            datacontext.getFoodItemsByFoodGroup(self.food.foodGroupCode(), self.food.foodsLists)
                                        .then(function () {
                                            //null;
                                            var newItem = new Food();
                                            newItem.foodItem.nomfoodItems(ko.utils.arrayMap(self.food.foodsLists(), function (item) {
                                                item.selectedFoodItem = ko.observable();
                                                return item;
                                            }));
                                            self.food().push(newItem);
                                        });
                        }
                    }
                },
            toJSON = function () {
                if (this.food !== undefined &&
                   this.food.length == 0) {
                    this.food = undefined;
                }
                for (var i in this.food) {
                    if (this.food[i] !== undefined &&
                       this.food[i].foodSubGroup !== undefined &&
                        this.food[i].foodItem !== undefined &&
                       this.food[i].foodSubGroup.length == 0 &&
                       this.food[i].foodItem.length == 0) {
                        ko.utils.arrayRemoveItem(this.food, this.food[i]);
                    }
                }
                return Utils.toJSONForXML(this);
            };
            return {
                initFoodSubGroups: initFoodSubGroups,
                createFood: createFood,
                changeFoodSubGroups: changeFoodSubGroups,
                toJSON: toJSON
            }
        }();

        return Foods;

    });