define('babh/FoodGroupsList',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'babh/FoodGroups',
    'babh/FoodItems'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        FoodGroups,
        FoodItems) {

        var FoodGroupsList = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Списък на групите храни в обекта';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1057';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };
            this._settings.titleFirst = ko.observable();
            this._settings.titleSecond = ko.observable();

            this.foodGroups = ko.observable(new FoodGroups());
            this.foodGroups.foodPurpose = ko.observable();
            this.foodGroups.foodPurpose.subscribtion = this.foodGroups.foodPurpose.subscribe(this.changeFoodPurpose, this);
            //if (gp.isLoadingDocument === true) {
            //    this.foodGroups.foodPurpose.subscribe(this.initFoodGroups, this);
            //}

            this.foodItems = ko.observable(new FoodItems());
             
        }

        FoodGroupsList.prototype = function () {
            var changeFoodPurpose = function () {
                    var self = this;
                    var fPurpose = self.foodGroups.foodPurpose();
                    if (fPurpose) {
                        if (fPurpose == "R-1013") {
                            self._settings.titleFirst("I.	Храни, използвани като суровини за приготвяне на ястия или предлагани директно");
                            self._settings.titleSecond("II.	Видове храни, приготвяни в обекта");
                        }
                        if (fPurpose == "R-1014") {
                            self._settings.titleFirst("І. Храни, доставяни в обектите за търговия на дребно с храни и в заведенията за организирано хранене на територията на детски заведения и училища (съгласно групите храни )");
                            self._settings.titleSecond("ІІ. Видове храни, приготвяни в заведенията за организирано хранене на територията на детски заведения и училища.");
                        }
                        self.foodGroups().foodGroup.foodPurpose(fPurpose);
                        self.foodItems().foodItem.foodPurpose(fPurpose);
                    }
            },
            toJSON = function () {
                if (this.foodGroups !== undefined &&
                    (this.foodGroups.foodGroup == undefined ||
                    this.foodGroups.foodGroup.length == 0)) {
                    this.foodGroups = undefined;
                }
                if (this.foodItems !== undefined &&
                   (this.foodItems.foodItem == undefined ||
                   this.foodItems.foodItem.length == 0)) {
                    this.foodItems = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                changeFoodPurpose: changeFoodPurpose,
                toJSON: toJSON
            }
        }();

        return FoodGroupsList;

    });