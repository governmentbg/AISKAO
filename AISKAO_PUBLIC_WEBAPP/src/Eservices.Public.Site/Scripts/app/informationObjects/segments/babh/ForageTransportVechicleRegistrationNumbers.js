define('babh/ForageTransportVechicleRegistrationNumbers',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageTransportVechicleRegistrationNumbers = function () {

            this.forageTransportVechicleRegistrationNumber = ko.observableArray();
            this.forageTransportVechicleRegistrationNumber.itemToAdd = ko.observable();

        }

        ForageTransportVechicleRegistrationNumbers.prototype = function () {
            var addForageTransportVechicleRegistrationNumber = function () {
                if (this.forageTransportVechicleRegistrationNumber.itemToAdd() != undefined && this.forageTransportVechicleRegistrationNumber.itemToAdd() != "" && ko.utils.arrayIndexOf(this.forageTransportVechicleRegistrationNumber(), this.forageTransportVechicleRegistrationNumber.itemToAdd()) < 0) {
                    // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                    this.forageTransportVechicleRegistrationNumber.push(this.forageTransportVechicleRegistrationNumber.itemToAdd());
                    // Clears the text box, because it's bound to the "itemToAdd" observable
                    this.forageTransportVechicleRegistrationNumber.itemToAdd("");
                }
            },
            removeForageTransportVechicleRegistrationNumber = function (value) {
                this.forageTransportVechicleRegistrationNumber.remove(value);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                addForageTransportVechicleRegistrationNumber: addForageTransportVechicleRegistrationNumber,
                removeForageTransportVechicleRegistrationNumber: removeForageTransportVechicleRegistrationNumber,
                toJSON: toJSON
            }
        }();

        return ForageTransportVechicleRegistrationNumbers;

    });