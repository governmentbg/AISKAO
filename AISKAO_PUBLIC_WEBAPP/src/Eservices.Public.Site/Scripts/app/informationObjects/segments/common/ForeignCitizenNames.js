define('common/ForeignCitizenNames',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var ForeignCitizenNames = function () {

            this._settings = {};
            this._settings.sectionTitle = 'Имена на физическо лице, нерегистрирано по българското законодателство';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000007';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.firstCyrillic = ko.observable();
            this.firstCyrillic.title = 'Собствено име на физическо лице, нерегистрирано по българското законодателство';
            this.firstCyrillic.extend({
                fieldCharsAllowed: {
                    field: this.firstCyrillic,
                    charsAllowed: 'букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                }
            });
            this.firstCyrillic.subscribe(this.changeFirstCyrilicValue, this);
            this.lastCyrillic = ko.observable();
            this.lastCyrillic.title = 'Фамилно име на физическо лице, нерегистрирано по българското законодателство';
            this.lastCyrillic.extend({
                fieldCharsAllowed: {
                    field: this.lastCyrillic,
                    charsAllowed: 'букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                }
            });
            this.otherCyrillic = ko.observable();
            this.otherCyrillic.title = 'Други имена на физическо лице, нерегистрирано по българското законодателство';
            this.otherCyrillic.extend({
                fieldCharsAllowed: {
                    field: this.otherCyrillic,
                    charsAllowed: 'букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                }
            });
            this.pseudonimCyrillic = ko.observable();
            this.pseudonimCyrillic.title = 'Псевдоним на физическо лице, нерегистрирано по българското законодателство';
            this.pseudonimCyrillic.extend({
                fieldCharsAllowed: {
                    field: this.pseudonimCyrillic,
                    charsAllowed: 'букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                }
            });

            this.firstLatin = ko.observable();
            this.firstLatin.title = 'Собствено име на латиница на физическо лице, нерегистрирано по българското законодателство';
            this.firstLatin.extend({
                fieldCharsAllowed: {
                    field: this.firstLatin,
                    charsAllowed: 'букви на латиница и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[A-Za-z]+([' -][A-Za-z]+)*$"
                }
            });
            this.firstLatin.subscribe(this.changeFirstLatinValue, this);
            this.lastLatin = ko.observable();
            this.lastLatin.title = 'Фамилно име на латиница на физическо лице, нерегистрирано по българското законодателство';
            this.lastLatin.extend({
                fieldCharsAllowed: {
                    field: this.lastLatin,
                    charsAllowed: 'букви на латиница и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[A-Za-z]+([' -][A-Za-z]+)*$"
                }
            });
            this.otherLatin = ko.observable();
            this.otherLatin.title = 'Други имена на латиница на физическо лице, нерегистрирано по българското законодателство';
            this.otherLatin.extend({
                fieldCharsAllowed: {
                    field: this.otherLatin,
                    charsAllowed: 'букви на латиница и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[A-Za-z]+([' -][A-Za-z]+)*$"
                }
            });
            this.pseudonimLatin = ko.observable();
            this.pseudonimLatin.title = 'Псевдоним на латиница на физическо лице, нерегистрирано по българското законодателство';
            this.pseudonimLatin.extend({
                fieldCharsAllowed: {
                    field: this.pseudonimLatin,
                    charsAllowed: 'букви на латиница и символите интервал, ‘ (апостроф) и – (тире)',
                    pattern: "^[A-Za-z]+([' -][A-Za-z]+)*$"
                }
            });


            this.firstCyrillic.extend({
                requiredOneOfFields: {
                    fields: [this.firstCyrillic, this.firstLatin],
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.firstLatin.extend({
                requiredOneOfFields: {
                    fields: [this.firstCyrillic, this.firstLatin],
                    sectionTitle: this._settings.sectionTitle
                }
            });
        }

        ForeignCitizenNames.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            },
                changeFirstCyrilicValue = function () {
                    var self = this;
                    if (this.firstCyrillic() !== undefined && this.firstCyrillic() !== null && this.firstCyrillic() !== '') {
                        this.lastCyrillic.extend({
                            requiredOneOfFields: {
                                params: {
                                    fields: [this.lastCyrillic, this.otherCyrillic],
                                    sectionTitle: this._settings.sectionTitle
                                },
                                onlyIf: function () {
                                    return self.firstCyrillic() !== undefined && self.firstCyrillic() != "";
                                }
                            }
                        });
                        this.otherCyrillic.extend({
                            requiredOneOfFields: {
                                params: {
                                    fields: [this.lastCyrillic, this.otherCyrillic],
                                    sectionTitle: this._settings.sectionTitle
                                },
                                onlyIf: function () {
                                    return self.firstCyrillic() !== undefined && self.firstCyrillic() != "";
                                }
                            }
                        });
                    }
                },
                changeFirstLatinValue = function () {
                    var self = this;
                    if (this.firstLatin() !== undefined && this.firstLatin() !== null && this.firstLatin() !== '') {
                        this.lastLatin.extend({
                            requiredOneOfFields: {
                                params: {
                                    fields: [this.lastLatin, this.otherLatin],
                                    sectionTitle: this._settings.sectionTitle
                                },
                                onlyIf: function () {
                                    return self.firstLatin() !== undefined && self.firstLatin() != "";
                                }
                            }
                        });
                        this.otherLatin.extend({
                            requiredOneOfFields: {
                                params: {
                                    fields: [this.lastLatin, this.otherLatin],
                                    sectionTitle: this._settings.sectionTitle
                                },
                                onlyIf: function () {
                                    return self.firstLatin() !== undefined && self.firstLatin() != "";
                                }
                            }
                        });
                    }
                };
            return {
                toJSON: toJSON,
                changeFirstCyrilicValue: changeFirstCyrilicValue,
                changeFirstLatinValue: changeFirstLatinValue
            }
        }();

        return ForeignCitizenNames;

    }
);