define('babh/ForageSupplementTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageSupplementTypes = function () {
            this.forageSupplementType = ko.observableArray([]);
            this.forageSupplementType.nomForageSupplementTypes = Enums.forageSupplementTypes;

            //this.forageSupplementType.extend({
            //    fieldIsFromEnum: {
            //        field: this.forageSupplementType,
            //        nomenclatureTitle: 'Номенклатура за видове фуражни добавки',
            //        nomenclatureValues: Enums.forageSupplementTypes
            //    }
            //});
        }

        ForageSupplementTypes.prototype = function () {
            var getForageSupplementTypeName = function (data) {
               var forageName = ko.utils.arrayFirst(Enums.forageSupplementTypes, function (item) {
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
                getForageSupplementTypeName: getForageSupplementTypeName, 
                toJSON: toJSON
            }
        }();

        return ForageSupplementTypes;

    });