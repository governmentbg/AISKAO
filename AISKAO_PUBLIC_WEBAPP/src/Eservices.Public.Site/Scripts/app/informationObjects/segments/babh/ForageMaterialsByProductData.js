define('babh/ForageMaterialsByProductData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageMaterialNames'],
    function (ko, Utils,
        gp,
        Enums,
        ForageMaterialNames) {

        var ForageMaterialsByProductData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражни суровини по вид продукт';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1143';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageMaterialProduct = ko.observable();
            this.forageMaterialProduct.nomForageMaterialProducts = ko.observableArray(Enums.forageMaterialProductTypes);
            this.forageMaterialProduct.title = "Вид продукт при прозводство на фуражни суровини";
            this.forageMaterialProduct.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.forageMaterialProduct.subscribe(this.initForageMaterialProduct, this);
            }
            this.forageMaterialProduct.extend({
                fieldIsFromEnum: {
                    field: this.forageMaterialProduct,
                    nomenclatureTitle: 'Номенклатура за видове продукти при производство на фуражни суровини, предназначени за пазара',
                    nomenclatureValues: Enums.forageMaterialProductTypes
                }
            });

            this.forageMaterialNames = ko.observable(new ForageMaterialNames());
            this.forageMaterialNames.title = "Наименование на фуражна суровина";
        };

        ForageMaterialsByProductData.prototype = function () {
            var initForageMaterialProduct = function () {
                 if (gp.isLoadingDocument === true) {
                     var forageMaterialProductCode = this.forageMaterialProduct();
                     if (forageMaterialProductCode) {
                         this.forageMaterialProduct.displayValue(ko.utils.arrayFirst(this.forageMaterialProduct.nomForageMaterialProducts(), function (item) {
                             if (item.key === forageMaterialProductCode) {
                                 return item;
                             }
                         }));
                     }
                 }
             },
            toJSON = function () {
                if (this.forageMaterialNames !== undefined &&
                 this.forageMaterialNames.forageMaterialName !== undefined &&
                 this.forageMaterialNames.forageMaterialName.length === 0) {
                    this.forageMaterialNames = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initForageMaterialProduct: initForageMaterialProduct,
                toJSON: toJSON
            }
        }();

        return ForageMaterialsByProductData;

    });