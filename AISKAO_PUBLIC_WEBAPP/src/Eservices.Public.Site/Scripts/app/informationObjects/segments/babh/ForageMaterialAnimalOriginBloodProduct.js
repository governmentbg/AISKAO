define('babh/ForageMaterialAnimalOriginBloodProduct',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageFormBulkOrPackeds'],
    function (ko, Utils,
        gp,
        Enums,
        ForageFormBulkOrPackeds) {

        var ForageMaterialAnimalOriginBloodProduct = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражни суровини от животински произход - кръвни продукти';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1315';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageFormBulkOrPackeds = ko.observable(new ForageFormBulkOrPackeds());
        }

        ForageMaterialAnimalOriginBloodProduct.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageMaterialAnimalOriginBloodProduct;

    });