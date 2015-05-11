define('babh/ForageCombinedMaterialCountData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageCombinedMaterialCountTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageCombinedMaterialCountTypes) {

        var ForageCombinedMaterialCountData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Производство  на комбинирани фуражи, съдържащи само фуражни суровини, предназначени за пазара';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1170';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageCombinedMaterialCountTypes = ko.observable(new ForageCombinedMaterialCountTypes());
            this.forageCombinedMaterialCountTypes.title = "Вид комбинирани фуражи според съдържанието на фуражни суровини";
        }

        ForageCombinedMaterialCountData.prototype = function () {
            toJSON = function () {
                if (this.forageCombinedMaterialCountTypes !== undefined &&
                   this.forageCombinedMaterialCountTypes.forageCombinedMaterialCountType !== undefined &&
                   this.forageCombinedMaterialCountTypes.forageCombinedMaterialCountType.length === 0) {
                    this.forageCombinedMaterialCountTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageCombinedMaterialCountData;

    });