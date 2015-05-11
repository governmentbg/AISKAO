define('regix/ValidBulstatRequest',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ValidBulstatRequest = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Справка за валидност на БУЛСТАТ ЕИК номер';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT/ValidBulstatRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.bulstat = ko.observable();
            this.bulstat.title = 'БУЛСТАТ ЕИК';
            this.bulstat.extend({
                fieldIsValidBULSTAT: {
                    field: this.bulstat
                }
            });
        }

        ValidBulstatRequest.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ValidBulstatRequest;

    });