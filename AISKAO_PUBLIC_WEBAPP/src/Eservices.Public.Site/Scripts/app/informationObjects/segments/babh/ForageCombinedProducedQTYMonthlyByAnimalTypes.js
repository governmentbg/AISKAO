define('babh/ForageCombinedProducedQTYMonthlyByAnimalTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageCombinedProducedQTYMonthlyByAnimalType'],
    function (ko, Utils,
        gp,
        Enums, 
        ForageCombinedProducedQTYMonthlyByAnimalType) {

        var ForageCombinedProducedQTYMonthlyByAnimalTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageCombinedProducedQTYMonthlyByAnimalType = ko.observableArray([]);

        }

        ForageCombinedProducedQTYMonthlyByAnimalTypes.prototype = function () {
            var createForageCombinedProducedQTYMonthlyByAnimalType = function () {
                return new ForageCombinedProducedQTYMonthlyByAnimalType();
            },
             addForageCombinedProducedQTYMonthlyByAnimalType = function (data) {
                     this.forageCombinedProducedQTYMonthlyByAnimalType.push(new ForageCombinedProducedQTYMonthlyByAnimalType());
             },
             removeForageCombinedProducedQTYMonthlyByAnimalType = function (value) {
                     this.forageCombinedProducedQTYMonthlyByAnimalType.remove(value);
             },
                toJSON = function () {
                    return Utils.toJSONForXML(this, this._settings.options);
                };
            return {
                createForageCombinedProducedQTYMonthlyByAnimalType: createForageCombinedProducedQTYMonthlyByAnimalType,
                addForageCombinedProducedQTYMonthlyByAnimalType: addForageCombinedProducedQTYMonthlyByAnimalType,
                removeForageCombinedProducedQTYMonthlyByAnimalType: removeForageCombinedProducedQTYMonthlyByAnimalType,
                toJSON: toJSON
                }
            }();

            return ForageCombinedProducedQTYMonthlyByAnimalTypes;

        });
  