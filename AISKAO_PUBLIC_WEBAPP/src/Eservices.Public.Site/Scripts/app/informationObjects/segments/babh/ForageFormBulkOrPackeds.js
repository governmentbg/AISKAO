define('babh/ForageFormBulkOrPackeds',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageFormBulkOrPackeds = function () {

            this.forageFormBulkOrPacked = ko.observableArray([]);
            this.forageFormBulkOrPacked.nomForageFormBulkOrPackeds = ko.observable(Enums.forageFormBulkOrPackeds);
        }

        ForageFormBulkOrPackeds.prototype = function () {
            var getForageFormBulkOrPackedName = function (data) {
                var forageName = ko.utils.arrayFirst(Enums.forageFormBulkOrPackeds, function (item) {
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
                getForageFormBulkOrPackedName: getForageFormBulkOrPackedName,
                toJSON: toJSON
            }
        }();

        return ForageFormBulkOrPackeds;

    });