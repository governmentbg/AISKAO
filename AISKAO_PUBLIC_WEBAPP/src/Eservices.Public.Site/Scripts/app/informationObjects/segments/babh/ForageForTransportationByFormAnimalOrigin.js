define('babh/ForageForTransportationByFormAnimalOrigin',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageMaterialAnimalOriginMilkProduct',
    'babh/ForageMaterialAnimalOriginEggProduct',
    'babh/ForageMaterialAnimalOriginFishFlour',
    'babh/ForageMaterialAnimalOriginBloodProduct',
    'babh/ForageMaterialAnimalOriginBloodFlour',
    'babh/ForageMaterialAnimalOriginCalciumPhosphate',
    'babh/ForageMaterialAnimalOriginOther'],
    function (ko, Utils,
        gp,
        Enums,
        ForageMaterialAnimalOriginMilkProduct,
        ForageMaterialAnimalOriginEggProduct,
        ForageMaterialAnimalOriginFishFlour,
        ForageMaterialAnimalOriginBloodProduct,
        ForageMaterialAnimalOriginBloodFlour,
        ForageMaterialAnimalOriginCalciumPhosphate,
        ForageMaterialAnimalOriginOther) {

        var ForageForTransportationByFormAnimalOrigin = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражи за транспортиране по форма - фуражни суровини от животински произход (категория 3 от Регламент (ЕО) № 1069/2009)';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1327';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageMaterialAnimalOriginMilkProduct = ko.observable();
            this.forageMaterialAnimalOriginMilkProduct.subscribe(this.initForageMaterialAnimalOriginMilkProduct, this);
            this.forageMaterialAnimalOriginMilkProduct.isChecked = ko.observable(false);
            this.forageMaterialAnimalOriginMilkProduct.subscribtion = this.forageMaterialAnimalOriginMilkProduct.isChecked.subscribe(this.checkForageMaterialAnimalOriginMilkProduct, this);

            this.forageMaterialAnimalOriginEggProduct = ko.observable();
            this.forageMaterialAnimalOriginEggProduct.subscribe(this.initForageMaterialAnimalOriginEggProduct, this);
            this.forageMaterialAnimalOriginEggProduct.isChecked = ko.observable(false);
            this.forageMaterialAnimalOriginEggProduct.subscribtion = this.forageMaterialAnimalOriginEggProduct.isChecked.subscribe(this.checkForageMaterialAnimalOriginEggProduct, this);

            this.forageMaterialAnimalOriginFishFlour = ko.observable();
            this.forageMaterialAnimalOriginFishFlour.subscribe(this.initForageMaterialAnimalOriginFishFlour, this);
            this.forageMaterialAnimalOriginFishFlour.isChecked = ko.observable(false);
            this.forageMaterialAnimalOriginFishFlour.subscribtion = this.forageMaterialAnimalOriginFishFlour.isChecked.subscribe(this.checkForageMaterialAnimalOriginFishFlour, this);

            this.forageMaterialAnimalOriginBloodProduct = ko.observable();
            this.forageMaterialAnimalOriginBloodProduct.subscribe(this.initForageMaterialAnimalOriginBloodProduct, this);
            this.forageMaterialAnimalOriginBloodProduct.isChecked = ko.observable(false);
            this.forageMaterialAnimalOriginBloodProduct.subscribtion = this.forageMaterialAnimalOriginBloodProduct.isChecked.subscribe(this.checkForageMaterialAnimalOriginBloodProduct, this);

            this.forageMaterialAnimalOriginBloodFlour = ko.observable();
            this.forageMaterialAnimalOriginBloodFlour.subscribe(this.initForageMaterialAnimalOriginBloodFlour, this);
            this.forageMaterialAnimalOriginBloodFlour.isChecked = ko.observable(false);
            this.forageMaterialAnimalOriginBloodFlour.subscribtion = this.forageMaterialAnimalOriginBloodFlour.isChecked.subscribe(this.checkForageMaterialAnimalOriginBloodFlour, this);

            this.forageMaterialAnimalOriginCalciumPhosphate = ko.observable();
            this.forageMaterialAnimalOriginCalciumPhosphate.subscribe(this.initForageMaterialAnimalOriginCalciumPhosphate, this);
            this.forageMaterialAnimalOriginCalciumPhosphate.isChecked = ko.observable(false);
            this.forageMaterialAnimalOriginCalciumPhosphate.subscribtion = this.forageMaterialAnimalOriginCalciumPhosphate.isChecked.subscribe(this.checkForageMaterialAnimalOriginCalciumPhosphate, this);

            this.forageMaterialAnimalOriginLiquidFishOil = ko.observable(false);

            this.forageMaterialAnimalOriginLiquidMeltedFat = ko.observable(false);

            this.forageMaterialAnimalOriginOther = ko.observable();
            this.forageMaterialAnimalOriginOther.subscribe(this.initForageMaterialAnimalOriginOther, this);
            this.forageMaterialAnimalOriginOther.isChecked = ko.observable(false);
            this.forageMaterialAnimalOriginOther.subscribtion = this.forageMaterialAnimalOriginOther.isChecked.subscribe(this.checkForageMaterialAnimalOriginOther, this);
        }

        ForageForTransportationByFormAnimalOrigin.prototype = function () {
            var createForageMaterialAnimalOriginMilkProduct = function () {
                return new ForageMaterialAnimalOriginMilkProduct();
            },
            createForageMaterialAnimalOriginEggProduct = function () {
                return new ForageMaterialAnimalOriginEggProduct();
            },
            createForageMaterialAnimalOriginFishFlour = function () {
                return new ForageMaterialAnimalOriginFishFlour();
            },
            createForageMaterialAnimalOriginBloodProduct = function () {
                return new ForageMaterialAnimalOriginBloodProduct();
            },
            createForageMaterialAnimalOriginBloodFlour = function () {
                return new ForageMaterialAnimalOriginBloodFlour();
            },
            createForageMaterialAnimalOriginCalciumPhosphate = function () {
                return new ForageMaterialAnimalOriginCalciumPhosphate();
            },
            createForageMaterialAnimalOriginOther = function () {
                return new ForageMaterialAnimalOriginOther();
            },
            checkForageMaterialAnimalOriginMilkProduct = function (data) {
                if (data == true) {
                    this.forageMaterialAnimalOriginMilkProduct(new ForageMaterialAnimalOriginMilkProduct());
                } else if (data == false) {
                    this.forageMaterialAnimalOriginMilkProduct(undefined);
                }
            },
            checkForageMaterialAnimalOriginEggProduct = function (data) {
                if (data == true) {
                    this.forageMaterialAnimalOriginEggProduct(new ForageMaterialAnimalOriginEggProduct());
                } else if (data == false) {
                    this.forageMaterialAnimalOriginEggProduct(undefined);
                }
            },
            checkForageMaterialAnimalOriginFishFlour = function (data) {
                if (data == true) {
                    this.forageMaterialAnimalOriginFishFlour(new ForageMaterialAnimalOriginFishFlour());
                } else if (data == false) {
                    this.forageMaterialAnimalOriginFishFlour(undefined);
                }
            },
            checkForageMaterialAnimalOriginBloodProduct = function (data) {
                if (data == true) {
                    this.forageMaterialAnimalOriginBloodProduct(new ForageMaterialAnimalOriginBloodProduct());
                } else if (data == false) {
                    this.forageMaterialAnimalOriginBloodProduct(undefined);
                }
            },
            checkForageMaterialAnimalOriginBloodFlour = function (data) {
                if (data == true) {
                    this.forageMaterialAnimalOriginBloodFlour(new ForageMaterialAnimalOriginBloodFlour());
                } else if (data == false) {
                    this.forageMaterialAnimalOriginBloodFlour(undefined);
                }
            },
            checkForageMaterialAnimalOriginCalciumPhosphate = function (data) {
                if (data == true) {
                    this.forageMaterialAnimalOriginCalciumPhosphate(new ForageMaterialAnimalOriginCalciumPhosphate());
                } else if (data == false) {
                    this.forageMaterialAnimalOriginCalciumPhosphate(undefined);
                }
            },
            checkForageMaterialAnimalOriginOther = function (data) {
                if (data == true) {
                    this.forageMaterialAnimalOriginOther(new ForageMaterialAnimalOriginOther());
                } else if (data == false) {
                    this.forageMaterialAnimalOriginOther(undefined);
                }
            },
            initForageMaterialAnimalOriginMilkProduct = function () {
                var self = this;
                this.forageMaterialAnimalOriginMilkProduct.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageMaterialAnimalOriginMilkProduct() != undefined) {
                    self.forageMaterialAnimalOriginMilkProduct.isChecked(true);
                }
                self.forageMaterialAnimalOriginMilkProduct.isChecked.subscribe(self.checkForageMaterialAnimalOriginMilkProduct, self);
            },
            initForageMaterialAnimalOriginEggProduct = function () {
                var self = this;
                this.forageMaterialAnimalOriginEggProduct.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageMaterialAnimalOriginEggProduct() != undefined) {
                    self.forageMaterialAnimalOriginEggProduct.isChecked(true);
                }
                self.forageMaterialAnimalOriginEggProduct.isChecked.subscribe(self.checkForageMaterialAnimalOriginEggProduct, self);
            },
            initForageMaterialAnimalOriginFishFlour = function () {
                var self = this;
                this.forageMaterialAnimalOriginFishFlour.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageMaterialAnimalOriginFishFlour() != undefined) {
                    self.forageMaterialAnimalOriginFishFlour.isChecked(true);
                }
                self.forageMaterialAnimalOriginFishFlour.isChecked.subscribe(self.checkForageMaterialAnimalOriginFishFlour, self);
            },
            initForageMaterialAnimalOriginBloodProduct = function () {
                var self = this;
                this.forageMaterialAnimalOriginBloodProduct.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageMaterialAnimalOriginBloodProduct() != undefined) {
                    self.forageMaterialAnimalOriginBloodProduct.isChecked(true);
                }
                self.forageMaterialAnimalOriginBloodProduct.isChecked.subscribe(self.checkForageMaterialAnimalOriginBloodProduct, self);
            },
            initForageMaterialAnimalOriginBloodFlour = function () {
                var self = this;
                this.forageMaterialAnimalOriginBloodFlour.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageMaterialAnimalOriginBloodFlour() != undefined) {
                    self.forageMaterialAnimalOriginBloodFlour.isChecked(true);
                }
                self.forageMaterialAnimalOriginBloodFlour.isChecked.subscribe(self.checkForageMaterialAnimalOriginBloodFlour, self);
            },
            initForageMaterialAnimalOriginCalciumPhosphate = function () {
                var self = this;
                this.forageMaterialAnimalOriginCalciumPhosphate.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageMaterialAnimalOriginCalciumPhosphate() != undefined) {
                    self.forageMaterialAnimalOriginCalciumPhosphate.isChecked(true);
                }
                self.forageMaterialAnimalOriginCalciumPhosphate.isChecked.subscribe(self.checkForageMaterialAnimalOriginCalciumPhosphate, self);
            },
            initForageMaterialAnimalOriginOther = function () {
                var self = this;
                this.forageMaterialAnimalOriginOther.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageMaterialAnimalOriginOther() != undefined) {
                    self.forageMaterialAnimalOriginOther.isChecked(true);
                }
                self.forageMaterialAnimalOriginOther.isChecked.subscribe(self.checkForageMaterialAnimalOriginOther, self);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createForageMaterialAnimalOriginMilkProduct: createForageMaterialAnimalOriginMilkProduct,
                createForageMaterialAnimalOriginEggProduct: createForageMaterialAnimalOriginEggProduct,
                createForageMaterialAnimalOriginFishFlour: createForageMaterialAnimalOriginFishFlour,
                createForageMaterialAnimalOriginBloodProduct: createForageMaterialAnimalOriginBloodProduct,
                createForageMaterialAnimalOriginBloodFlour: createForageMaterialAnimalOriginBloodFlour,
                createForageMaterialAnimalOriginCalciumPhosphate: createForageMaterialAnimalOriginCalciumPhosphate,
                createForageMaterialAnimalOriginOther: createForageMaterialAnimalOriginOther,
                checkForageMaterialAnimalOriginMilkProduct: checkForageMaterialAnimalOriginMilkProduct,
                checkForageMaterialAnimalOriginEggProduct: checkForageMaterialAnimalOriginEggProduct,
                checkForageMaterialAnimalOriginFishFlour: checkForageMaterialAnimalOriginFishFlour,
                checkForageMaterialAnimalOriginBloodProduct: checkForageMaterialAnimalOriginBloodProduct,
                checkForageMaterialAnimalOriginBloodFlour: checkForageMaterialAnimalOriginBloodFlour,
                checkForageMaterialAnimalOriginCalciumPhosphate: checkForageMaterialAnimalOriginCalciumPhosphate,
                checkForageMaterialAnimalOriginOther: checkForageMaterialAnimalOriginOther,
                initForageMaterialAnimalOriginMilkProduct: initForageMaterialAnimalOriginMilkProduct,
                initForageMaterialAnimalOriginEggProduct: initForageMaterialAnimalOriginEggProduct,
                initForageMaterialAnimalOriginFishFlour: initForageMaterialAnimalOriginFishFlour,
                initForageMaterialAnimalOriginBloodProduct: initForageMaterialAnimalOriginBloodProduct,
                initForageMaterialAnimalOriginBloodFlour: initForageMaterialAnimalOriginBloodFlour,
                initForageMaterialAnimalOriginCalciumPhosphate: initForageMaterialAnimalOriginCalciumPhosphate,
                initForageMaterialAnimalOriginOther: initForageMaterialAnimalOriginOther,
                toJSON: toJSON
            }
        }();

        return ForageForTransportationByFormAnimalOrigin;

    });