define('babh/ForageMaterialNames',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var ForageMaterialNames = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageMaterialName = ko.observableArray();
            this.forageMaterialName.itemToAdd = ko.observable();
        }

        ForageMaterialNames.prototype = function () {
            var addForageMaterialName = function () {
                if (this.forageMaterialName.itemToAdd() != undefined && this.forageMaterialName.itemToAdd() != "" && ko.utils.arrayIndexOf(this.forageMaterialName(), this.forageMaterialName.itemToAdd()) < 0) {
                    // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                    this.forageMaterialName.push(this.forageMaterialName.itemToAdd());
                    // Clears the text box, because it's bound to the "itemToAdd" observable
                    this.forageMaterialName.itemToAdd("");
                }
            },
             removeForageMaterialName = function (value) {
                 this.forageMaterialName.remove(value);
             },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                addForageMaterialName: addForageMaterialName,
                removeForageMaterialName: removeForageMaterialName,
                toJSON: toJSON
            }
        }();

        return ForageMaterialNames;

    });