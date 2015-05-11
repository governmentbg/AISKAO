define('babh/AnimalObjectAnimalPurposes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'babh/AnimalObjectAnimalPurpose'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        AnimalObjectAnimalPurpose) {

        var AnimalObjectAnimalPurposes = function () {

            this.animalObjectAnimalPurpose = ko.observableArray();
            this.animalObjectAnimalPurpose.animalLists = ko.observableArray([]);
            datacontext.getAnimalPurposes(this.animalObjectAnimalPurpose.animalLists);

            this.animalObjectAnimalPurpose.nomAnimalPurposes = ko.computed(function () {
                var self = this,
                    newArray = [];
                ko.utils.arrayForEach(self.animalObjectAnimalPurpose.animalLists(), function (item) {
                    var newItem = {
                        code: item.code,
                        name: item.name
                    };
                    newItem.selectedAnimalPurpose = ko.observable();
                    ko.utils.arrayFirst(self.animalObjectAnimalPurpose(), function (checkedItem) {
                        if (newItem.code() == checkedItem.animalPurposeCode()) {
                            newItem.selectedAnimalPurpose(checkedItem);
                            return newItem;
                        }
                    });
                    newArray.push(newItem);
                });
                return newArray;
            }, this);
        }

        AnimalObjectAnimalPurposes.prototype = function () {
            var createAnimalObjectAnimalPurpose = function () {
                return new AnimalObjectAnimalPurpose();
            },
            addAnimalObjectAnimalPurpose = function (data, selectedItem) {
                var selectedAnimalPurpose = ko.utils.arrayFirst(data.animalObjectAnimalPurpose(), function (item) {
                    return item.animalPurposeCode() == selectedItem.code()
                });
                if (!selectedAnimalPurpose) {
                    selectedAnimalPurpose = new AnimalObjectAnimalPurpose();
                    selectedAnimalPurpose.animalPurposeCode(selectedItem.code());
                    selectedAnimalPurpose.animalPurposeName(selectedItem.name());
                    data.animalObjectAnimalPurpose.push(selectedAnimalPurpose);
                    selectedItem.selectedAnimalPurpose(selectedAnimalPurpose);
                } else {
                    ko.utils.arrayRemoveItem(data.animalObjectAnimalPurpose(), selectedAnimalPurpose);
                    selectedItem.selectedAnimalPurpose(undefined);
                }
                return true;
            },

            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                createAnimalObjectAnimalPurpose: createAnimalObjectAnimalPurpose,
                addAnimalObjectAnimalPurpose: addAnimalObjectAnimalPurpose,
                toJSON: toJSON
            }
        }();

        return AnimalObjectAnimalPurposes;

    });