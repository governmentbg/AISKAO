define('common/FaxNumbers',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var FaxNumbers = function () {
            this._settings = {};
            this._settings.options = {
                propertiesTitles: {
                    faxNumber: 'ElectronicServiceApplicantFaxNumber'
                }
            };

            this.faxNumber = ko.observableArray();
            this.faxNumber.itemToAdd = ko.observable();
        }

        FaxNumbers.prototype = function () {
            var addFaxNumber = function () {
                if (this.faxNumber.itemToAdd() != undefined && this.faxNumber.itemToAdd() != "" && ko.utils.arrayIndexOf(this.faxNumber(), this.faxNumber.itemToAdd()) < 0) {
                    // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                    this.faxNumber.push(this.faxNumber.itemToAdd());
                    // Clears the text box, because it's bound to the "itemToAdd" observable
                    this.faxNumber.itemToAdd("");
                }
            },
            removeFaxNumber = function (value) {
                this.faxNumber.remove(value);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                addFaxNumber: addFaxNumber,
                removeFaxNumber: removeFaxNumber,
                toJSON: toJSON
            }
        }();

        return FaxNumbers;

    }
);