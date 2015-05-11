define('regix/BulstatStatusType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var BulstatStatusType = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT';
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

            this.state = ko.observable();
            this.state.title = "Статус  - (валиден/невалиден ЕИК,фирмата е закрита, преобразувана т.н.)";

        }

        BulstatStatusType.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return BulstatStatusType;

    });