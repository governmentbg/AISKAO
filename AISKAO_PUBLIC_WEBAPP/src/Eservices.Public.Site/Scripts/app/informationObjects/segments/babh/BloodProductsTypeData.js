define('babh/BloodProductsTypeData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/BloodProductsTypes',
    'babh/OtherBloodProducts'],
    function (ko, Utils,
        gp,
        Enums,
        BloodProductsTypes,
        OtherBloodProducts) {

        var BloodProductsTypeData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за вид кръвни продукти като странични животински продукти и/или производни продукти от категория 3, попадащи в обхвата на Регламент (ЕО) № 1069/2009';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1252';
            this._settings.options = {
                xmlns: this._settings.xmlns 
            };


            this.bloodProductsTypes = ko.observable(new BloodProductsTypes());

            this.otherBloodProducts = ko.observable(new OtherBloodProducts());
            this.otherBloodProducts.title = "Други кръвни продукти";
        }

        BloodProductsTypeData.prototype = function () {
            toJSON = function () {
                if (this.bloodProductsTypes !== undefined &&
                    this.bloodProductsTypes.bloodProductsType !== undefined &&
                    this.bloodProductsTypes.bloodProductsType.length === 0) {
                    this.bloodProductsTypes = undefined;
                }
                if (this.otherBloodProducts !== undefined &&
                   this.otherBloodProducts.otherBloodProduct !== undefined &&
                   this.otherBloodProducts.otherBloodProduct.length === 0) {
                    this.otherBloodProducts = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return BloodProductsTypeData;

    });