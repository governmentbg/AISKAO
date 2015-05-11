define('common/PersonNames',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var PersonNames = function () {

            this._settings = {};
            this._settings.sectionTitle = 'Имена на физическо лице';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000005';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            //properties
            this.first = ko.observable();
            this.first.title = 'Собствено име';
            this.first.extend({
                fieldIsRequired: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.first
                },
                fieldMaxLength: {
                    field: this.first,
                    maxLength: 30
                },
                fieldCharsAllowed: {
                    field: this.first,
                    charsAllowed: 'букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                }

            });

            this.middle = ko.observable();
            this.middle.title = 'Бащино име';
            this.last = ko.observable();
            this.last.title = 'Фамилно име';

            this.middle.extend({
                fieldMaxLength: {
                    field: this.middle,
                    maxLength: 30
                },
                fieldCharsAllowed: {
                    field: this.middle,
                    charsAllowed: 'букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                },
                requiredOneOfFields: {
                    fields: [this.middle, this.last],
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.last.extend({
                fieldMaxLength: {
                    field: this.last,
                    maxLength: 50
                },
                fieldCharsAllowed: {
                    field: this.last,
                    charsAllowed: 'букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                },
                requiredOneOfFields: {
                    fields: [this.middle, this.last],
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.pseudonim = ko.observable();
            this.pseudonim.title = 'Псевдоним';
            this.pseudonim.extend({
                fieldMaxLength: {
                    field: this.pseudonim,
                    maxLength: 30
                },
                fieldCharsAllowed: {
                    field: this.pseudonim,
                    charsAllowed: 'букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                }

            });
        }

        PersonNames.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return PersonNames;
    }
);