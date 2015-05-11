define('babh/BABHAnimalObjectAnimalType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'babh/AnimalObjectAnimalPurposes'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        AnimalObjectAnimalPurposes) {

        var BABHAnimalObjectAnimalType = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за животни в животновъден обект';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1418';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.animalTypeCode = ko.observable();
            this.animalTypeCode.title = "Код на вид животни";
            this.animalTypeCode.nomAnimalTypes = ko.observableArray();
            this.animalTypeCode.selectedAnimalType = ko.observable();
            //this.animalTypeCode.isLoaded = ko.observable(false);
            this.animalTypeCode.isLoading = ko.observable(false);
            this.animalTypeCode.subscribe(this.initAnimalType, this);
            var self = this;
            self.animalTypeCode.isLoading(true);
            datacontext.getAnimalTypes(this.animalTypeCode.nomAnimalTypes)
                       .then(function () {
                           //self.animalTypeCode.isLoaded(true);
                           self.animalTypeCode.isLoading(false);
                       });
            this.animalTypeCode.subscribtion = this.animalTypeCode.selectedAnimalType.subscribe(this.changeAnimalType, this);
            this.animalTypeCode.extend({
                fieldIsRequired: {
                    field: this.animalTypeCode,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.animalTypeName = ko.observable();
            this.animalTypeName.title = "Наименование на вид животни";
            this.animalTypeName.extend({
                fieldIsRequired: {
                    field: this.animalTypeName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.otherAnimalTypeName = ko.observable();
            this.otherAnimalTypeName.title = "Друг вид животно, отглеждано в животновъден обект";

            this.animalTypeAdditionalInfo = ko.observable();
            this.animalTypeAdditionalInfo.title = "Допълнителна информация за вид животни";

            this.animalObjectAnimalPurposes = ko.observable(new AnimalObjectAnimalPurposes());
           
            this.otherAnimalPurpose = ko.observable();
            this.otherAnimalPurpose.title = "Друго предназначение на животни в животновъден обект";

            this.animalRisingTechnologyCode = ko.observable();
            this.animalRisingTechnologyCode.title = "Код на технология на отглеждане";
            this.animalRisingTechnologyCode.nomAnimalRisingTechnologies = ko.observableArray();
            this.animalRisingTechnologyCode.selectedAnimalRisingTechnology = ko.observable();
            // this.animalRisingTechnologyCode.isLoaded = ko.observable(false);
            this.animalRisingTechnologyCode.isLoading = ko.observable(false);
            this.animalRisingTechnologyCode.subscribe(this.initAnimalRisingTechnology, this);
            var self = this;
            self.animalRisingTechnologyCode.isLoading(true);
            datacontext.getAnimalRisingTechnologies(this.animalRisingTechnologyCode.nomAnimalRisingTechnologies)
                       .then(function () {
                           //self.animalRisingTechnologyCode.isLoaded(true);
                           self.animalRisingTechnologyCode.isLoading(false);
                       });
            this.animalRisingTechnologyCode.subscribtion = this.animalRisingTechnologyCode.selectedAnimalRisingTechnology.subscribe(this.changeAnimalRisingTechnology, this);
            this.animalRisingTechnologyCode.extend({
                fieldIsRequired: {
                    field: this.animalRisingTechnologyCode,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.animalRisingTechnologyName = ko.observable();
            this.animalRisingTechnologyName.title = "Наименование на технология на отглеждане";
            this.animalRisingTechnologyName.extend({
                fieldIsRequired: {
                    field: this.animalRisingTechnologyName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.otherAnimalRisingTechnology = ko.observable();
            this.otherAnimalRisingTechnology.title = "Друга технология на отглеждане на животни";

            this.farmCapacityByAnimalType = ko.observable();
            this.farmCapacityByAnimalType.title = "Капацитет за отглеждане на вид животни в животновъден обект";

            this.farmAnimalsCount = ko.observable();
            this.farmAnimalsCount.title = "Брой отглеждани животни от даден вид в животновъден обект";
            this.farmAnimalsCount.extend({
                fieldIsNumber: {
                    field: this.farmAnimalsCount,
                    sectionTitle: this._settings.sectionTitle
                }
            });
        }

        BABHAnimalObjectAnimalType.prototype = function () {
            var initAnimalType = function () {
                if (gp.isLoadingDocument === true) {
                    var self = this;
                    var aCode = self.animalTypeCode();
                    if (aCode) {
                        self.animalTypeCode.isLoading(true);
                        datacontext.getAnimalTypes(self.animalTypeCode.nomAnimalTypes)
                                .then(function () {
                                        self.animalTypeCode.subscribtion.dispose();
                                        self.animalTypeCode.isLoading(false);
                                        self.animalTypeCode.selectedAnimalType(ko.utils.arrayFirst(self.animalTypeCode.nomAnimalTypes(), function (item) {
                                            if (item.code && item.code() === aCode) {
                                                return item;
                                        }
                                    }));
                            self.animalTypeCode.selectedAnimalType.subscribe(self.changeAnimalType, self);
                        });
                    }
                }
            },
            changeAnimalType = function (newValue) {
            if (gp.isLoadingDocument === false) {
                if (newValue) {
                    this.animalTypeCode(newValue.code());
                    this.animalTypeName(newValue.name());
                }
                if (newValue.code() != "32") {
                    this.otherAnimalTypeName(undefined);
                }
            }
        },
            initAnimalRisingTechnology = function () {
             if (gp.isLoadingDocument === true) {
                 var self = this;
                 var aCode = self.animalRisingTechnologyCode();
                 if (aCode) {
                     self.animalRisingTechnologyCode.isLoading(true);
                     datacontext.getAnimalRisingTechnologies(self.animalRisingTechnologyCode.nomAnimalRisingTechnologies)
                         .then(function () {
                             self.animalRisingTechnologyCode.subscribtion.dispose();
                             self.animalRisingTechnologyCode.isLoading(false);
                             self.animalRisingTechnologyCode.selectedAnimalRisingTechnology(ko.utils.arrayFirst(self.animalRisingTechnologyCode.nomAnimalRisingTechnologies(), function (item) {
                                 if (item.code && item.code() === aCode) {
                                     return item;
                                 }
                             }));
                         self.animalRisingTechnologyCode.selectedAnimalRisingTechnology.subscribe(self.changeAnimalRisingTechnology, self);
                     });
                 }
             }
         },
            changeAnimalRisingTechnology = function (newValue) {
             if (gp.isLoadingDocument === false) {
                 if (newValue) {
                     this.animalRisingTechnologyCode(newValue.code());
                     this.animalRisingTechnologyName(newValue.name());
                 }
                 if (newValue.code() != "3") {
                     this.otherAnimalRisingTechnology(undefined);
                 }
             }
         },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initAnimalType: initAnimalType,
                changeAnimalType: changeAnimalType,
                initAnimalRisingTechnology: initAnimalRisingTechnology,
                changeAnimalRisingTechnology: changeAnimalRisingTechnology,
                toJSON: toJSON
            }
        }();

        return BABHAnimalObjectAnimalType;

    });