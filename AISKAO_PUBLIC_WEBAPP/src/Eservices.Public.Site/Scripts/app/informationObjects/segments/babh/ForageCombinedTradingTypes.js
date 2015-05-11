define('babh/ForageCombinedTradingTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageCombinedTradingTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };
            this.forageCombinedTradingType = ko.observableArray([]);
            this.forageCombinedTradingType.nomForageCombinedTradingType = Enums.forageCombinedTradingTypes;
            this.forageCombinedTradingType.title = "Търговия с комбинирани фуражи";

            //this.forageCombinedTradingType.extend({
            //    fieldIsFromEnum: {
            //        field: this.forageCombinedTradingType,
            //        nomenclatureTitle: 'Номенклатура за видове комбинирани фуражи за търговия',
            //        nomenclatureValues: Enums.forageCombinedTradingTypes
            //    }
            //});
        }

        ForageCombinedTradingTypes.prototype = function () {
            var getForageCombinedTradingTypeName = function (data) {
                var forageName = ko.utils.arrayFirst(this.forageCombinedTradingType.nomForageCombinedTradingType, function (item) {
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
                getForageCombinedTradingTypeName: getForageCombinedTradingTypeName,
                toJSON: toJSON
            }
        }();

        return ForageCombinedTradingTypes;

    });