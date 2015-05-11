define('regix/ActualStateRequest',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ActualStateRequest = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Справка за актуално състояние';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR/ActualStateRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    uic: 'UIC'
                }
            };

            this.uic = ko.observable();
            this.uic.title = "ЕИК";
        }

        ActualStateRequest.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ActualStateRequest;

    });