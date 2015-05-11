define('babh/FoodGroup',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'babh/FoodItems',
    'babh/FoodSubGroups'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        FoodItems,
        FoodSubGroups) {

        var FoodGroup = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.code = ko.observable();
            this.code.nomFoodGroups = ko.observableArray();
            this.code.subGroups = ko.observable();
            this.code.subscribe(this.changeFoodGroups, this);
            if (gp.isLoadingDocument === true) {
                this.code.subscribe(this.initFoodGroups, this);
            }
            this.code.title = "Код на група храни";
            this.code.extend({
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.code,
                    dataPackField: 'code',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.code.nomFoodGroups
                },
            });
            this.shortName = ko.observable();
            this.shortName.nomFoodGroups = ko.observableArray();
            this.shortName.title = "Кратко наименование на група храни";
            this.shortName.extend({
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.shortName,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.code.nomFoodGroups
                },
            });

            this.name = ko.observable();
            this.name.nomFoodGroups = ko.observableArray();
            this.name.title = "Наименование на група храни";
            this.name.extend({
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.name,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.code.nomFoodGroups
                },
            });

            this.name.displayName = ko.computed(function () {
                return this.shortName() + " - " + this.name();
            }, this);

            this.foodSubGroups = ko.observable(new FoodSubGroups());
            this.foodItems = ko.observable(new FoodItems());
        }

        FoodGroup.prototype = function () {
            var createFoodSubGroup = function () {
                return new FoodSubGroup();
            },
            initFoodGroups = function () {
                if (gp.isLoadingDocument === true) {
                    var self = this,
                        dCode = self.code();
                    self.foodSubGroups().foodSubGroup.foodGroupCode(dCode);
                    self.foodItems().foodItem.foodGroupCode(dCode);
                }
            },
            changeFoodGroups = function (newValue) {
                if (gp.isLoadingDocument === false) {
                    var self = this;
                    if (newValue) {
                        this.code(newValue);
                        self.foodSubGroups().foodSubGroup.foodGroupCode(newValue);
                        self.foodItems().foodItem.foodGroupCode(newValue);
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
                createFoodSubGroup: createFoodSubGroup,
                initFoodGroups: initFoodGroups,
                changeFoodGroups: changeFoodGroups,
                toJSON: toJSON
            }
        }();

        return FoodGroup;

    });