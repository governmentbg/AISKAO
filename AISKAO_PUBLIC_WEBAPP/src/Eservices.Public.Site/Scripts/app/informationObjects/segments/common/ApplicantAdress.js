define('common/ApplicantAdress',
    ['ko', 'Enums', 'Utils', 'GlobalParameters', 'dataPackages/datacontext'],
    function (ko, $, Utils, gp, datacontext) {

        var ApplicantAdress = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за получаване на резултат от услуга от заявителя';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000141';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.districtCode = ko.observable();
            this.districtCode.nomDistricts = ko.observableArray();
            this.districtCode.selectedDistrict = ko.observable();
            //this.districtCode.selectedDistrict.subscribe(this.changeDistrict, this);
            this.districtCode.isLoaded = ko.observable(false);
            this.districtCode.isLoading = ko.observable(false);
            this.districtCode.subscribe(this.initDistrict, this);
            var self = this;
            self.districtCode.isLoading(true);
            datacontext.getDistricts(this.districtCode.nomDistricts)
                        .then(function () {
                            self.districtCode.isLoaded(true);
                            self.districtCode.isLoading(false);
                        });
            this.districtCode.subscribtion = this.districtCode.selectedDistrict.subscribe(this.changeDistrict, this);
            this.districtCode.title = 'Код на област';
            this.districtCode.extend({
                fieldIsRequired: {
                    field: this.districtCode,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldCharsAllowed: {
                    field: this.districtCode,
                    charsAllowed: 'главни букви на латиница',
                    pattern: "^[A-Z]{3}$"
                },
                fieldExactLength: {
                    field: this.districtCode,
                    exactLength: 3
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.districtCode,
                    dataPackField: 'code',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.districtCode.nomDistricts
                }
            });

            this.districtName = ko.observable();
            this.districtName.title = 'Област';
            this.districtName.extend({
                fieldIsRequired: {
                    field: this.districtName,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldMaxLength: {
                    field: this.districtName,
                    maxLength: 25
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.districtName,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.districtCode.nomDistricts
                }
            });

            this.municipalityCode = ko.observable();
            this.municipalityCode.nomMunicipalities = ko.observableArray();
            this.municipalityCode.selectedMunicipality = ko.observable();
            //this.municipalityCode.selectedMunicipality.subscribe(this.changeMunicipality, this);
            this.municipalityCode.isLoaded = ko.observable(false);
            this.municipalityCode.isLoading = ko.observable(false);
            this.municipalityCode.subscribe(this.initMunicipality, this);
            this.municipalityCode.subscribtion = this.municipalityCode.selectedMunicipality.subscribe(this.changeMunicipality, this);
            this.municipalityCode.title = 'Код на община';
            this.municipalityCode.extend({
                fieldIsRequired: {
                    field: this.municipalityCode,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldCharsAllowed: {
                    field: this.municipalityCode,
                    charsAllowed: 'главни букви на латиница и цифри',
                    pattern: "^[A-Z]{3}[0-9]{2}$"
                },
                fieldExactLength: {
                    field: this.municipalityCode,
                    exactLength: 5
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.municipalityCode,
                    dataPackField: 'code',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.municipalityCode.nomMunicipalities
                }
            });

            this.municipalityName = ko.observable();
            this.municipalityName.title = 'Община';
            this.municipalityName.extend({
                fieldIsRequired: {
                    field: this.municipalityName,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldMaxLength: {
                    field: this.municipalityName,
                    maxLength: 25
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.municipalityName,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.municipalityCode.nomMunicipalities
                }
            });

            this.settlementCode = ko.observable();
            this.settlementCode.nomSettlements = ko.observableArray();
            this.settlementCode.selectedSettlement = ko.observable();
            //this.settlementCode.selectedSettlement.subscribe(this.changeSettlement, this);
            this.settlementCode.isLoaded = ko.observable(false);
            this.settlementCode.isLoading = ko.observable(false);
            this.settlementCode.subscribtion = this.settlementCode.selectedSettlement.subscribe(this.changeSettlement, this);
            this.settlementCode.title = 'Код на населено място';
            this.settlementCode.extend({
                fieldIsRequired: {
                    field: this.settlementCode,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldCharsAllowed: {
                    field: this.settlementCode,
                    charsAllowed: 'главни букви на латиница и цифри',
                    pattern: "^\\d{5}$"
                },
                fieldExactLength: {
                    field: this.settlementCode,
                    exactLength: 5
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.settlementCode,
                    dataPackField: 'code',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.settlementCode.nomSettlements
                }
            });
            this.settlementName = ko.observable();
            this.settlementName.title = 'Населено място';
            this.settlementName.extend({
                fieldIsRequired: {
                    field: this.settlementName,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldMaxLength: {
                    field: this.settlementName,
                    maxLength: 25
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.settlementName,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.settlementCode.nomSettlements
                }
            });

            this.postCode = ko.observable();
            this.addressDescription = ko.observable();

        };

        ApplicantAdress.prototype = function () {
            var self = this,
                initDistrict = function () {
                    if (gp.isLoadingDocument === true) {
                        this.districtCode.subscribtion.dispose();
                        var dCode = this.districtCode();
                        if (dCode) {
                            this.districtCode.isLoaded(false);
                            datacontext.getDistricts(this.districtCode.nomDistricts)
                            .then(function () {
                                self.districtCode.isLoaded(true);
                                self.districtCode.selectedDistrict(ko.utils.arrayFirst(self.districtCode.nomDistricts(), function (item) {
                                    if (item.code && item.code() === dCode) {
                                        return item;
                                    }
                                }));
                                self.districtCode.selectedDistrict.subscribe(self.changeDistrict, self);
                            });
                        }
                    }
                },
                changeDistrict = function (newValue) {
                    if (gp.isLoadingDocument === false) {
                        var self = this;
                        this.municipalityCode.nomMunicipalities([]);
                        this.settlementCode.nomSettlements([]);
                        if (newValue) {
                            this.districtCode(newValue.code);
                            this.districtName(newValue.name);
                            this.municipalityCode.selectedMunicipality({ code: undefined, name: undefined });

                            if (newValue.code) {
                                this.municipalityCode.isLoading(true);
                                datacontext.getMunicipalitiesByDistrict(newValue.code(), this.municipalityCode.nomMunicipalities)
                                .then(function () {
                                    self.municipalityCode.isLoading(false);
                                });
                            }
                        }
                    }
                },
                initMunicipality = function () {
                    if (gp.isLoadingDocument === true) {
                        this.municipalityCode.subscribtion.dispose();
                        this.municipalityCode.nomMunicipalities([]);
                        var self = this,
                            dCode = this.districtCode(),
                            mCode = this.municipalityCode();

                        this.municipalityCode.isLoaded(false);
                        datacontext.getMunicipalitiesByDistrict(dCode, this.municipalityCode.nomMunicipalities)
                        .then(function () {
                            self.municipalityCode.isLoaded(true);
                            if (mCode) {
                                self.municipalityCode.selectedMunicipality(ko.utils.arrayFirst(self.municipalityCode.nomMunicipalities(), function (item) {
                                    if (item.code && item.code() === mCode) {
                                        return item;
                                    }
                                }));
                            }
                            self.municipalityCode.selectedMunicipality.subscribe(self.changeMunicipality, self);
                        });
                    }
                },
                changeMunicipality = function (newValue) {
                    if (gp.isLoadingDocument === false) {
                        var self = this;
                        this.settlementCode.nomSettlements([]);
                        if (newValue) {
                            this.municipalityCode(newValue.code);
                            this.municipalityName(newValue.name);
                            this.settlementCode.selectedSettlement({ code: undefined, name: undefined });

                            if (newValue.code) {
                                this.settlementCode.isLoaded(false);
                                datacontext.getSettlementsByMunicipality(newValue.code(), this.settlementCode.nomSettlements)
                               .then(function () {
                                   self.settlementCode.isLoaded(true);
                               });
                            }
                        }
                    }
                },
                changeSettlement = function (newValue) {
                    if (gp.isLoadingDocument === false) {
                        if (newValue) {
                            this.settlementCode(newValue.code);
                            this.settlementName(newValue.name);
                        }
                    }
                },
                toJSON = function () {
                    return Utils.toJSONForXML(this);
                };
            return {
                initDistrict: initDistrict,
                changeDistrict: changeDistrict,
                initMunicipality: initMunicipality,
                changeMunicipality: changeMunicipality,
                changeSettlement: changeSettlement,
                toJSON: toJSON
            }
        }();

        return ApplicantAdress;

    }
);