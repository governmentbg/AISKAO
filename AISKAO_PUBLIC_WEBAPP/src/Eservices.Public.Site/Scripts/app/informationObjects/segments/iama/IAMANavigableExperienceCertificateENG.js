define('iama/IAMANavigableExperienceCertificateENG',
        ['ko', 'Utils',
        'GlobalParameters',
        'Enums',
        'common/RegisterObjectURI',
        'common/DocumentURI',
        'common/ElectronicServiceProviderBasicData',
        'common/ElectronicServiceApplicant',
        'iama/NavigableExperienceByVesselENGs',
        'common/Officials',
        'common/PersonNames',
        'common/ForeignCitizenNames',
        'common/XMLDigitalSignature'],
    function (ko, Utils,
        gp,
        Enums,
        RegisterObjectURI,
        DocumentURI,
        ElectronicServiceProviderBasicData,
        ElectronicServiceApplicant,
        NavigableExperienceByVesselENGs,
        Officials,
        PersonNames,
        ForeignCitizenNames,
        XMLDigitalSignature) {

        var IAMANavigableExperienceCertificateENG = function () {
            var self = this;
            this._settings = {};
            this._settings.sectionTitle = 'Удостоверение за плавателен стаж на английски език';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1122';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    directorateNameENG: 'IAMADirectorateNameENG',
                    xmlDigitalSignature: 'XMLDigitalSignature'
                }
            };
             
            this.documentTypeURI = ko.observable(new RegisterObjectURI());
            this.documentTypeURI.extend({
                fieldIsRequired: {
                    field: this.documentTypeURI,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.documentTypeName = ko.observable();
            this.documentTypeName.title = 'Наименование на документ, вписан в регистъра на информационните обекти';
            this.documentTypeName.extend({
                fieldIsRequired: {
                    field: this.documentTypeName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.documentURI = ko.observable(new DocumentURI());
            this.documentURI.extend({
                fieldIsRequired: {
                    field: this.documentURI,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.documentReceiptOrSigningDate = ko.observable();
            this.documentReceiptOrSigningDate.title = "Дата на получаване или подписване на документ";
            this.documentReceiptOrSigningDate.extend({
                fieldIsRequired: {
                    field: this.documentReceiptOrSigningDate,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsDate: {
                    field: this.documentReceiptOrSigningDate
                }
            });
            
            var providerData = {
                providerEntityName: 'Изпълнителна агенция Морска администрация',
                providerEntityId: '121797867'
            };
            var localEProvider = new ElectronicServiceProviderBasicData();
            localEProvider.initElectronicServiceProvider(providerData);
            this.electronicServiceProviderBasicData = ko.observable(localEProvider);

            this.electronicServiceApplicant = ko.observable(new ElectronicServiceApplicant());
            this.electronicServiceApplicant.extend({
                fieldIsRequired: {
                    field: this.electronicServiceApplicant,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.directorateNameENG = ko.observable();
            this.directorateNameENG.title = 'Наименование на дирекция на Морска администрация на английски език';
            this.directorateNameENG.extend({
                fieldIsRequired: {
                    field: this.directorateNameENG,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.personLatinFirstName = ko.observable();
            this.personLatinFirstName.title = "Собствено име на физическо лице, изписано на латиница";

            this.personLatinSurname = ko.observable();
            this.personLatinSurname.title = "Бащино име на физическо лице, изписано на латиница";

            this.personLatinLastName = ko.observable();
            this.personLatinLastName.title = "Фамилно име на физическо лице, изписано на латиница";

            this.navigableExperienceByVesselENGs = ko.observable(new NavigableExperienceByVesselENGs());

            this.navigableExperienceTotalYearCount = ko.observable();
            this.navigableExperienceTotalYearCount.title = 'Брой години обща продължителност на плавателния стаж';

            this.navigableExperienceTotalMonthCount = ko.observable();
            this.navigableExperienceTotalMonthCount.title = 'Брой месец обща продължителност на плавателния стаж';

            this.navigableExperienceTotalDayCount = ko.observable();
            this.navigableExperienceTotalDayCount.title = 'Брой дни обща продължителност на плавателния стаж';

            this.navigableExperienceTotal = ko.observable();
            this.navigableExperienceTotal.title = "Общ плавателен стаж";

            this.seafarerPassportNumber = ko.observable();
            this.seafarerPassportNumber.title = "Номер на моряшки паспорт";

            this.seafarerPassportIssueDate = ko.observable();
            this.seafarerPassportIssueDate.title = "Дата на издаване на моряшки паспорт";
            this.seafarerPassportIssueDate.extend({
                fieldIsDate: {
                    field: this.seafarerPassportIssueDate
                }
            });

            this.seafarerPassportExpireDate = ko.observable();
            this.seafarerPassportExpireDate.title = "Дата на валидност на моряшки паспорт";
            this.seafarerPassportExpireDate.extend({
                fieldIsDate: {
                    field: this.seafarerPassportExpireDate
                }
            });

            this.harbourMasterENG = ko.observable();
            this.harbourMasterENG.title = "Име на капитан на пристанището на английски език";

            this.official = ko.observable(new Officials());
            this.official.nomOfficial = ko.observableArray(Enums.officials);
            this.official.selectedOfficial = ko.observable();
            this.official.selectedOfficial.subscribtion = this.official.selectedOfficial.subscribe(this.changeOfficial, this);
            this.official.selectedOfficial(ko.utils.arrayFirst(this.official.nomOfficial(), function (item) {
                if (item.key === 'PersonNames') {
                    return item;
                };
            }));
            var self = this;
            this.official().personNames.subscribe(this.initOfficial, this);
            this.official().foreignCitizenNames.subscribe(this.initOfficial, this);

            this.xmlDigitalSignature = ko.observable();
            this.xmlDigitalSignature.title = "Данни за електронен подпис на XML документ по XADES стандарта";
            //this.xmlDigitalSignature.extend({
            //    fieldIsRequired: {
            //        field: this.xmlDigitalSignature,
            //        sectionTitle: this._settings.sectionTitle
            //    }
            //});
        }

        IAMANavigableExperienceCertificateENG.prototype = function () {
            var initOfficial = function () {
                if (gp.isLoadingDocument === true) {
                    //this.official.selectedOfficial.subscribtion.dispose();
                    var self = this,
                     official = self.official().personNames();
                    if (official) {
                        self.official.selectedOfficial(ko.utils.arrayFirst(self.official.nomOfficial(), function (item) {
                            if (item.key === 'PersonNames') {
                                return item;
                            }
                        }));
                    } else {
                        self.official.selectedOfficial(ko.utils.arrayFirst(self.official.nomOfficial(), function (item) {
                            if (item.key === 'ForeignCitizenNames') {
                                return item;
                            }
                        }));
                    }
                    //self.official.selectedOfficial.subscribe(self.changeOfficial, self);
                }
            },
       changeOfficial = function (data) {
           //if (gp.isLoadingDocument === false) {
               var self = this;
               switch (self.official.selectedOfficial().key) {
                   case 'PersonNames':
                       self.official().foreignCitizenNames(undefined);
                       self.official().personNames(new PersonNames());
                       break;
                   case 'ForeignCitizenNames':
                       self.official().personNames(undefined);
                       self.official().foreignCitizenNames(new ForeignCitizenNames());
                       break;
               }
           //}
       },
         toJSON = function () {
             return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                changeOfficial: changeOfficial,
                initOfficial: initOfficial,
                toJSON: toJSON

            }
        }();

        return IAMANavigableExperienceCertificateENG;

    }
);







