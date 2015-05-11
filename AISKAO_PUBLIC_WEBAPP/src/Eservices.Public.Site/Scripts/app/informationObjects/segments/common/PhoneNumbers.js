define('common/PhoneNumbers',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var PhoneNumbers = function () {
            this.phoneNumber = ko.observableArray();
            this.phoneNumber.itemToAdd = ko.observable();
        };

        PhoneNumbers.prototype = function () {
            var addPhoneNumber = function () {
                if (this.phoneNumber.itemToAdd() != undefined && this.phoneNumber.itemToAdd() != "" && ko.utils.arrayIndexOf(this.phoneNumber(), this.phoneNumber.itemToAdd()) < 0) {
                    // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                    this.phoneNumber.push(this.phoneNumber.itemToAdd());
                    // Clears the text box, because it's bound to the "itemToAdd" observable
                    this.phoneNumber.itemToAdd("");
                }
            },
            removePhoneNumber = function (value) {
                this.phoneNumber.remove(value);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                addPhoneNumber: addPhoneNumber,
                removePhoneNumber: removePhoneNumber,
                toJSON: toJSON
            }
        }();

        return PhoneNumbers;

    }
);