define('babh/FoodSubGroups',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'babh/FoodSubGroup'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        FoodSubGroup) {

        var FoodSubGroups = function () {
            this.foodSubGroup = ko.observableArray([]);
            this.foodSubGroup.foodGroupCode = ko.observable();
            this.foodSubGroup.foodSubGroupList = ko.observableArray([]);

            this.foodSubGroup.foodGroupCode.subscribe(function () {
                datacontext.getFoodSubGroups(this.foodSubGroup.foodGroupCode(), this.foodSubGroup.foodSubGroupList);
            }, this);

            this.foodSubGroup.nomFoodSubGroups = ko.computed(function () {
                var self = this,
                    newArr = [];
                ko.utils.arrayForEach(self.foodSubGroup.foodSubGroupList(), function (item) {
                    var newItem = {
                        code: item.code,
                        name: item.name
                    };
                    newItem.selectedFoodSubGroup = ko.observable();
                    ko.utils.arrayFirst(self.foodSubGroup(), function (checkedItem) {
                        if (newItem.code() == checkedItem.foodSubGroupCode()) {
                            checkedItem.foodSubGroupCode.foodGroupCode(self.foodSubGroup.foodGroupCode());
                            newItem.selectedFoodSubGroup(checkedItem);
                            return newItem;
                        }
                    });
                    newArr.push(newItem);
                });
                return newArr;
            }, this);
        }

        FoodSubGroups.prototype = function () {
            var createFoodSubGroup = function () {
                    return new FoodSubGroup();
                },
                changeFoodSubGroup = function (data, selectedItem) {
                    var selectedFoodSubGroup = ko.utils.arrayFirst(data.foodSubGroup(), function (item) {
                        return item.foodSubGroupCode() == selectedItem.code()
                    });
                    if (!selectedFoodSubGroup) {
                        selectedFoodSubGroup = new FoodSubGroup();
                        selectedFoodSubGroup.foodSubGroupCode.foodGroupCode(data.foodSubGroup.foodGroupCode());
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
             getFoodSubGroupName = function (data) {
                 var foodSubGroupName = ko.utils.arrayFirst(foodSubGroup.nomFoodSubGroups, function (item) {
                     if (item.code == data) {
                         return item;
                     }
                 });
                 return foodSubGroupName.name;
             },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                createFoodSubGroup: createFoodSubGroup,
                changeFoodSubGroup: changeFoodSubGroup,
                getFoodSubGroupName: getFoodSubGroupName,
                toJSON: toJSON
            }
        }();

        return FoodSubGroups;

    });