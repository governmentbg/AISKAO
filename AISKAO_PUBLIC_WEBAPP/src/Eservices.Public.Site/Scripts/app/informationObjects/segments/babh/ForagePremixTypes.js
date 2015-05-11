define('babh/ForagePremixTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForagePremixTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
           // this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.foragePremixType = ko.observableArray([]);
            this.foragePremixType.nomForagePremixTypes = ko.observable(Enums.foragePremixTypes);
            this.foragePremixType.title = "Вид премикси, изготвени на основата на фуражни добавки";
            //this.foragePremixType.extend({
            //    fieldIsFromEnum: {
            //        field: this.foragePremixType,
            //        nomenclatureTitle: 'Номенклатура на видове премикси, изготвени на основата на фуражни добавки',
            //        nomenclatureValues: Enums.foragePremixTypes
            //    }
            //});
        }

        ForagePremixTypes.prototype = function () {
            var getForagePremixTypeName = function (data) {
                var forageName = ko.utils.arrayFirst(Enums.foragePremixTypes, function (item) {
                    if (item.key === data) {
                        return item;
                    }
                });
                return forageName.name;
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                getForagePremixTypeName: getForagePremixTypeName,
                toJSON: toJSON
            }
        }();

        return ForagePremixTypes;

    });