define('common/MunicipalityAdministrationAdress',
    ['ko', 'Enums', 'Utils', 'GlobalParameters', 'dataPackages/datacontext'],
    function (ko, $, Utils, gp, datacontext) {

        var MunicipalityAdministrationAdress = function () {
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

            this.mayoraltyCode = ko.observable();
            this.mayoraltyCode.nomMayoralties = ko.observableArray();
            this.mayoraltyCode.selectedMayoralty = ko.observable();
            //this.mayoraltyCode.selectedMayoralty.subscribe(this.changeMayoralty, this);
            this.mayoraltyCode.isLoaded = ko.observable(false);
            this.mayoraltyCode.isLoading = ko.observable(false);
            this.mayoraltyCode.subscribtion = this.mayoraltyCode.selectedMayoralty.subscribe(this.changeMayoralty, this);
            this.mayoraltyCode.title = 'Код на кметство';
            this.mayoraltyCode.extend({
                fieldCharsAllowed: {
                    field: this.mayoraltyCode,
                    charsAllowed: 'главни букви на латиница, цифри и знак – (тире)',
                    pattern: "^[A-Z]{3}[0-9]{2}-[0-9]{2}$"
                },
                fieldExactLength: {
                    field: this.mayoraltyCode,
                    exactLength: 8
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.mayoraltyCode,
                    dataPackField: 'mayoraltyCode',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.mayoraltyCode.nomMayoralties
                }
            });

            this.mayoralty = ko.observable();
            this.mayoralty.title = 'Кметство';
            this.mayoralty.extend({
                fieldMaxLength: {
                    field: this.mayoralty,
                    maxLength: 25
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.mayoralty,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.mayoraltyCode.nomMayoralties
                }
            });

            this.areaCode = ko.observable();
            this.areaCode.nomAreas = ko.observableArray();
            this.areaCode.selectedArea = ko.observable();
            //this.areaCode.selectedArea.subscribe(this.changeArea, this);
            this.areaCode.isLoaded = ko.observable(false);
            this.areaCode.isLoading = ko.observable(false);
            this.areaCode.subscribtion = this.areaCode.selectedArea.subscribe(this.changeArea, this);
            this.areaCode.title = 'Код на район';
            this.areaCode.extend({
                fieldCharsAllowed: {
                    field: this.areaCode,
                    charsAllowed: 'цифри и знак – (тире)',
                    pattern: "^[0-9]{5}-[0-9]{2}$"
                },
                fieldExactLength: {
                    field: this.areaCode,
                    exactLength: 8
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.mayoraltyCode,
                    dataPackField: 'code',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.areaCode.nomAreas
                }
            });
            this.areaName = ko.observable();
            this.areaName.title = 'Район';
        };

        MunicipalityAdministrationAdress.prototype = function () {
            var initDistrict = function () {
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
                        this.mayoraltyCode.nomMayoralties([]);
                        this.areaCode.nomAreas([]);
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
                        this.mayoraltyCode.nomMayoralties([]);
                        this.areaCode.nomAreas([]);
                        if (newValue) {
                            this.municipalityCode(newValue.code);
                            this.municipalityName(newValue.name);
                            this.mayoraltyCode.selectedMayoralty({ code: undefined, name: undefined });
                            this.areaCode.selectedArea({ code: undefined, name: undefined });

                            if (newValue.code) {
                                this.mayoraltyCode.isLoading(true);
                                datacontext.getMayoraltiesByMunicipality(newValue.code(), this.mayoraltyCode.nomMayoralties)
                               .then(function () {
                                   self.mayoraltyCode.isLoading(false);
                               });
                                this.areaCode.isLoading(true);
                                datacontext.getAreasByMunicipality(newValue.mainSettlement(), this.areaCode.nomAreas)
                               .then(function () {
                                   self.areaCode.isLoading(false);
                               });
                            }
                        }
                    }
                },
                changeMayoralty = function (newValue) {
                    if (gp.isLoadingDocument === false) {
                        if (newValue) {
                            this.mayoraltyCode(newValue.code);
                            this.mayoralty(newValue.name);
                        }
                    }
                },
                changeArea = function (newValue) {
                    if (gp.isLoadingDocument === false) {
                        if (newValue) {
                            this.areaCode(newValue.code);
                            this.areaName(newValue.name);
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
                changeMayoralty: changeMayoralty,
                changeArea: changeArea,
                toJSON: toJSON
            }
        }();

        return MunicipalityAdministrationAdress;
    }
);