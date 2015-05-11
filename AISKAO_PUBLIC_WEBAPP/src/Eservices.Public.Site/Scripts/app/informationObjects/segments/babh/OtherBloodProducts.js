define('babh/OtherBloodProducts',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var OtherBloodProducts = function () {

            this.otherBloodProduct = ko.observableArray();
            this.otherBloodProduct.itemToAdd = ko.observable();
        }

        OtherBloodProducts.prototype = function () {
            var addOtherBloodProduct = function () {
                if (this.otherBloodProduct.itemToAdd() != undefined && this.otherBloodProduct.itemToAdd() != "" && ko.utils.arrayIndexOf(this.otherBloodProduct(), this.otherBloodProduct.itemToAdd()) < 0) {
                    // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                    this.otherBloodProduct.push(this.otherBloodProduct.itemToAdd());
                    // Clears the text box, because it's bound to the "itemToAdd" observable
                    this.otherBloodProduct.itemToAdd("");
                }
            },
            removeOtherBloodProduct = function (value) {
                this.otherBloodProduct.remove(value);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                addOtherBloodProduct: addOtherBloodProduct,
                removeOtherBloodProduct: removeOtherBloodProduct,
                toJSON: toJSON
            }
        }();

        return OtherBloodProducts;

    });