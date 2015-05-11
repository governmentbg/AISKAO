 define('babh/ForageOperatorActivitiesData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageMaterialData',
    'babh/ForageSupplementProductionData',
    'babh/ForagePremixProductionData',
    'babh/ForageCombinedMaterialCountData',
    'babh/ForageCombinedSupplementPremixData',
    'babh/ForageCombinedSupplementOtherAnimalProductsData',
    'babh/ForageMaterialByProductionData',
    'babh/ForageOtherAnimalProductsTradingData',
    'babh/ForageSupplementTradingData',
    'babh/ForagePremixTradingData',
    'babh/ForageCombinedTradingData',
    'babh/ForageCombinedSupplementOtherAnimalTradingData',
    'babh/ForageTradingWarehouseData',
    'babh/AnimalTypesFedWithRelatedAnimalProductsData'],
    function (ko, Utils,
        gp,
        Enums,
        ForageMaterialData,
        ForageSupplementProductionData,
        ForagePremixProductionData,
        ForageCombinedMaterialCountData,
        ForageCombinedSupplementPremixData,
        ForageCombinedSupplementOtherAnimalProductsData,
        ForageMaterialByProductionData,
        ForageOtherAnimalProductsTradingData,
        ForageSupplementTradingData,
        ForagePremixTradingData,
        ForageCombinedTradingData,
        ForageCombinedSupplementOtherAnimalTradingData,
        ForageTradingWarehouseData,
        AnimalTypesFedWithRelatedAnimalProductsData) {

        var ForageOperatorActivitiesData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за дейности на оператор във фуражния сектор';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1283';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageMaterialData = ko.observable(new ForageMaterialData());
            //this.forageMaterialData.subscribe(this.initForageMaterialData, this);
            //this.forageMaterialData.isChecked = ko.observable(false);
            //this.forageMaterialData.subscribtion = this.forageMaterialData.isChecked.subscribe(this.checkForageMaterialData, this);

            this.forageSupplementProductionData = ko.observable();
            this.forageSupplementProductionData.subscribe(this.initForageSupplementProductionData, this);
            this.forageSupplementProductionData.isChecked = ko.observable(false);
            this.forageSupplementProductionData.subscribtion = this.forageSupplementProductionData.isChecked.subscribe(this.checkForageSupplementProductionData, this);

            this.foragePremixProductionData = ko.observable();
            this.foragePremixProductionData.subscribe(this.initForagePremixProductionData, this);
            this.foragePremixProductionData.isChecked = ko.observable(false);
            this.foragePremixProductionData.subscribtion = this.foragePremixProductionData.isChecked.subscribe(this.checkForagePremixProductionData, this);

            this.forageCombinedMaterialCountData = ko.observable();
            this.forageCombinedMaterialCountData.subscribe(this.initForageCombinedMaterialCountData, this);
            this.forageCombinedMaterialCountData.isChecked = ko.observable(false);
            this.forageCombinedMaterialCountData.subscribtion = this.forageCombinedMaterialCountData.isChecked.subscribe(this.checkForageCombinedMaterialCountData, this);

            this.forageCombinedSupplementPremixData = ko.observable();
            this.forageCombinedSupplementPremixData.subscribe(this.initForageCombinedSupplementPremixData, this);
            this.forageCombinedSupplementPremixData.isChecked = ko.observable(false);
            this.forageCombinedSupplementPremixData.subscribtion = this.forageCombinedSupplementPremixData.isChecked.subscribe(this.checkForageCombinedSupplementPremixData, this);

            this.forageCombinedSupplementOtherAnimalProductsData = ko.observable();
            this.forageCombinedSupplementOtherAnimalProductsData.subscribe(this.initForageCombinedSupplementOtherAnimalProductsData, this);
            this.forageCombinedSupplementOtherAnimalProductsData.isChecked = ko.observable(false);
            this.forageCombinedSupplementOtherAnimalProductsData.subscribtion = this.forageCombinedSupplementOtherAnimalProductsData.isChecked.subscribe(this.checkForageCombinedSupplementOtherAnimalProductsData, this);

            this.forageMaterialByProductionData = ko.observable();
            this.forageMaterialByProductionData.subscribe(this.initForageMaterialByProductionData, this);
            this.forageMaterialByProductionData.isChecked = ko.observable(false);
            this.forageMaterialByProductionData.subscribtion = this.forageMaterialByProductionData.isChecked.subscribe(this.checkForageMaterialByProductionData, this);

            this.forageOtherAnimalProductsTradingData = ko.observable();
            this.forageOtherAnimalProductsTradingData.subscribe(this.initForageOtherAnimalProductsTradingData, this);
            this.forageOtherAnimalProductsTradingData.isChecked = ko.observable(false);
            this.forageOtherAnimalProductsTradingData.subscribtion = this.forageOtherAnimalProductsTradingData.isChecked.subscribe(this.checkForageOtherAnimalProductsTradingData, this);

            this.forageSupplementTradingData = ko.observable();
            this.forageSupplementTradingData.subscribe(this.initForageSupplementTradingData, this);
            this.forageSupplementTradingData.isChecked = ko.observable(false);
            this.forageSupplementTradingData.subscribtion = this.forageSupplementTradingData.isChecked.subscribe(this.checkForageSupplementTradingData, this);

            this.foragePremixTradingData = ko.observable();
            this.foragePremixTradingData.subscribe(this.initForagePremixTradingData, this);
            this.foragePremixTradingData.isChecked = ko.observable(false);
            this.foragePremixTradingData.subscribtion = this.foragePremixTradingData.isChecked.subscribe(this.checkForagePremixTradingData, this);

            this.forageCombinedTradingData = ko.observable();
            this.forageCombinedTradingData.subscribe(this.initForageCombinedTradingData, this);
            this.forageCombinedTradingData.isChecked = ko.observable(false);
            this.forageCombinedTradingData.subscribtion = this.forageCombinedTradingData.isChecked.subscribe(this.checkForageCombinedTradingData, this);

            this.forageCombinedSupplementOtherAnimalTradingData = ko.observable();
            this.forageCombinedSupplementOtherAnimalTradingData.subscribe(this.initForageCombinedSupplementOtherAnimalTradingData, this);
            this.forageCombinedSupplementOtherAnimalTradingData.isChecked = ko.observable(false);
            this.forageCombinedSupplementOtherAnimalTradingData.subscribtion = this.forageCombinedSupplementOtherAnimalTradingData.isChecked.subscribe(this.checkForageCombinedSupplementOtherAnimalTradingData, this);

            this.forageTradingWarehouseData = ko.observable();
            this.forageTradingWarehouseData.subscribe(this.initForageTradingWarehouseData, this);
            this.forageTradingWarehouseData.isChecked = ko.observable(false);
            this.forageTradingWarehouseData.subscribtion = this.forageTradingWarehouseData.isChecked.subscribe(this.checkForageTradingWarehouseData, this);

            this.forageProductionLinesCount = ko.observable();
            this.forageProductionLinesCount.title = "Брой самостоятелни технологични линии за производство на фуражи";
            this.forageProductionLinesCount.extend({
                fieldIsNumber: {
                    field: this.forageProductionLinesCount
                }
            });

            this.animalTypesFedWithRelatedAnimalProductsData = ko.observable();
            this.animalTypesFedWithRelatedAnimalProductsData.subscribe(this.initAnimalTypesFedWithRelatedAnimalProductsData, this);
            this.animalTypesFedWithRelatedAnimalProductsData.isChecked = ko.observable(false);
            this.animalTypesFedWithRelatedAnimalProductsData.subscribtion = this.animalTypesFedWithRelatedAnimalProductsData.isChecked.subscribe(this.checkAnimalTypesFedWithRelatedAnimalProductsData, this);
        }

        ForageOperatorActivitiesData.prototype = function () {
            var createForageMaterialData = function () {
                return new ForageMaterialData();
            },
            createForageSupplementProductionData = function () {
                return new ForageSupplementProductionData();
            },
            createForagePremixProductionData = function () {
                return new ForagePremixProductionData();
            },
            createForageCombinedMaterialCountData = function () {
                return new ForageCombinedMaterialCountData();
            },
            createForageCombinedSupplementPremixData = function () {
                return new ForageCombinedSupplementPremixData();
            },
            createForageCombinedSupplementOtherAnimalProductsData = function () {
                return new ForageCombinedSupplementOtherAnimalProductsData();
            },
            createForageMaterialByProductionData = function () {
                return new ForageMaterialByProductionData();
            },
            createForageOtherAnimalProductsTradingData = function () {
                return new ForageOtherAnimalProductsTradingData();
            },
            createForageSupplementTradingData = function () {
                return new ForageSupplementTradingData();
            },
            createForagePremixTradingData = function () {
                return new ForagePremixTradingData();
            },
            createForageCombinedTradingData = function () {
                return new ForageCombinedTradingData();
            },
            createForageCombinedSupplementOtherAnimalTradingData = function () {
                return new ForageCombinedSupplementOtherAnimalTradingData();
            },
            createForageTradingWarehouseData = function () {
                return new ForageTradingWarehouseData();
            },
            createAnimalTypesFedWithRelatedAnimalProductsData = function () {
                return new AnimalTypesFedWithRelatedAnimalProductsData();
            },
            //checkForageMaterialData = function (data) {
            //    if (data == true) {
            //        this.forageMaterialData(new ForageMaterialData());
            //    } else if (data == false) {
            //        this.forageMaterialData(undefined);
            //    }
            //},
            checkForageSupplementProductionData = function (data) {
                if (data == true) {
                    this.forageSupplementProductionData(new ForageSupplementProductionData());
                } else if (data == false) {
                    this.forageSupplementProductionData(undefined);
                }
            },
            checkForagePremixProductionData = function (data) {
                if (data == true) {
                    this.foragePremixProductionData(new ForagePremixProductionData());
                } else if (data == false) {
                    this.foragePremixProductionData(undefined);
                }
            },
            checkForageCombinedMaterialCountData = function (data) {
                if (data == true) {
                    this.forageCombinedMaterialCountData(new ForageCombinedMaterialCountData());
                } else if (data == false) {
                    this.forageCombinedMaterialCountData(undefined);
                }
            },
            checkForageCombinedSupplementPremixData = function (data) {
                if (data == true) {
                    this.forageCombinedSupplementPremixData(new ForageCombinedSupplementPremixData());
                } else if (data == false) {
                    this.forageCombinedSupplementPremixData(undefined);
                }
            },
            checkForageCombinedSupplementOtherAnimalProductsData = function (data) {
                if (data == true) {
                    this.forageCombinedSupplementOtherAnimalProductsData(new ForageCombinedSupplementOtherAnimalProductsData());
                } else if (data == false) {
                    this.forageCombinedSupplementOtherAnimalProductsData(undefined);
                }
            },
            checkForageMaterialByProductionData = function (data) {
                if (data == true) {
                    this.forageMaterialByProductionData(new ForageMaterialByProductionData());
                } else if (data == false) {
                    this.forageMaterialByProductionData(undefined);
                }
            },
            checkForageOtherAnimalProductsTradingData = function (data) {
                if (data == true) {
                    this.forageOtherAnimalProductsTradingData(new ForageOtherAnimalProductsTradingData());
                } else if (data == false) {
                    this.forageOtherAnimalProductsTradingData(undefined);
                }
            },
            checkForageSupplementTradingData = function (data) {
                if (data == true) {
                    this.forageSupplementTradingData(new ForageSupplementTradingData());
                } else if (data == false) {
                    this.forageSupplementTradingData(undefined);
                }
            },
            checkForagePremixTradingData = function (data) {
                 if (data == true) {
                     this.foragePremixTradingData(new ForagePremixTradingData());
                 } else if (data == false) {
                     this.foragePremixTradingData(undefined);
                 }
             },
            checkForageCombinedTradingData = function (data) {
                  if (data == true) {
                      this.forageCombinedTradingData(new ForageCombinedTradingData());
                  } else if (data == false) {
                      this.forageCombinedTradingData(undefined);
                  }
            },
            checkForageCombinedSupplementOtherAnimalTradingData = function (data) {
                if (data == true) {
                    this.forageCombinedSupplementOtherAnimalTradingData(new ForageCombinedSupplementOtherAnimalTradingData());
                } else if (data == false) {
                    this.forageCombinedSupplementOtherAnimalTradingData(undefined);
                }
            },
            checkForageTradingWarehouseData = function (data) {
                  if (data == true) {
                      this.forageTradingWarehouseData(new ForageTradingWarehouseData());
                  } else if (data == false) {
                      this.forageTradingWarehouseData(undefined);
                  }
            },
            checkAnimalTypesFedWithRelatedAnimalProductsData = function (data) {
                  if (data == true) {
                      this.animalTypesFedWithRelatedAnimalProductsData(new AnimalTypesFedWithRelatedAnimalProductsData());
                  } else if (data == false) {
                      this.animalTypesFedWithRelatedAnimalProductsData(undefined);
                  }
            },
             //initForageMaterialData = function () {
             //    var self = this;
             //    this.forageMaterialData.subscribtion.dispose();
             //    if (gp.isLoadingDocument === true && self.forageMaterialData() != undefined) {
             //        self.forageMaterialData.isChecked(true);
             //    }
             //    self.forageSupplementProductionData.isChecked.subscribe(self.checkForageSupplementProductionData, self);
             //},
            initForageSupplementProductionData = function () {
                var self = this;
                this.forageSupplementProductionData.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageSupplementProductionData() != undefined) {
                    self.forageSupplementProductionData.isChecked(true);
                }
                self.forageSupplementProductionData.isChecked.subscribe(self.checkForageSupplementProductionData, self);
            },
            initForagePremixProductionData = function () {
                var self = this;
                this.foragePremixProductionData.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.foragePremixProductionData() != undefined) {
                    self.foragePremixProductionData.isChecked(true);
                }
                self.foragePremixProductionData.isChecked.subscribe(self.checkForagePremixProductionData, self);
            },
            initForageCombinedMaterialCountData = function () {
                var self = this;
                this.forageCombinedMaterialCountData.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageCombinedMaterialCountData() != undefined) {
                    self.forageCombinedMaterialCountData.isChecked(true);
                }
                self.forageCombinedMaterialCountData.isChecked.subscribe(self.checkForageCombinedMaterialCountData, self);
            },
            initForageCombinedSupplementPremixData = function () {
                var self = this;
                this.forageCombinedSupplementPremixData.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageCombinedSupplementPremixData() != undefined) {
                    self.forageCombinedSupplementPremixData.isChecked(true);
                }
                self.forageCombinedSupplementPremixData.isChecked.subscribe(self.checkForageCombinedSupplementPremixData, self);
            },
            initForageCombinedSupplementOtherAnimalProductsData = function () {
                var self = this;
                this.forageCombinedSupplementOtherAnimalProductsData.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageCombinedSupplementOtherAnimalProductsData() != undefined) {
                    self.forageCombinedSupplementOtherAnimalProductsData.isChecked(true);
                }
                self.forageCombinedSupplementOtherAnimalProductsData.isChecked.subscribe(self.checkForageCombinedSupplementOtherAnimalProductsData, self);
            },
            initForageMaterialByProductionData = function () {
                var self = this;
                this.forageMaterialByProductionData.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageMaterialByProductionData() != undefined) {
                    self.forageMaterialByProductionData.isChecked(true);
                }
                self.forageMaterialByProductionData.isChecked.subscribe(self.checkForageMaterialByProductionData, self);
            },
            initForageOtherAnimalProductsTradingData = function () {
                var self = this;
                this.forageOtherAnimalProductsTradingData.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageOtherAnimalProductsTradingData() != undefined) {
                    self.forageOtherAnimalProductsTradingData.isChecked(true);
                }
                self.forageOtherAnimalProductsTradingData.isChecked.subscribe(self.checkForageOtherAnimalProductsTradingData, self);
            },
            initForageSupplementTradingData = function () {
                var self = this;
                this.forageSupplementTradingData.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageSupplementTradingData() != undefined) {
                    self.forageSupplementTradingData.isChecked(true);
                }
                self.forageSupplementTradingData.isChecked.subscribe(self.checkForageSupplementTradingData, self);
            },
             initForagePremixTradingData = function () {
                 var self = this;
                 this.foragePremixTradingData.subscribtion.dispose();
                 if (gp.isLoadingDocument === true && self.foragePremixTradingData() != undefined) {
                     self.foragePremixTradingData.isChecked(true);
                 }
                 self.foragePremixTradingData.isChecked.subscribe(self.checkForagePremixTradingData, self);
             },
             initForageCombinedTradingData = function () {
                 var self = this;
                 this.forageCombinedTradingData.subscribtion.dispose();
                 if (gp.isLoadingDocument === true && self.forageCombinedTradingData() != undefined) {
                     self.forageCombinedTradingData.isChecked(true);
                 }
                 self.forageCombinedTradingData.isChecked.subscribe(self.checkForageCombinedTradingData, self);
             },
              initForageCombinedSupplementOtherAnimalTradingData = function () {
                 var self = this;
                 this.forageCombinedSupplementOtherAnimalTradingData.subscribtion.dispose();
                 if (gp.isLoadingDocument === true && self.forageCombinedSupplementOtherAnimalTradingData() != undefined) {
                     self.forageCombinedSupplementOtherAnimalTradingData.isChecked(true);
                 }
                 self.forageCombinedSupplementOtherAnimalTradingData.isChecked.subscribe(self.checkForageCombinedSupplementOtherAnimalTradingData, self);
             },
             initForageTradingWarehouseData = function () {
                 var self = this;
                 this.forageTradingWarehouseData.subscribtion.dispose();
                 if (gp.isLoadingDocument === true && self.forageTradingWarehouseData() != undefined) {
                     self.forageTradingWarehouseData.isChecked(true);
                 }
                 self.forageTradingWarehouseData.isChecked.subscribe(self.checkForageTradingWarehouseData, self);
             },
             initAnimalTypesFedWithRelatedAnimalProductsData = function () {
                 var self = this;
                 this.animalTypesFedWithRelatedAnimalProductsData.subscribtion.dispose();
                 if (gp.isLoadingDocument === true && self.animalTypesFedWithRelatedAnimalProductsData() != undefined) {
                     self.animalTypesFedWithRelatedAnimalProductsData.isChecked(true);
                 }
                 self.animalTypesFedWithRelatedAnimalProductsData.isChecked.subscribe(self.checkAnimalTypesFedWithRelatedAnimalProductsData, self);
             },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createForageMaterialData: createForageMaterialData,
                createForageSupplementProductionData: createForageSupplementProductionData,
                createForagePremixProductionData: createForagePremixProductionData,
                createForageCombinedMaterialCountData: createForageCombinedMaterialCountData,
                createForageCombinedSupplementPremixData: createForageCombinedSupplementPremixData,
                createForageCombinedSupplementOtherAnimalProductsData: createForageCombinedSupplementOtherAnimalProductsData,
                createForageMaterialByProductionData: createForageMaterialByProductionData,
                createForageOtherAnimalProductsTradingData: createForageOtherAnimalProductsTradingData,
                createForageSupplementTradingData: createForageSupplementTradingData,
                createForagePremixTradingData: createForagePremixTradingData,
                createForageCombinedTradingData: createForageCombinedTradingData,
                createForageCombinedSupplementOtherAnimalTradingData: createForageCombinedSupplementOtherAnimalTradingData,
                createForageTradingWarehouseData: createForageTradingWarehouseData,
                createAnimalTypesFedWithRelatedAnimalProductsData: createAnimalTypesFedWithRelatedAnimalProductsData,
                //checkForageMaterialData: checkForageMaterialData,
                checkForageSupplementProductionData: checkForageSupplementProductionData,
                checkForagePremixProductionData: checkForagePremixProductionData,
                checkForageCombinedMaterialCountData: checkForageCombinedMaterialCountData,
                checkForageCombinedSupplementPremixData: checkForageCombinedSupplementPremixData,
                checkForageCombinedSupplementOtherAnimalProductsData: checkForageCombinedSupplementOtherAnimalProductsData,
                checkForageMaterialByProductionData: checkForageMaterialByProductionData,
                checkForageOtherAnimalProductsTradingData: checkForageOtherAnimalProductsTradingData,
                checkForageSupplementTradingData: checkForageSupplementTradingData,
                checkForagePremixTradingData: checkForagePremixTradingData,
                checkForageCombinedTradingData: checkForageCombinedTradingData,
                checkForageCombinedSupplementOtherAnimalTradingData: checkForageCombinedSupplementOtherAnimalTradingData,
                checkForageTradingWarehouseData: checkForageTradingWarehouseData,
                checkAnimalTypesFedWithRelatedAnimalProductsData: checkAnimalTypesFedWithRelatedAnimalProductsData,
                //initForageMaterialData: initForageMaterialData,
                initForageSupplementProductionData: initForageSupplementProductionData,
                initForagePremixProductionData: initForagePremixProductionData,
                initForageCombinedMaterialCountData: initForageCombinedMaterialCountData,
                initForageCombinedSupplementPremixData: initForageCombinedSupplementPremixData,
                initForageCombinedSupplementOtherAnimalProductsData: initForageCombinedSupplementOtherAnimalProductsData,
                initForageMaterialByProductionData: initForageMaterialByProductionData,
                initForageOtherAnimalProductsTradingData: initForageOtherAnimalProductsTradingData,
                initForageSupplementTradingData: initForageSupplementTradingData,
                initForagePremixTradingData: initForagePremixTradingData,
                initForageCombinedTradingData: initForageCombinedTradingData,
                initForageCombinedSupplementOtherAnimalTradingData: initForageCombinedSupplementOtherAnimalTradingData,
                initForageTradingWarehouseData: initForageTradingWarehouseData,
                initAnimalTypesFedWithRelatedAnimalProductsData: initAnimalTypesFedWithRelatedAnimalProductsData,
                toJSON: toJSON
            }
        }();

        return ForageOperatorActivitiesData;

    });