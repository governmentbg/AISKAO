define('babh/ForageCombinedProducesQTYMonthlyAnimalTypeData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageCombinedProducedQTYMonthlyByAnimalTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageCombinedProducedQTYMonthlyByAnimalTypes) {

        var ForageCombinedProducesQTYMonthlyAnimalTypeData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Производство на комбинирани фуражи по видове животни и приблизителни количества в тонове за месец';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1230';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageCombinedProducedQTYMonthlyByAnimalTypes = ko.observable(new ForageCombinedProducedQTYMonthlyByAnimalTypes);
            this.forageCombinedProducedQTYMonthlyByAnimalTypes.title = "Количество в тонове на месец";
            
        }

        ForageCombinedProducesQTYMonthlyAnimalTypeData.prototype = function () {
            toJSON = function () {
                if (this.forageCombinedProducedQTYMonthlyByAnimalTypes !== undefined &&
                   (this.forageCombinedProducedQTYMonthlyByAnimalTypes.forageCombinedProducedQTYMonthlyByAnimalType == undefined ||
                   this.forageCombinedProducedQTYMonthlyByAnimalTypes.forageCombinedProducedQTYMonthlyByAnimalType.length == 0)) {
                    this.forageCombinedProducedQTYMonthlyByAnimalTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageCombinedProducesQTYMonthlyAnimalTypeData;

    });