define('regix/ValidUICResponse',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/StatusType',
    'regix/LegalFormType'],
    function (ko, Utils,
        gp,
        Enums,
        StatusType,
        LegalFormType) {

        var ValidUICResponse = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Валидност на ЕИК номер';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR/ValidUICResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.status = ko.observable(new StatusType());
            this.status.title = 'Статус на партида';

            this.uic = ko.observable();
            this.uic.title = "Код на поле:00010 - ЕИК";

            this.company = ko.observable();
            this.company.title = "Код на поле:00020 - Фирма";

            this.legalForm = ko.observable(new LegalFormType());
            this.legalForm.title = "Код на поле:00030 - Правна форма";

            this.dataValidForDate = ko.observable();
            this.dataValidForDate.title = "Дата на валидност на данните";
            this.dataValidForDate.extend({
                fieldIsDate: {
                    field: this.dataValidForDate
                }
            });
        }

        ValidUICResponse.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ValidUICResponse;

    });