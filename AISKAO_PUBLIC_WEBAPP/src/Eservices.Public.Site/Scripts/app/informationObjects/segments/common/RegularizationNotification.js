define('common/RegularizationNotification',
    ['ko',
     'Utils',
     'Enums',
     'GlobalParameters',
     'common/RegisterObjectURI',
     'common/DocumentURI',
     'common/ElectronicServiceProviderBasicData',
     'common/ElectronicServiceApplicant',
     'common/RegisteredDocumentURI',
     'common/Officials',
     'common/XMLDigitalSignature',
     'common/PersonNames',
     'common/ForeignCitizenNames'],
    function (ko,
        Utils,
        Enums,
        gp,
        RegisterObjectURI,
        DocumentURI,
        ElectronicServiceProviderBasicData,
        ElectronicServiceApplicant,
        RegisteredDocumentURI,
        Officials,
        XMLDigitalSignature,
        PersonNames,
        ForeignCitizenNames) {

        var RegularizationNotification = function () {
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1008';
            this._settings.sectionTitle = "Уведомление за отстраняване на нередовност";
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    xmlDigitalSignature: 'XMLDigitalSignature',
                    aisCaseURI: 'AISCaseURI'
                }
            };

            this.documentTypeURI = ko.observable(new RegisterObjectURI());
            this.documentTypeURI.title = 'УРИ на документ, вписан в регистъра на информационните обекти';

            this.documentTypeName = ko.observable();
            this.documentTypeName.title = 'Наименование на документ, вписан в регистъра на информационните обекти';

            this.documentURI = ko.observable(new DocumentURI());
            this.documentURI.title = 'УРИ на регистриран документ в официален документен регистър';

            this.documentReceiptOrSigningDate = ko.observable();
            this.documentReceiptOrSigningDate.extend({
                fieldIsDate: {
                    field: this.documentReceiptOrSigningDate
                }
            });

            var providerData = {
                providerEntityName: 'Община Велико Търново',
                providerEntityId: '000133634'
            };
            var localEProvider = new ElectronicServiceProviderBasicData();
            localEProvider.initElectronicServiceProvider(providerData);
            this.electronicServiceProviderBasicData = ko.observable(localEProvider);

            this.electronicServiceApplicant = ko.observable(new ElectronicServiceApplicant());
            this.electronicServiceApplicant.title = 'Заявител на електронна административна услуга';

            this.individualAdministrativeActRefusalHeader = ko.observable();
            this.individualAdministrativeActRefusalHeader.title = 'Заглавна част на отказ за издаване на индивидуален административен акт';

            //Уникален идентификатор на преписка, съвпадащ с 
            //уникален регистров идентификатор на документа
            this.aisCaseURI = ko.observable(new RegisteredDocumentURI());
            this.aisCaseURI.title = 'УРИ на преписка';

            this.regularizationNotificationLegalGround = ko.observable();
            this.regularizationNotificationLegalGround.title = "Правно основание за издаване на уведомление за отстраняване на нередовност";

            this.regularizationNotificationFactualGround = ko.observable();
            this.regularizationNotificationFactualGround.title = "Фактически основания за издаването на уведомление за отстраняване на нередовност";

            this.regularizationNotificationTerm = ko.observable();
            this.regularizationNotificationTerm.title = "Срок за отстраняване на нередовност към заявена административна услуга";
            if (gp.isLoadingDocument === true) {
                this.regularizationNotificationTerm.subscribtion = this.regularizationNotificationTerm.subscribe(this.initRegularizationNotificationTerm, this);
            }

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
            this.official.extend({
                requiredOneOfFields: {
                    fields: [this.official().personNames, this.official().foreignCitizenNames],
                    sectionTitle: this._settings.sectionTitle
                }
            });


            this.xmlDigitalSignature = ko.observable(new XMLDigitalSignature());
            this.xmlDigitalSignature.title = "Данни за електронен подпис на XML документ по XADES стандарта";
            this.xmlDigitalSignature.extend({
                fieldIsRequired: {
                    field: this.xmlDigitalSignature,
                    sectionTitle: this._settings.sectionTitle
                }
            });
        }

        RegularizationNotification.prototype = function () {
            var initOfficial = function () {
                if (gp.isLoadingDocument === true) {
                    //this.official.selectedOfficial.subscribtion.dispose();
                    officialForeign = this.official().foreignCitizenNames();
                    if (official) {
                        this.official.selectedOfficial(ko.utils.arrayFirst(this.official.nomOfficial(), function (item) {
                            if (item.key === 'ForeignCitizenNames') {
                                return item;
                            }
                        }));
                    } else {
                        this.official.selectedOfficial(ko.utils.arrayFirst(this.official.nomOfficial(), function (item) {
                            if (item.key === 'PersonNames') {
                                return item;
                            }
                        }));
                    }
                    //this.official.selectedOfficial.subscribe(this.changeOfficial, this);
                }
            },
        changeOfficial = function (data) {
            //if (gp.isLoadingDocument === false) {
                var self = this;
                switch (this.official.selectedOfficial().key) {
                    case 'PersonNames':
                        this.official().foreignCitizenNames(undefined);
                        this.official().personNames(new PersonNames());
                        break;
                    case 'ForeignCitizenNames':
                        this.official().personNames(undefined);
                        this.official().foreignCitizenNames(new ForeignCitizenNames());
                        break;
                //}
            }
        },
        initRegularizationNotificationTerm = function () {
            if (gp.isLoadingDocument === true) {
                var value = this.regularizationNotificationTerm();
                this.regularizationNotificationTerm.subscribtion.dispose();
                this.regularizationNotificationTerm(value.slice(1, -1));
            }
        },
            toJSON = function () {
                if (this.regularizationNotificationTerm !== undefined && this.regularizationNotificationTerm.length > 0) {
                    this.regularizationNotificationTerm = "P" + this.regularizationNotificationTerm + "D";
                }
                if (this.official && this.official.personNames === undefined && this.official.foreignCitizenNames === undefined) {
                    this.official = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initOfficial: initOfficial,
                changeOfficial: changeOfficial,
                initRegularizationNotificationTerm: initRegularizationNotificationTerm,
                toJSON: toJSON
            }
        }();

        return RegularizationNotification;

    }
);