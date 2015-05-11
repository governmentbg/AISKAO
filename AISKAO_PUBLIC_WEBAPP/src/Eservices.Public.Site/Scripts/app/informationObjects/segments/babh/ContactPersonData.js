define('babh/ContactPersonData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ContactPersonData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за лице за контакт за провеждане на проверка';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1037';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.contactPersonFirstName = ko.observable();
            this.contactPersonFirstName.title = "Собствено име на лице за контакт за провеждане на проверка";
            this.contactPersonFirstName.extend({
                fieldIsRequired: {
                    field: this.contactPersonFirstName,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldMaxLength: {
                    field: this.contactPersonFirstName,
                    maxLength: 30
                },
                fieldCharsAllowed: {
                    field: this.contactPersonFirstName,
                    charsAllowed: 'букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                },
            });



            this.contactPersonLastName = ko.observable();
            this.contactPersonLastName.title = "Фамилно име на лице за контакт за провеждане на проверка";
            this.contactPersonLastName.extend({
                fieldIsRequired: {
                    field: this.contactPersonLastName,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldMaxLength: {
                    field: this.contactPersonLastName,
                    maxLength: 50
                },
                fieldCharsAllowed: {
                    field: this.contactPersonLastName,
                    charsAllowed: 'букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                },
            });

            this.contactPersonJob = ko.observable();
            this.contactPersonJob.title = "Длъжност на лице за контакт за провеждане на проверка";
            this.contactPersonJob.extend({
                fieldIsRequired: {
                    field: this.contactPersonJob,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.contactPersonPhone = ko.observable();
            this.contactPersonPhone.title = "Телефон на лице за контакт за провеждане на проверка";
            this.contactPersonPhone.extend({
                fieldIsRequired: {
                    field: this.contactPersonPhone,
                    sectionTitle: this._settings.sectionTitle
                }
            });
        }

        ContactPersonData.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ContactPersonData;

    });