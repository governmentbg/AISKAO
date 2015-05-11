define('babh/ForageTradingWarehouseData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageTradingTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageTradingTypes) {

        var ForageTradingWarehouseData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Отдаване под наем на складови помещения с цел извършване на търговия';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1215';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageTradingTypes = ko.observable(new ForageTradingTypes());
            this.forageTradingTypes.title = "Вид фуражи за търговия";
        }

        ForageTradingWarehouseData.prototype = function () {
            toJSON = function () {
                if (this.forageTradingTypes !== undefined &&
                    this.forageTradingTypes.forageTradingType !== undefined &&
                    this.forageTradingTypes.forageTradingType.length === 0) {
                    this.forageTradingTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageTradingWarehouseData;

    });