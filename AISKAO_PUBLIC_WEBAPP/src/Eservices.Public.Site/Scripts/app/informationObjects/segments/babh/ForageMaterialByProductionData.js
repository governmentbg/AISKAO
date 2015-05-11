define('babh/ForageMaterialByProductionData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageMaterialByProductionTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageMaterialByProductionTypes) {

        var ForageMaterialByProductionData = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1188';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageMaterialByProductionTypes = ko.observable(new ForageMaterialByProductionTypes());
            this.forageMaterialByProductionTypes.title = "Вид фуражни суровини";
        }

        ForageMaterialByProductionData.prototype = function () {
            toJSON = function () {
                if (this.forageMaterialByProductionTypes !== undefined &&
                   this.forageMaterialByProductionTypes.forageMaterialByProductionType !== undefined &&
                   this.forageMaterialByProductionTypes.forageMaterialByProductionType.length === 0) {
                    this.forageMaterialByProductionTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageMaterialByProductionData;

    });