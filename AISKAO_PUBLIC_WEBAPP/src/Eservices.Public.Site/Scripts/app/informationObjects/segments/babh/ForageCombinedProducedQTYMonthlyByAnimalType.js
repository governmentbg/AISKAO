define('babh/ForageCombinedProducedQTYMonthlyByAnimalType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageCombinedProducedQTYMonthlyByAnimalType = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за произведени комбинирани фуражи на месец по вид животни';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1228';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.animalType = ko.observable();
            this.animalType.nomAnimalTypes = ko.observableArray(Enums.animalTypes);
            this.animalType.title = "Вид животни, за които се произвеждат комбинирани фуражи";
            this.animalType.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.animalType.subscribe(this.initAnimalType, this);
            }
            this.animalType.extend({
                fieldIsFromEnum: {
                    field: this.animalType,
                    nomenclatureTitle: 'Номенклатура за видове животни, за които се произвеждат комбинирани фуражи',
                    nomenclatureValues: Enums.animalTypes
                }
            });

            this.forageCombinedProducedQTYMonthly = ko.observable();
            this.forageCombinedProducedQTYMonthly.title = "Количество в тонове на месец";
            this.forageCombinedProducedQTYMonthly.extend({
                fieldIsGreaterThan: {
                    field: this.forageCombinedProducedQTYMonthly,
                    value: 0
                }
            });
        }

        ForageCombinedProducedQTYMonthlyByAnimalType.prototype = function () {
            var initAnimalType = function () {
                  if (gp.isLoadingDocument === true) {
                      var animalTypeCode = this.animalType();
                      if (animalTypeCode) {
                          this.animalType.displayValue(ko.utils.arrayFirst(this.animalType.nomAnimalTypes(), function (item) {
                              if (item.key === animalTypeCode) {
                                  return item;
                              }
                          }));
                      }
                  }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initAnimalType: initAnimalType,
                toJSON: toJSON
            }
        }();

        return ForageCombinedProducedQTYMonthlyByAnimalType;

    });