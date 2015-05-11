define('babh/ForageCombinedSupplementPremixData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageCombinedSupplementPremixTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageCombinedSupplementPremixTypes) {

        var ForageCombinedSupplementPremixData = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1180';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageCombinedSupplementPremixTypes = ko.observable(new ForageCombinedSupplementPremixTypes());
            this.forageCombinedSupplementPremixTypes.title = "Вид комбинирани фуражи, съдържащи фуражни добавки и/или премикси";
        }

        ForageCombinedSupplementPremixData.prototype = function () {
            toJSON = function () {
                if (this.forageCombinedSupplementPremixTypes !== undefined &&
                   this.forageCombinedSupplementPremixTypes.forageCombinedSupplementPremixType !== undefined &&
                   this.forageCombinedSupplementPremixTypes.forageCombinedSupplementPremixType.length === 0) {
                    this.forageCombinedSupplementPremixTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageCombinedSupplementPremixData;

    });