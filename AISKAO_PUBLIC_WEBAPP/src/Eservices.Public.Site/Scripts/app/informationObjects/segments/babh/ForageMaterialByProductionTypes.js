define('babh/ForageMaterialByProductionTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageMaterialByProductionTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageMaterialByProductionType = ko.observableArray([]);
            this.forageMaterialByProductionType.nomForageMaterialByProductionTypes = ko.observable(Enums.forageMaterialByProductionTypes);
            this.forageMaterialByProductionType.title = "Вид фуражни суровини";
            //this.forageMaterialByProductionType.extend({
            //    fieldIsFromEnum: {
            //        field: this.forageMaterialByProductionType,
            //        nomenclatureTitle: 'Номенклатура за видове фуражни суровини съгласно Каталога на фуражните суровини, изготвен в съответствие с чл. 24 на Регламент (ЕО) № 767/2009',
            //        nomenclatureValues: Enums.forageMaterialByProductionTypes
            //    }
            //});
        }

        ForageMaterialByProductionTypes.prototype = function () {
            var getForageMaterialByProductionTypeName = function (data) {
                var forageName = ko.utils.arrayFirst(Enums.forageMaterialByProductionTypes, function (item) {
                      if (item.key === data) {
                          return item;
                      }
                  });
                  return forageName.name;
              },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                getForageMaterialByProductionTypeName: getForageMaterialByProductionTypeName,
                toJSON: toJSON
            }
        }();

        return ForageMaterialByProductionTypes;

    });