define('babh/FoodGroups',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'babh/FoodGroup'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        FoodGroup) {

        var FoodGroups = function () {
            this.foodGroup = ko.observableArray([]);
            this.foodGroup.foodGroupsList = ko.observableArray([]);
            
            this.foodGroup.foodPurpose = ko.observable();
            this.foodGroup.foodPurpose.subscribe(function () {
                datacontext.getFoodGroups(this.foodGroup.foodPurpose(), this.foodGroup.foodGroupsList);
            }, this);

            this.foodGroup.nomFoodGroups = ko.computed(function () {
                var self = this,
                    newArr = [];
                ko.utils.arrayForEach(self.foodGroup.foodGroupsList(), function (item) {
                    var newItem = {
                        code: item.code,
                        shortName: item.shortName,
                        name: item.name
                    };
                    newItem.selectedFoodGroup = ko.observable();
                    ko.utils.arrayFirst(self.foodGroup(), function (checkedItem) {
                        if (newItem.code() == checkedItem.code()) {
                            newItem.selectedFoodGroup(checkedItem);
                            return newItem;
                        }
                    });
                    newArr.push(newItem);
                });
                return newArr;
            }, this);
        }

        FoodGroups.prototype = function () {
            var createFoodGroup = function () {
                return new FoodGroup();
            },
                changeFoodGroup = function (data, selectedItem) {
                var selectedFoodGroup = ko.utils.arrayFirst(data.foodGroup(), function (item) {
                    return item.code() == selectedItem.code()
                });
                if (!selectedFoodGroup) {
                    selectedFoodGroup  = new FoodGroup();
                    selectedFoodGroup.code(selectedItem.code());
                    selectedFoodGroup.name(selectedItem.name());
                    selectedFoodGroup.shortName(selectedItem.shortName());
                    data.foodGroup.push(selectedFoodGroup);
                    selectedItem.selectedFoodGroup(selectedFoodGroup);
                } else {
                    ko.utils.arrayRemoveItem(data.foodGroup(), selectedFoodGroup);
                    selectedItem.selectedFoodGroup(undefined);
                }
                return true;
            },
             getFoodGroupName = function (data) {
                 var foodGroupName = ko.utils.arrayFirst(foodGroup.nomFoodGroups, function (item) {
                     if (item.code == data) {
                         return item;
                     }
                 });
                 return foodGroupName.name;
             },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                createFoodGroup: createFoodGroup,
                changeFoodGroup: changeFoodGroup,
                getFoodGroupName: getFoodGroupName,
                toJSON: toJSON
            }
        }();

        return FoodGroups;

    });