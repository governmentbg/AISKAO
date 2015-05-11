define('babh/OtherAnimalTypeFedWithRelatedAnimalProducts',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var OtherAnimalTypeFedWithRelatedAnimalProducts = function () {

            this.otherAnimalTypeFedWithRelatedAnimalProduct = ko.observableArray();
            this.otherAnimalTypeFedWithRelatedAnimalProduct.itemToAdd = ko.observable();
        }

        OtherAnimalTypeFedWithRelatedAnimalProducts.prototype = function () {
            var addOtherAnimalTypeFedWithRelatedAnimalProduct = function () {
                if (this.otherAnimalTypeFedWithRelatedAnimalProduct.itemToAdd() != undefined && this.otherAnimalTypeFedWithRelatedAnimalProduct.itemToAdd() != "" && ko.utils.arrayIndexOf(this.otherAnimalTypeFedWithRelatedAnimalProduct(), this.otherAnimalTypeFedWithRelatedAnimalProduct.itemToAdd()) < 0) {
                    // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                    this.otherAnimalTypeFedWithRelatedAnimalProduct.push(this.otherAnimalTypeFedWithRelatedAnimalProduct.itemToAdd());
                    // Clears the text box, because it's bound to the "itemToAdd" observable
                    this.otherAnimalTypeFedWithRelatedAnimalProduct.itemToAdd("");
                }
            },
            removeOtherAnimalTypeFedWithRelatedAnimalProduct = function (value) {
                this.otherAnimalTypeFedWithRelatedAnimalProduct.remove(value);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                addOtherAnimalTypeFedWithRelatedAnimalProduct: addOtherAnimalTypeFedWithRelatedAnimalProduct,
                removeOtherAnimalTypeFedWithRelatedAnimalProduct: removeOtherAnimalTypeFedWithRelatedAnimalProduct,
                toJSON: toJSON
            }
        }();

        return OtherAnimalTypeFedWithRelatedAnimalProducts;

    });