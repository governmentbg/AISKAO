define('babh/AnimalTypesFedWithRelatedAnimalProductsData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/AnimalTypeFedWithRelatedAnimalProducts',
    'babh/OtherAnimalTypeFedWithRelatedAnimalProducts'],
    function (ko, Utils,
        gp,
        Enums,
        AnimalTypeFedWithRelatedAnimalProducts,
        OtherAnimalTypeFedWithRelatedAnimalProducts) {

        var AnimalTypesFedWithRelatedAnimalProductsData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за видове животни, за изхранването на които са предназначени страничните животински продукти и/или производни продукти от категория 3, попадащи в обхвата на Регламент (ЕО) № 1069/2009 или фуражите, които ги съдържат';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1281';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.animalTypeFedWithRelatedAnimalProducts = ko.observable(new AnimalTypeFedWithRelatedAnimalProducts());

            this.otherAnimalTypeFedWithRelatedAnimalProducts = ko.observable(new OtherAnimalTypeFedWithRelatedAnimalProducts());
        }

        AnimalTypesFedWithRelatedAnimalProductsData.prototype = function () {
            toJSON = function () {
                if (this.animalTypeFedWithRelatedAnimalProducts !== undefined &&
                    this.animalTypeFedWithRelatedAnimalProducts.animalTypeFedWithRelatedAnimalProduct !== undefined &&
                    this.animalTypeFedWithRelatedAnimalProducts.animalTypeFedWithRelatedAnimalProduct.length === 0) {
                    this.animalTypeFedWithRelatedAnimalProducts = undefined;
                }
                if (this.otherAnimalTypeFedWithRelatedAnimalProducts !== undefined &&
                   this.otherAnimalTypeFedWithRelatedAnimalProducts.otherAnimalTypeFedWithRelatedAnimalProduct !== undefined &&
                   this.otherAnimalTypeFedWithRelatedAnimalProducts.otherAnimalTypeFedWithRelatedAnimalProduct.length === 0) {
                   this.otherAnimalTypeFedWithRelatedAnimalProducts = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return AnimalTypesFedWithRelatedAnimalProductsData;

    });