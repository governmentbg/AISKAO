define('babh/ForageOtherAnimalProductsTradingData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/RevisedAnimalProteinTypeData',
    'babh/BloodProductsTypeData',
    'babh/OtherAnimalOrRevisedProducts'],
    function (ko, Utils,
        gp,
        Enums,
        RevisedAnimalProteinTypeData,
        BloodProductsTypeData,
        OtherAnimalOrRevisedProducts) {

        var ForageOtherAnimalProductsTradingData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Търговия на странични животински продукти и/или производни продукти от категория 3, попадащи в обхвата на Регламент (ЕО) № 1069/2009';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1267';
            this._settings.options = {
                xmlns: this._settings.xmlns,
            };

            this.revisedAnimalProteinTypeData = ko.observable();
            this.revisedAnimalProteinTypeData.subscribe(this.initRevisedAnimalProteinTypeData, this);
            this.revisedAnimalProteinTypeData.isChecked = ko.observable(false);
            this.revisedAnimalProteinTypeData.subscribtion = this.revisedAnimalProteinTypeData.isChecked.subscribe(this.checkRevisedAnimalProteinTypeData, this);

            this.bloodProductsTypeData = ko.observable();
            this.bloodProductsTypeData.subscribe(this.initBloodProductsTypeData, this);
            this.bloodProductsTypeData.isChecked = ko.observable(false);
            this.bloodProductsTypeData.subscribtion = this.bloodProductsTypeData.isChecked.subscribe(this.checkBloodProductsTypeData, this);

            this.otherAnimalOrRevisedProducts = ko.observable();
            this.otherAnimalOrRevisedProducts.subscribe(this.initOtherAnimalOrRevisedProducts, this);
            this.otherAnimalOrRevisedProducts.isChecked = ko.observable(false);
            this.otherAnimalOrRevisedProducts.subscribtion = this.otherAnimalOrRevisedProducts.isChecked.subscribe(this.checkOtherAnimalOrRevisedProducts, this);
        }

        ForageOtherAnimalProductsTradingData.prototype = function () {
            var checkRevisedAnimalProteinTypeData = function (data) {
                if (data == true) {
                    this.revisedAnimalProteinTypeData(new RevisedAnimalProteinTypeData());
                } else if (data == false) {
                    this.revisedAnimalProteinTypeData(undefined);
                }
            },
            initRevisedAnimalProteinTypeData = function () {
                var self = this;
                this.revisedAnimalProteinTypeData.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.revisedAnimalProteinTypeData() != undefined) {
                    self.revisedAnimalProteinTypeData.isChecked(true);
                }
                self.revisedAnimalProteinTypeData.isChecked.subscribe(self.checkRevisedAnimalProteinTypeData, self);
            },
            checkBloodProductsTypeData = function (data) {
                if (data == true) {
                    this.bloodProductsTypeData(new BloodProductsTypeData());
                } else if (data == false) {
                    this.bloodProductsTypeData(undefined);
                }
            },
            initBloodProductsTypeData = function () {
                var self = this;
                this.bloodProductsTypeData.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.bloodProductsTypeData() != undefined) {
                    self.bloodProductsTypeData.isChecked(true);
                }
                self.bloodProductsTypeData.isChecked.subscribe(self.checkBloodProductsTypeData, self);
            },
            checkOtherAnimalOrRevisedProducts = function (data) {
                if (data == true) {
                    this.otherAnimalOrRevisedProducts(new OtherAnimalOrRevisedProducts());
                } else if (data == false) {
                    this.otherAnimalOrRevisedProducts(undefined);
                }
            },
            initOtherAnimalOrRevisedProducts = function () {
                var self = this;
                this.otherAnimalOrRevisedProducts.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.otherAnimalOrRevisedProducts() != undefined) {
                    self.otherAnimalOrRevisedProducts.isChecked(true);
                }
                self.otherAnimalOrRevisedProducts.isChecked.subscribe(self.checkOtherAnimalOrRevisedProducts, self);
            },
             createRevisedAnimalProteinTypeData = function () {
                 return new RevisedAnimalProteinTypeData();
             },
             createBloodProductsTypeData = function () {
                 return new BloodProductsTypeData();
             },
             createOtherAnimalOrRevisedProducts = function () {
                 return new OtherAnimalOrRevisedProducts();
             },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                checkRevisedAnimalProteinTypeData: checkRevisedAnimalProteinTypeData,
                initRevisedAnimalProteinTypeData: initRevisedAnimalProteinTypeData,
                checkBloodProductsTypeData: checkBloodProductsTypeData,
                initBloodProductsTypeData: initBloodProductsTypeData,
                checkOtherAnimalOrRevisedProducts: checkOtherAnimalOrRevisedProducts,
                initOtherAnimalOrRevisedProducts: initOtherAnimalOrRevisedProducts,
                createRevisedAnimalProteinTypeData: createRevisedAnimalProteinTypeData,
                createBloodProductsTypeData: createBloodProductsTypeData,
                createOtherAnimalOrRevisedProducts: createOtherAnimalOrRevisedProducts,
                toJSON: toJSON
            }
        }();

        return ForageOtherAnimalProductsTradingData;

    });