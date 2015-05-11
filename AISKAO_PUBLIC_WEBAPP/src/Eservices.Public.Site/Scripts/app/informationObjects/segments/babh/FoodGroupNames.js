define('babh/FoodGroupNames',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext) {

        var FoodGroupNames = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            }

            this.foodGroupName = ko.observableArray();
            this.foodGroupName.nomFoodGroups = ko.observableArray();
            this.foodGroupName.selectedFoodGroups = ko.observable();
            //this.foodGroupName.isLoaded = ko.observable(false);
            this.foodGroupName.isLoading = ko.observable(false);
            this.foodGroupName.subscribe(this.initFoodGroups, this);
            var self = this;
            self.foodGroupName.isLoading(true);
            datacontext.getFoodGroups(this.foodGroupName.nomFoodGroups)
                       .then(function () {
                           //self.foodGroupNames.isLoaded(true);
                           self.foodGroupName.isLoading(false);
                       });
            this.foodGroupName.subscribtion = this.foodGroupName.selectedFoodGroups.subscribe(this.changeFoodGroups, this);
            this.foodGroupName.extend({
                fieldIsRequired: {
                    field: this.foodGroupName,
                    sectionTitle: this._settings.sectionTitle
                }
            });
        }

        FoodGroupNames.prototype = function () {
            var initFoodGroups = function () {
                if (gp.isLoadingDocument === true) {
                    var self = this;
                    self.foodGroupName.subscribtion.dispose();
                    var fCode = self.foodGroupName();
                    if (fCode) {
                        self.foodGroupName.isLoading(false);
                        datacontext.getFoodGroups(self.foodGroupName.nomFoodGroups)
                        .then(function () {
                            self.foodGroupName.isLoading(true);
                            self.foodGroupName.selectedFoodGroups(ko.utils.arrayFirst(self.foodGroupName.nomFoodGroups(), function (item) {
                                if (item.code && item.code() === fCode) {
                                    return item;
                                }
                            }));
                            self.foodGroupNames.selectedFoodGroups.subscribe(self.changeFoodGroups, self);
                        });
                    }
                }
            },
            changeFoodGroups = function (newValue) {
                if (gp.isLoadingDocument === false) {
                    if (newValue) {
                        this.foodGroupName(newValue.name);
                    }
                }
            },
             addFoodGroups = function (data) {
                 if (ko.utils.arrayIndexOf(this.foodGroupName(), data) < 0) {
                     this.foodGroupName.push(data.code());
                 }
             },
             removeFoodGroups = function (value) {
                 this.foodGroupName.remove(value);

             },
             getFoodGroupsName = function (data) {
                 var foodName = ko.utils.arrayFirst(this.foodGroupName.nomFoodGroups(), function (item) {
                         if (item.code() === data) {
                             return item;
                         }
                 });
                 return foodName.name;
             },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                initFoodGroups: initFoodGroups,
                changeFoodGroups: changeFoodGroups,
                addFoodGroups: addFoodGroups,
                removeFoodGroups: removeFoodGroups,
                getFoodGroupsName: getFoodGroupsName,
                toJSON: toJSON
            }
        }();

        return FoodGroupNames;

    });