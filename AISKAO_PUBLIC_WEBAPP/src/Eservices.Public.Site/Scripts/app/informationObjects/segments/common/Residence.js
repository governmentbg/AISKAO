define('common/Residence',
    ['ko', 'Utils', 'dataPackages/datacontext', 'GlobalParameters'],
    function (ko, Utils, datacontext, gp) {

        var Residence = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Седалище';
            this._settings.sectionIsRequired = ko.observable(false);
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000142';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.districtCode = ko.observable();
            this.districtCode.nomDistricts = ko.observableArray();
            this.districtCode.isLoaded = ko.observable(false);
            this.districtCode.isLoading = ko.observable(false);
            this.districtCode.subscribtion = this.districtCode.subscribe(this.changeDistrict, this);
            var self = this;
            self.districtCode.isLoading(true);
            datacontext.getDistricts(this.districtCode.nomDistricts)
                        .then(function () {
                            self.districtCode.isLoaded(true);
                            self.districtCode.isLoading(false);
                        });
            this.districtCode.title = 'Код на област';
            this.districtCode.extend({
                fieldIsRequired: {
                    params: {
                        field: this.districtCode,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return this._settings.sectionIsRequired()
                    }.bind(this)
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
                    params: {
                        field: this.districtName,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return this._settings.sectionIsRequired()
                    }.bind(this)
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
            // this.municipalityCode.isLoaded = ko.observable(false);
            this.municipalityCode.isLoading = ko.observable(false);
            this.municipalityCode.selectedMunicipality = ko.observable();
            //this.municipalityCode.subscribe(this.initMunicipality, this);
            this.municipalityCode.subscribtion = this.municipalityCode.subscribe(this.changeMunicipality, this);

            this.municipalityCode.title = 'Код на община';
            this.municipalityCode.extend({
                fieldIsRequired: {
                    params: {
                        field: this.municipalityCode,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return this._settings.sectionIsRequired()
                    }.bind(this)
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
                    params: {
                        field: this.municipalityName,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return this._settings.sectionIsRequired()
                    }.bind(this)
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
            //this.settlementCode.isLoaded = ko.observable(false);
            this.settlementCode.isLoading = ko.observable(false);
            this.settlementCode.selectedSettlement = ko.observable();
            //this.settlementCode.subscribe(this.initSettlement, this);
            this.settlementCode.subscribtion = this.settlementCode.subscribe(this.changeSettlement, this);
            this.settlementCode.title = 'Код на населено място';
            this.settlementCode.extend({
                fieldIsRequired: {
                    params: {
                        field: this.settlementCode,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return this._settings.sectionIsRequired()
                    }.bind(this)
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
                    params: {
                        field: this.settlementName,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return this._settings.sectionIsRequired()
                    }.bind(this)
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

        }
        Residence.prototype = function () {
            var changeDistrict = function (newValue) {
                var self = this;
                this.municipalityCode.nomMunicipalities([]);
                this.settlementCode.nomSettlements([]);
                if (newValue) {
                    var district = ko.utils.arrayFirst(this.districtCode.nomDistricts(), function (item) {
                        return item.code() == newValue;
                    });
                    if (district !== undefined && district !== null) {
                        this.districtName(district.name());
                    } else {
                        this.districtName(undefined);
                    }
                    //this.municipalityCode.selectedMunicipality({ code: undefined, name: undefined });

                    self.municipalityCode.isLoading(true);
                    datacontext.getMunicipalitiesByDistrict(newValue, self.municipalityCode.nomMunicipalities)
                    .then(function () {
                        self.municipalityCode.isLoading(false);
                    });
                } else {
                    this.districtName(undefined);
                }
            },
               changeMunicipality = function (newValue) {
                   var self = this;
                   this.settlementCode.nomSettlements([]);
                   if (newValue) {
                       var municipality = ko.utils.arrayFirst(this.municipalityCode.nomMunicipalities(), function (item) {
                           return item.code() == newValue;
                       });
                       if (municipality !== undefined && municipality !== null) {
                           this.municipalityName(municipality.name());
                       } else {
                           this.municipalityName(undefined);
                       }
                       //this.settlementCode.selectedSettlement({ code: undefined, name: undefined });

                       self.settlementCode.isLoading(true);
                       datacontext.getSettlementsByMunicipality(newValue, self.settlementCode.nomSettlements)
                      .then(function () {
                          self.settlementCode.isLoading(false);
                      });
                   } else {
                       this.municipalityName(undefined);
                   }
               },
                initSettlement = function () {
                    if (gp.isLoadingDocument === true) {
                        this.settlementCode.subscribtion.dispose();
                        this.settlementCode.nomSettlements([]);
                        var self = this,
                            mCode = this.municipalityCode(),
                            sCode = this.settlementCode();

                        this.settlementCode.isLoading(true);
                        datacontext.getSettlementsByMunicipality(mCode, this.settlementCode.nomSettlements)
                        .then(function () {
                            self.settlementCode.isLoading(false);
                            if (sCode) {
                                self.settlementCode.selectedSettlement(ko.utils.arrayFirst(self.settlementCode.nomSettlements(), function (item) {
                                    if (item.code && item.code() === sCode) {
                                        return item;
                                    }
                                }));
                            }
                            self.settlementCode.selectedSettlement.subscribe(self.changeSettlement, self);
                        });
                    }
                },
                changeSettlement = function (newValue) {
                    var self = this;
                    if (newValue) {
                        var settlement = ko.utils.arrayFirst(this.settlementCode.nomSettlements(), function (item) {
                            return item.code() == newValue;
                        });
                        if (settlement !== undefined && settlement !== null) {
                            this.settlementName(settlement.name());
                        } else {
                            this.settlementName(undefined);
                        }
                    } else {
                        this.settlementName(undefined);
                    }
                },
                toJSON = function () {
                    return Utils.toJSONForXML(this, this._settings.options);
                }
            return {
                toJSON: toJSON,
                initSettlement: initSettlement,
                changeDistrict: changeDistrict,
                changeMunicipality: changeMunicipality,
                changeSettlement: changeSettlement
            }
        }();

        return Residence;

    }
);