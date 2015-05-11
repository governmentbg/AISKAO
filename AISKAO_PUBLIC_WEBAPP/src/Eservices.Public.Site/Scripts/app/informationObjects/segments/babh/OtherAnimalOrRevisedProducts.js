define('babh/OtherAnimalOrRevisedProducts',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/OtherProductTypes',
    'babh/OtherOtherProductTypes'],
    function (ko, Utils,
        gp,
        Enums,
        OtherProductTypes,
        OtherOtherProductTypes) {

        var OtherAnimalOrRevisedProducts = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за други странични животински продукти и/или производни продукти от категория 3, попадащи в обхвата на Регламент (ЕО) № 1069/2009';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1263';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.otherProductTypes = ko.observable(new OtherProductTypes);

            this.otherOtherProductTypes = ko.observable(new OtherOtherProductTypes());
            this.otherOtherProductTypes.title = "Други видове други странични животински продукти";
        }

        OtherAnimalOrRevisedProducts.prototype = function () {
            toJSON = function () {
                if (this.otherProductTypes !== undefined &&
                    this.otherProductTypes.otherProductType !== undefined &&
                    this.otherProductTypes.otherProductType.length === 0) {
                    this.otherProductTypes = undefined;
                }
                if (this.otherOtherProductTypes !== undefined &&
                    this.otherOtherProductTypes.otherOtherProductType !== undefined &&
                    this.otherOtherProductTypes.otherOtherProductType.length === 0) {
                    this.otherOtherProductTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return OtherAnimalOrRevisedProducts;

    });