define('babh/ForageCombinedSupplementPremixTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageCombinedSupplementPremixTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageCombinedSupplementPremixType = ko.observableArray([]);
            this.forageCombinedSupplementPremixType.nomForageCombinedSupplementPremixTypes = ko.observable(Enums.forageCombinedSupplementPremixTypes);
            this.forageCombinedSupplementPremixType.title = "Вид комбинирани фуражи, съдържащи фуражни добавки и/или премикси";
            //this.forageCombinedSupplementPremixType.extend({
            //    fieldIsFromEnum: {
            //        field: this.forageCombinedSupplementPremixType,
            //        nomenclatureTitle: 'Номенклатура за видове комбинирани фуражи, съдържащи фуражни добавки и/или премикси',
            //        nomenclatureValues: Enums.forageCombinedSupplementPremixTypes
            //    }
            //});
        }

        ForageCombinedSupplementPremixTypes.prototype = function () {
            var getForageCombinedSupplementPremixTypeName = function (data) {
                var forageName = ko.utils.arrayFirst(Enums.forageCombinedSupplementPremixTypes, function (item) {
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
                getForageCombinedSupplementPremixTypeName: getForageCombinedSupplementPremixTypeName,
                toJSON: toJSON
            }
        }();

        return ForageCombinedSupplementPremixTypes;

    });