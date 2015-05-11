define('common/Discrepancies',
    ['ko', 'Utils', 'Enums', 'GlobalParameters'],
    function (ko, Utils, Enums, gp) {

        var Discrepancies = function () {
            this._settings = {};
            this._settings.sectionTitle = 'УРИ на регистриран документ в официален документен регистър';
            this._settings.xmlns = 'http://ereg.egov.bg/value/0008-000006';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.discrepancy = ko.observableArray();
            this.discrepancy.selectedDiscrepancy = ko.observable();
            this.discrepancy.nomDiscrepancies = ko.observableArray(Enums.discrepancyTypes);
        };


        Discrepancies.prototype = function () {

            var addDiscrepancy = function () {
               if (this.discrepancy.selectedDiscrepancy != undefined && this.discrepancy.selectedDiscrepancy != "" && ko.utils.arrayIndexOf(this.discrepancy(), this.discrepancy.selectedDiscrepancy().key) < 0) {
                    // Adds the item. Writing to the "items" observableArray causes any associated UI to update.

                   this.discrepancy.push(this.discrepancy.selectedDiscrepancy().key);
                  }
            },
            removeDiscrepancy = function (value) {
                this.discrepancy.remove(value);
            },
             getDiscrepancyName = function (data) {
                var discrepancyName = ko.utils.arrayFirst(this.discrepancy.nomDiscrepancies(), function (item) {
                    if (item.key === data) {
                        return item;
                    }
                });
                return discrepancyName.name;
            },
                toJSON = function () {
                    return Utils.toJSONForXML(this);
                };
            return {
                addDiscrepancy:addDiscrepancy,
                removeDiscrepancy:removeDiscrepancy,
                getDiscrepancyName: getDiscrepancyName,
                toJSON: toJSON
            }
        }();

        return Discrepancies;

    });