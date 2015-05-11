define('common/ForeignCitizenPlaceOfBirth',
    ['ko', 'Utils', 'dataPackages/datacontext', 'GlobalParameters'],
    function (ko, Utils, datacontext, gp) {

        var ForeignCitizenPlaceOfBirth = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Място на раждане на физическо лице, нерегистрирано по българското законодателство';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000009';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.countryCode = ko.observable();
            this.countryCode.title = 'Двубуквен код на държава';
            this.countryCode.nomCountries = ko.observableArray();
            this.countryCode.selectedCountry = ko.observable();
            this.countryCode.isLoading = ko.observable(false);
            this.countryCode.subscribe(this.initCountry, this);
            var self = this;
            self.countryCode.isLoading(true);
            datacontext.getCountries(this.countryCode.nomCountries)
            .then(function () {
                self.countryCode.isLoading(false);
            });

            this.countryCode.subscribtion = this.countryCode.selectedCountry.subscribe(this.changePlaceOfBirth, this);
            this.countryCode.extend({
                fieldIsFromStandard: {
                    field: this.countryCode,
                    fieldTitle: 'code',
                    standard: 'ISO 3166-1',
                    standardValues: this.countryCode.nomCountries
                }
            });

            this.countryName = ko.observable();
            this.countryName.title = 'Държава';
            this.countryName.extend({
                fieldIsRequired: {
                    field: this.countryName,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromStandard: {
                    field: this.countryName,
                    fieldTitle: 'name',
                    standard: 'ISO 3166-1',
                    standardValues: this.countryCode.nomCountries
                }
            });
            this.settlementName = ko.observable();
            this.settlementName.extend({
                fieldCharsAllowed: {
                    field: this.settlementName,
                    charsAllowed: 'букви на кирилица',
                    pattern: "^[А-Яа-я]+([' -][А-Яа-я]+)*$"
                },
            });
        }
        ForeignCitizenPlaceOfBirth.prototype = function () {
            var initCountry = function () {
                if (gp.isLoadingDocument === true) {
                    var self = this;
                    var cCode = self.countryCode();
                    if (cCode) {
                        self.countryCode.isLoading(true);
                        datacontext.getCountries(self.countryCode.nomCountries)
                                .then(function () {
                                    self.countryCode.subscribtion.dispose();
                                    self.countryCode.isLoading(false);
                                    self.countryCode.selectedCountry(ko.utils.arrayFirst(self.countryCode.nomCountries(), function (item) {
                                        if (item.code && item.code() === cCode) {
                                            return item;
                                        }
                                    }));
                                    self.countryCode.selectedCountry.subscribe(self.changePlaceOfBirth, self);
                                });
                    }
                }
            },
                changePlaceOfBirth = function (newValue) {
                    if (gp.isLoadingDocument === false) {
                        this.countryCode(newValue.code());
                        this.countryName(newValue.name());
                    }
                },
                toJSON = function () {
                    return Utils.toJSONForXML(this, this._settings.options);
                };
            return {
                toJSON: toJSON,
                initCountry: initCountry,
                changePlaceOfBirth: changePlaceOfBirth
            }
        }();

        return ForeignCitizenPlaceOfBirth;
    }
);