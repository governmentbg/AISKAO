define('babh/ForageMaterialAnimalOriginCalciumPhosphate',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageFormBulkOrPackeds'],
    function (ko, Utils,
        gp,
        Enums,
        ForageFormBulkOrPackeds) {

        var ForageMaterialAnimalOriginCalciumPhosphate = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражни суровини от животински произход - дикалциев/трикалциев фосфат от животински произход';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1319';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageFormBulkOrPackeds = ko.observable(new ForageFormBulkOrPackeds());
        }

        ForageMaterialAnimalOriginCalciumPhosphate.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageMaterialAnimalOriginCalciumPhosphate;

    });