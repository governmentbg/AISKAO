define('babh/RevisedAnimalProteinTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/BABHAnimalObjectData'],
    function (ko, Utils,
        gp,
        Enums,
        BABHAnimalObjectData) {

        var RevisedAnimalProteinTypes = function () {

            this.revisedAnimalProteinType = ko.observableArray([]);
            this.revisedAnimalProteinType.nomRevisedAnimalProteinTypes = ko.observable(Enums.revisedAnimalProteinTypes);
            this.revisedAnimalProteinType.title = "Вид преработени животински протеини";
        }

        RevisedAnimalProteinTypes.prototype = function () {
            var getRevisedAnimalProteinTypeName = function (data) {
                var proteinName = ko.utils.arrayFirst(Enums.revisedAnimalProteinTypes, function (item) {
                    if (item.key == data) {
                        return item;
                    }
                });
                return proteinName.name;
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                getRevisedAnimalProteinTypeName: getRevisedAnimalProteinTypeName,
                toJSON: toJSON
            }
        }();

        return RevisedAnimalProteinTypes;

    });