define('babh/BloodProductsTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var BloodProductsTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.bloodProductsType = ko.observableArray([]);
            this.bloodProductsType.nomBloodProductsTypes = ko.observable(Enums.bloodProductsTypes);
            this.bloodProductsType.title = "Вид кръвни продукти";
        }

        BloodProductsTypes.prototype = function () {
            var getBloodProductsTypeName = function (data) {
                var bloodName = ko.utils.arrayFirst(Enums.bloodProductsTypes, function (item) {
                    if (item.key == data) {
                        return item;
                    }
                });
                return bloodName.name;
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                getBloodProductsTypeName: getBloodProductsTypeName,
                toJSON: toJSON
            }
        }();

        return BloodProductsTypes;

    });