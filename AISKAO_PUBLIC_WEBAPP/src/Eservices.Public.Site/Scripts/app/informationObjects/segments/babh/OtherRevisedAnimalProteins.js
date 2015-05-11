define('babh/OtherRevisedAnimalProteins',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var OtherRevisedAnimalProteins = function () {

            this.otherRevisedAnimalProtein = ko.observableArray();
            this.otherRevisedAnimalProtein.itemToAdd = ko.observable();
        }

        OtherRevisedAnimalProteins.prototype = function () {
            var addOtherRevisedAnimalProtein = function () {
                if (this.otherRevisedAnimalProtein.itemToAdd() != undefined && this.otherRevisedAnimalProtein.itemToAdd() != "" && ko.utils.arrayIndexOf(this.otherRevisedAnimalProtein(), this.otherRevisedAnimalProtein.itemToAdd()) < 0) {
                    // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                    this.otherRevisedAnimalProtein.push(this.otherRevisedAnimalProtein.itemToAdd());
                    // Clears the text box, because it's bound to the "itemToAdd" observable
                    this.otherRevisedAnimalProtein.itemToAdd("");
                }
            },
            removeOtherRevisedAnimalProtein = function (value) {
                this.otherRevisedAnimalProtein.remove(value);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                addOtherRevisedAnimalProtein: addOtherRevisedAnimalProtein,
                removeOtherRevisedAnimalProtein: removeOtherRevisedAnimalProtein,
                toJSON: toJSON
            }
        }();

        return OtherRevisedAnimalProteins;

    });