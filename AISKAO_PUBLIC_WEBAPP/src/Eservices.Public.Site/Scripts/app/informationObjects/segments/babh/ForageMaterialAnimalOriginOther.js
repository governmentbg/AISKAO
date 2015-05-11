define('babh/ForageMaterialAnimalOriginOther',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageFormTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageFormTypes) {

        var ForageMaterialAnimalOriginOther = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражни суровини от животински произход - други';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1325';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageFormTypes = ko.observable(new ForageFormTypes());
        }

        ForageMaterialAnimalOriginOther.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageMaterialAnimalOriginOther;

    });