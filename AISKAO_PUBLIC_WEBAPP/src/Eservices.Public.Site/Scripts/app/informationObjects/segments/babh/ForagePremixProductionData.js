define('babh/ForagePremixProductionData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForagePremixTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForagePremixTypes) {

        var ForagePremixProductionData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Производство на премикси, изготвени на основата на фуражни добавки, предназначени за пазара';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1162';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.foragePremixTypes = ko.observable(new ForagePremixTypes());
            this.foragePremixTypes.title = "Вид премикси, изготвени на основата на фуражни добавки";

        }

        ForagePremixProductionData.prototype = function () {
            toJSON = function () {
                if (this.foragePremixTypes !== undefined &&
                   this.foragePremixTypes.foragePremixType !== undefined &&
                   this.foragePremixTypes.foragePremixType.length === 0) {
                    this.foragePremixTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForagePremixProductionData;

    });