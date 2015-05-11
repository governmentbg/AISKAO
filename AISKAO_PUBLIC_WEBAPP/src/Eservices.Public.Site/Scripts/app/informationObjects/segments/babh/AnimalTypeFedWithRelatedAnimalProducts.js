define('babh/AnimalTypeFedWithRelatedAnimalProducts',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var AnimalTypeFedWithRelatedAnimalProducts = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.animalTypeFedWithRelatedAnimalProduct = ko.observableArray([]);
            this.animalTypeFedWithRelatedAnimalProduct.nomAnimalTypeFedWithRelatedAnimalProducts = ko.observable(Enums.animalTypeFedWithRelatedAnimalProducts);
            this.animalTypeFedWithRelatedAnimalProduct.title = "Вид кръвни продукти";
        }

        AnimalTypeFedWithRelatedAnimalProducts.prototype = function () {
            var getAnimalTypeFedWithRelatedAnimalProduct = function (data) {
                var animalName = ko.utils.arrayFirst(Enums.animalTypeFedWithRelatedAnimalProducts, function (item) {
                    if (item.key == data) {
                        return item;
                    }
                });
                return animalName.name;
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                getAnimalTypeFedWithRelatedAnimalProduct: getAnimalTypeFedWithRelatedAnimalProduct,
                toJSON: toJSON
            }
        }();

        return AnimalTypeFedWithRelatedAnimalProducts;

    });