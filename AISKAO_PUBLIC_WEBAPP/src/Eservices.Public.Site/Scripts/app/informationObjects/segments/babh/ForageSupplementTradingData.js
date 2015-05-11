define('babh/ForageSupplementTradingData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageSupplementTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageSupplementTypes) {

        var ForageSupplementTradingData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Търговия с фуражни добавки';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1190';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageSupplementTypes = ko.observable(new ForageSupplementTypes());
            this.forageSupplementTypes.title = "Търговия с фуражни добавки";
        }


        ForageSupplementTradingData.prototype = function () {
            toJSON = function () {
                if (this.forageSupplementTypes !== undefined &&
                    this.forageSupplementTypes.forageSupplementType !== undefined &&
                    this.forageSupplementTypes.forageSupplementType.length === 0) {
                    this.forageSupplementTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageSupplementTradingData;

    });