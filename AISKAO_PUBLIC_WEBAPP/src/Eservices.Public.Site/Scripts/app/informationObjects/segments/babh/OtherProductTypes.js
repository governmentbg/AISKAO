define('babh/OtherProductTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var OtherProductTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.otherProductType = ko.observableArray([]);
            this.otherProductType.nomOtherProductType = ko.observable(Enums.otherProductTypes);
            this.otherProductType.title = "Вид други странични животински продукти";
        }

        OtherProductTypes.prototype = function () {
            var getOtherProductTypeName = function (data) {
                var productName = ko.utils.arrayFirst(Enums.otherProductTypes, function (item) {
                    if (item.key == data) {
                        return item;
                    }
                });
                return productName.name;
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                getOtherProductTypeName: getOtherProductTypeName,
                toJSON: toJSON
            }
        }();

        return OtherProductTypes;

    });