define('regix/ValidBulstatResponse',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/BulstatStatusType',
    'regix/ValidBulstatInfoType'],
    function (ko, Utils,
        gp,
        Enums,
        BulstatStatusType,
        ValidBulstatInfoType) {

        var ValidBulstatResponse = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Валидност на БУЛСТАТ ЕИК номер';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT/ValidBulstatResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.bulstatStatus = ko.observable(new BulstatStatusType());
            this.bulstatStatus.title = 'Статус';

            this.validBulstatInfo = ko.observable(new ValidBulstatInfoType());
            this.validBulstatInfo.title = "Справка за валидност на БУЛСТАТ ЕИК номер";
        }

        ValidBulstatResponse.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ValidBulstatResponse;

    });