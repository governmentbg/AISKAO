define('babh/ForageCombinedTradingData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageCombinedTradingTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageCombinedTradingTypes) {

        var ForageCombinedTradingData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Търговия с комбинирани фуражи';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1206';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageCombinedTradingTypes = ko.observable(new ForageCombinedTradingTypes());
            this.forageCombinedTradingTypes.title = "Вид комбинирани фуражи за търговия";
        }

        ForageCombinedTradingData.prototype = function () {
            toJSON = function () {
                if (this.forageCombinedTradingTypes !== undefined &&
                  this.forageCombinedTradingTypes.forageCombinedTradingType !== undefined &&
                  this.forageCombinedTradingTypes.forageCombinedTradingType.length === 0) {
                    this.forageCombinedTradingTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageCombinedTradingData;

    });