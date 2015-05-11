define('babh/ForageTradingTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageTradingTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageTradingType = ko.observableArray([]);
            this.forageTradingType.nomForageTradingTypes = ko.observable(Enums.forageTradingTypes);
            this.forageTradingType.title = "Вид фуражи за търговия";
            //this.forageTradingType.extend({
            //    fieldIsFromEnum: {
            //        field: this.forageTradingType,
            //        nomenclatureTitle: 'Номенклатура за видове фуражи за търговия',
            //        nomenclatureValues: Enums.forageTradingTypes
            //    }
            //});
        }

        ForageTradingTypes.prototype = function () {
            var getForageTradingTypeName = function (data) {
                var forageName = ko.utils.arrayFirst(Enums.forageTradingTypes, function (item) {
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
                getForageTradingTypeName: getForageTradingTypeName,
                toJSON: toJSON
            }
        }();

        return ForageTradingTypes;

    });