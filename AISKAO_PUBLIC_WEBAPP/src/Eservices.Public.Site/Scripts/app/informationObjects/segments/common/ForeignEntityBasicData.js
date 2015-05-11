define('common/ForeignEntityBasicData',
    ['ko', 'Utils', 'dataPackages/datacontext', 'GlobalParameters'],
    function (ko, Utils, datacontext, gp) {

        var ForeignEntityBasicData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Основни данни за чуждестранно юридическо лице';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000014';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    countryCode: 'CountryISO3166TwoLetterCode',
                    countryName: 'CountryNameCyrillic'
                }
            };

            this.foreignEntityName = ko.observable();
            this.foreignEntityName.title = 'Наименование на чуждестранно юридическо лице';
            this.foreignEntityName.extend({
                fieldIsRequired: {
                    field: this.foreignEntityName,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.countryCode = ko.observable();
            this.countryCode.nomCountries = ko.observableArray();
            this.countryCode.selectedCountry = ko.observable();

            this.countryCode.subscribe(this.initCountry, this);
            this.countryCode.isLoaded = ko.observable(false);
            var self = this;
            datacontext.getCountries(this.countryCode.nomCountries)
            .then(function () {
                self.countryCode.isLoaded(true);
            });

            //this.countryCode.selectedCountry.subscribe(this.changeCountry, this);
            this.countryCode.subscribtion = this.countryCode.selectedCountry.subscribe(this.changeCountry, this);
            this.countryCode.title = 'Двубуквен код на държава';
            this.countryCode.extend({
                fieldIsRequired: {
                    field: this.countryCode,
                    sectionTitle: this._settings.sectionTitle
                },
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
                    field: this.countryCode,
                    fieldTitle: 'name',
                    standard: 'ISO 3166-1',
                    standardValues: this.countryCode.nomCountries
                }
            });

            this.foreignEntityRegister = ko.observable();
            this.foreignEntityIdentifier = ko.observable();
            this.foreignEntityOtherData = ko.observable();

            this.foreignEntityRegister.extend({
                fieldsForForeignEntityID: {
                    registerName: this.foreignEntityRegister,
                    registerID: this.foreignEntityIdentifier,
                    otherData: this.foreignEntityOtherData
                }
            });
            this.foreignEntityIdentifier.extend({
                fieldsForForeignEntityID: {
                    registerName: this.foreignEntityRegister,
                    registerID: this.foreignEntityIdentifier,
                    otherData: this.foreignEntityOtherData
                }
            });
            this.foreignEntityOtherData.extend({
                fieldsForForeignEntityID: {
                    registerName: this.foreignEntityRegister,
                    registerID: this.foreignEntityIdentifier,
                    otherData: this.foreignEntityOtherData
                }
            });
        }

        ForeignEntityBasicData.prototype = function () {
            var initCountry = function () {
                if (gp.isLoadingDocument === true) {         
                    var self = this;
                    var cCode = this.countryCode();
                    if (cCode) {
                        self.countryCode.isLoaded(true);
                        datacontext.getCountries(self.countryCode.nomCountries)
                        .then(function () {
                            self.countryCode.subscribtion.dispose();        
                            self.countryCode.isLoaded(false);
                            self.countryCode.selectedCountry(ko.utils.arrayFirst(self.countryCode.nomCountries(), function (item) {
                                if (item.code && item.code() === cCode) {
                                    return item;
                                }
                            }));
                            self.countryCode.selectedCountry.subscribe(self.changeCountry, self);
                        });
                    }
                }
            },
            changeCountry = function (newValue) {
                if (gp.isLoadingDocument === false) {
                    if (newValue) {
                        this.countryCode(newValue.code());
                        this.countryName(newValue.name());
                    }
                    
                }
            },
                toJSON = function () {
                    return Utils.toJSONForXML(this, this._settings.options);
                };
            return {
                toJSON: toJSON,
                initCountry: initCountry,
                changeCountry: changeCountry
            }
        }();

        return ForeignEntityBasicData;

    }
);
