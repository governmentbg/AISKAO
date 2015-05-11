define('babh/OtherOtherProductTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var OtherOtherProductTypes = function () {

            this.otherOtherProductType = ko.observableArray();
            this.otherOtherProductType.itemToAdd = ko.observable();
        }

        OtherOtherProductTypes.prototype = function () {
            var addOtherOtherProductType = function () {
                if (this.otherOtherProductType.itemToAdd() != undefined && this.otherOtherProductType.itemToAdd() != "" && ko.utils.arrayIndexOf(this.otherOtherProductType(), this.otherOtherProductType.itemToAdd()) < 0) {
                    // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                    this.otherOtherProductType.push(this.otherOtherProductType.itemToAdd());
                    // Clears the text box, because it's bound to the "itemToAdd" observable
                    this.otherOtherProductType.itemToAdd("");
                }
            },
            removeOtherOtherProductType = function (value) {
                this.otherOtherProductType.remove(value);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                addOtherOtherProductType: addOtherOtherProductType,
                removeOtherOtherProductType: removeOtherOtherProductType,
                toJSON: toJSON
            }
        }();

        return OtherOtherProductTypes;

    });