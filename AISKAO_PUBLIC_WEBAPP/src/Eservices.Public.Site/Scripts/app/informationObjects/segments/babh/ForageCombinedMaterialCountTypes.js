define('babh/ForageCombinedMaterialCountTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageCombinedMaterialCountTypes = function () {

            this.forageCombinedMaterialCountType = ko.observableArray([]);
            this.forageCombinedMaterialCountType.nomForageCombinedMaterialCountTypes = ko.observable(Enums.forageCombinedMaterialCountTypes);
            this.forageCombinedMaterialCountType.title = "Вид комбинирани фуражи според съдържанието на фуражни суровини";
            //this.forageCombinedMaterialCountType.extend({
            //    fieldIsFromEnum: {
            //        field: this.forageCombinedMaterialCountType,
            //        nomenclatureTitle: 'Номенклатура за видове комбинирани фуражи, съдържащи само фуражни суровини',
            //        nomenclatureValues: Enums.forageCombinedMaterialCountTypes
            //    }
            //});
        }

        ForageCombinedMaterialCountTypes.prototype = function () {
            var getForageCombinedMaterialCountTypeName = function (data) {
                var forageName = ko.utils.arrayFirst(this.forageCombinedMaterialCountType.nomForageCombinedMaterialCountTypes(), function (item) {
                    if (item.key == data) {
                        return item;
                    }
                });
                return forageName.name;
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                getForageCombinedMaterialCountTypeName: getForageCombinedMaterialCountTypeName,
                toJSON: toJSON
            }
        }();

        return ForageCombinedMaterialCountTypes;

    });

