define('regix/ValidUICRequest',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ValidUICRequest = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Валидност на ЕИК номер';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR/ValidUICRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    uic: 'UIC'
                }
            };

            this.uic = ko.observable();
            this.uic.title = 'ЕИК';

        }

        ValidUICRequest.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ValidUICRequest;

    });