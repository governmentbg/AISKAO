define('babh/ForageForTransportationByFormData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageForTransportationByFormPlantOrigin',
    'babh/ForageForTransportationByFormAnimalOrigin',
    'babh/ForageForTransportationByFormSupplement',
    'babh/ForageForTransportationByFormPremix',
    'babh/ForageForTransportationByFormCombined',
    'babh/ForageForTransportationByFormSpecialUse',
    'babh/ForageForTransportationByFormMedical'],
    function (ko, Utils,
        gp,
        Enums,
        ForageForTransportationByFormPlantOrigin,
        ForageForTransportationByFormAnimalOrigin,
        ForageForTransportationByFormSupplement,
        ForageForTransportationByFormPremix,
        ForageForTransportationByFormCombined,
        ForageForTransportationByFormSpecialUse,
        ForageForTransportationByFormMedical) {

        var ForageForTransportationByFormData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за фуражи за транспортиране по форма';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1339';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageForTransportationByFormPlantOrigin = ko.observable();
            this.forageForTransportationByFormPlantOrigin.subscribe(this.initForageForTransportationByFormPlantOrigin, this);
            this.forageForTransportationByFormPlantOrigin.isChecked = ko.observable(false);
            this.forageForTransportationByFormPlantOrigin.subscribtion = this.forageForTransportationByFormPlantOrigin.isChecked.subscribe(this.checkForageForTransportationByFormPlantOrigin, this);

            this.forageForTransportationByFormAnimalOrigin = ko.observable();
            this.forageForTransportationByFormAnimalOrigin.subscribe(this.initForageForTransportationByFormAnimalOrigin, this);
            this.forageForTransportationByFormAnimalOrigin.isChecked = ko.observable(false);
            this.forageForTransportationByFormAnimalOrigin.subscribtion = this.forageForTransportationByFormAnimalOrigin.isChecked.subscribe(this.checkForageForTransportationByFormAnimalOrigin, this);

            this.forageForTransportationByFormSupplement = ko.observable();
            this.forageForTransportationByFormSupplement.subscribe(this.initForageForTransportationByFormSupplement, this);
            this.forageForTransportationByFormSupplement.isChecked = ko.observable(false);
            this.forageForTransportationByFormSupplement.subscribtion = this.forageForTransportationByFormSupplement.isChecked.subscribe(this.checkForageForTransportationByFormSupplement, this);

            this.forageForTransportationByFormPremix = ko.observable();
            this.forageForTransportationByFormPremix.subscribe(this.initForageForTransportationByFormPremix, this);
            this.forageForTransportationByFormPremix.isChecked = ko.observable(false);
            this.forageForTransportationByFormPremix.subscribtion = this.forageForTransportationByFormPremix.isChecked.subscribe(this.checkForageForTransportationByFormPremix, this);

            this.forageForTransportationByFormCombined = ko.observable();
            this.forageForTransportationByFormCombined.subscribe(this.initForageForTransportationByFormCombined, this);
            this.forageForTransportationByFormCombined.isChecked = ko.observable(false);
            this.forageForTransportationByFormCombined.subscribtion = this.forageForTransportationByFormCombined.isChecked.subscribe(this.checkForageForTransportationByFormCombined, this);

            this.forageForTransportationByFormSpecialUse = ko.observable();
            this.forageForTransportationByFormSpecialUse.subscribe(this.initForageForTransportationByFormSpecialUse, this);
            this.forageForTransportationByFormSpecialUse.isChecked = ko.observable(false);
            this.forageForTransportationByFormSpecialUse.subscribtion = this.forageForTransportationByFormSpecialUse.isChecked.subscribe(this.checkForageForTransportationByFormSpecialUse, this);

            this.forageForTransportationByFormMedical = ko.observable();
            this.forageForTransportationByFormMedical.subscribe(this.initForageForTransportationByFormMedical, this);
            this.forageForTransportationByFormMedical.isChecked = ko.observable(false);
            this.forageForTransportationByFormMedical.subscribtion = this.forageForTransportationByFormMedical.isChecked.subscribe(this.checkForageForTransportationByFormMedical, this);

        }

        ForageForTransportationByFormData.prototype = function () {
            var createForageForTransportationByFormPlantOrigin = function () {
                return new ForageForTransportationByFormPlantOrigin();
            },
            createForageForTransportationByFormAnimalOrigin = function () {
                return new ForageForTransportationByFormAnimalOrigin();
            },
            createForageForTransportationByFormSupplement = function () {
                return new ForageForTransportationByFormSupplement();
            },
            createForageForTransportationByFormPremix = function () {
                return new ForageForTransportationByFormPremix();
            },
            createForageForTransportationByFormCombined = function () {
                return new ForageForTransportationByFormCombined();
            },
            createForageForTransportationByFormSpecialUse = function () {
                return new ForageForTransportationByFormSpecialUse();
            },
            createForageForTransportationByFormMedical = function () {
                return new ForageForTransportationByFormMedical();
            },
            checkForageForTransportationByFormPlantOrigin = function (data) {
                if (data == true) {
                    this.forageForTransportationByFormPlantOrigin(new ForageForTransportationByFormPlantOrigin());
                } else if (data == false) {
                    this.forageForTransportationByFormPlantOrigin(undefined);
                }
            },
            checkForageForTransportationByFormAnimalOrigin = function (data) {
                if (data == true) {
                    this.forageForTransportationByFormAnimalOrigin(new ForageForTransportationByFormAnimalOrigin());
                } else if (data == false) {
                    this.forageForTransportationByFormAnimalOrigin(undefined);
                }
            },
            checkForageForTransportationByFormSupplement = function (data) {
                if (data == true) {
                    this.forageForTransportationByFormSupplement(new ForageForTransportationByFormSupplement());
                } else if (data == false) {
                    this.forageForTransportationByFormSupplement(undefined);
                }
            },
            checkForageForTransportationByFormPremix = function (data) {
                if (data == true) {
                    this.forageForTransportationByFormPremix(new ForageForTransportationByFormPremix());
                } else if (data == false) {
                    this.forageForTransportationByFormPremix(undefined);
                }
            },
            checkForageForTransportationByFormCombined = function (data) {
                if (data == true) {
                    this.forageForTransportationByFormCombined(new ForageForTransportationByFormCombined());
                } else if (data == false) {
                    this.forageForTransportationByFormCombined(undefined);
                }
            },
            checkForageForTransportationByFormSpecialUse = function (data) {
                if (data == true) {
                    this.forageForTransportationByFormSpecialUse(new ForageForTransportationByFormSpecialUse());
                } else if (data == false) {
                    this.forageForTransportationByFormSpecialUse(undefined);
                }
            },
            checkForageForTransportationByFormMedical = function (data) {
                if (data == true) {
                    this.forageForTransportationByFormMedical(new ForageForTransportationByFormMedical());
                } else if (data == false) {
                    this.forageForTransportationByFormMedical(undefined);
                }
            },
            initForageForTransportationByFormPlantOrigin = function () {
                var self = this;
                this.forageForTransportationByFormPlantOrigin.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageForTransportationByFormPlantOrigin() != undefined) {
                    self.forageForTransportationByFormPlantOrigin.isChecked(true);
                }
                self.forageForTransportationByFormPlantOrigin.isChecked.subscribe(self.checkForageForTransportationByFormPlantOrigin, self);
            },
            initForageForTransportationByFormAnimalOrigin = function () {
                var self = this;
                this.forageForTransportationByFormAnimalOrigin.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageForTransportationByFormAnimalOrigin() != undefined) {
                    self.forageForTransportationByFormAnimalOrigin.isChecked(true);
                }
                self.forageForTransportationByFormAnimalOrigin.isChecked.subscribe(self.checkForageForTransportationByFormAnimalOrigin, self);
            },
            initForageForTransportationByFormSupplement = function () {
                var self = this;
                this.forageForTransportationByFormSupplement.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageForTransportationByFormSupplement() != undefined) {
                    self.forageForTransportationByFormSupplement.isChecked(true);
                }
                self.forageForTransportationByFormSupplement.isChecked.subscribe(self.checkForageForTransportationByFormSupplement, self);
            },
            initForageForTransportationByFormPremix = function () {
                var self = this;
                this.forageForTransportationByFormPremix.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageForTransportationByFormPremix() != undefined) {
                    self.forageForTransportationByFormPremix.isChecked(true);
                }
                self.forageForTransportationByFormPremix.isChecked.subscribe(self.checkForageForTransportationByFormPremix, self);
            },
            initForageForTransportationByFormCombined = function () {
                var self = this;
                this.forageForTransportationByFormCombined.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageForTransportationByFormCombined() != undefined) {
                    self.forageForTransportationByFormCombined.isChecked(true);
                }
                self.forageForTransportationByFormCombined.isChecked.subscribe(self.checkForageForTransportationByFormCombined, self);
            }, 
            initForageForTransportationByFormSpecialUse = function () {
                var self = this;
                this.forageForTransportationByFormSpecialUse.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageForTransportationByFormSpecialUse() != undefined) {
                    self.forageForTransportationByFormSpecialUse.isChecked(true);
                }
                self.forageForTransportationByFormSpecialUse.isChecked.subscribe(self.checkForageForTransportationByFormSpecialUse, self);
            },
            initForageForTransportationByFormMedical = function () {
                var self = this;
                this.forageForTransportationByFormMedical.subscribtion.dispose();
                if (gp.isLoadingDocument === true && self.forageForTransportationByFormMedical() != undefined) {
                    self.forageForTransportationByFormMedical.isChecked(true);
                }
                self.forageForTransportationByFormMedical.isChecked.subscribe(self.checkForageForTransportationByFormMedical, self);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createForageForTransportationByFormPlantOrigin: createForageForTransportationByFormPlantOrigin,
                createForageForTransportationByFormAnimalOrigin: createForageForTransportationByFormAnimalOrigin,
                createForageForTransportationByFormSupplement: createForageForTransportationByFormSupplement,
                createForageForTransportationByFormPremix: createForageForTransportationByFormPremix,
                createForageForTransportationByFormCombined: createForageForTransportationByFormCombined,
                createForageForTransportationByFormSpecialUse: createForageForTransportationByFormSpecialUse,
                createForageForTransportationByFormMedical: createForageForTransportationByFormMedical,
                checkForageForTransportationByFormPlantOrigin: checkForageForTransportationByFormPlantOrigin,
                checkForageForTransportationByFormAnimalOrigin: checkForageForTransportationByFormAnimalOrigin,
                checkForageForTransportationByFormSupplement: checkForageForTransportationByFormSupplement,
                checkForageForTransportationByFormPremix: checkForageForTransportationByFormPremix,
                checkForageForTransportationByFormCombined: checkForageForTransportationByFormCombined,
                checkForageForTransportationByFormSpecialUse: checkForageForTransportationByFormSpecialUse,
                checkForageForTransportationByFormMedical: checkForageForTransportationByFormMedical,
                initForageForTransportationByFormPlantOrigin: initForageForTransportationByFormPlantOrigin,
                initForageForTransportationByFormAnimalOrigin: initForageForTransportationByFormAnimalOrigin,
                initForageForTransportationByFormSupplement: initForageForTransportationByFormSupplement,
                initForageForTransportationByFormPremix: initForageForTransportationByFormPremix,
                initForageForTransportationByFormCombined: initForageForTransportationByFormCombined,
                initForageForTransportationByFormSpecialUse: initForageForTransportationByFormSpecialUse,
                initForageForTransportationByFormMedical: initForageForTransportationByFormMedical,
                toJSON: toJSON
            }
        }();

        return ForageForTransportationByFormData;

    });