define('babh/ForageMaterialAnimalOriginFishFlour',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageFormBulkOrPackeds'],
    function (ko, Utils,
        gp,
        Enums,
        ForageFormBulkOrPackeds) {

        var ForageMaterialAnimalOriginFishFlour = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражни суровини от животински произход - рибно брашно';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1313';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageFormBulkOrPackeds = ko.observable(new ForageFormBulkOrPackeds());
        }

        ForageMaterialAnimalOriginFishFlour.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageMaterialAnimalOriginFishFlour;

    });