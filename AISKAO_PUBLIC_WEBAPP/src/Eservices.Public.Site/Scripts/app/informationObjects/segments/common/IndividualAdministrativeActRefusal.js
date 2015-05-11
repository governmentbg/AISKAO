define('common/IndividualAdministrativeActRefusal',
   ['ko',
    'Utils',
    'Enums',
    'GlobalParameters',
    'common/DocumentURI',
    'common/RegisterObjectURI',
    'common/ElectronicServiceProviderBasicData',
    'common/ElectronicServiceApplicant',
    'common/RegisteredDocumentURI',
    'common/PersonNames',
    'common/ForeignCitizenNames',
    'common/Officials',
    'common/XMLDigitalSignature'],
    function (ko,
              utils,
              Enums,
              gp,
              DocumentURI,
              RegisterObjectURI,
              ElectronicServiceProviderBasicData,
              ElectronicServiceApplicant,
              RegisteredDocumentURI,
              PersonNames,
              ForeignCitizenNames,
              Officials,
              XMLDigitalSignature) {

        var IndividualAdministrativeActRefusal = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Отказ за издаване на индивидуален административен акт';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000150';
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

            this.individualAdministrativeActRefusalLegalGround = ko.observable();
            this.individualAdministrativeActRefusalLegalGround.title = 'Правно основание за издаване на отказ за издаване на индивидуален административен акт';

            this.individualAdministrativeActRefusalFactualGround = ko.observable();
            this.individualAdministrativeActRefusalFactualGround.title = 'Правно основание за издаване на отказ за издаване на индивидуален административен акт';

            this.individualAdministrativeActRefusalAppealTerm = ko.observable();
            this.individualAdministrativeActRefusalAppealTerm.title = 'Срок за обжалване на отказ за издаване индивидуален административен акт';
            if (gp.isLoadingDocument === true) {
                this.individualAdministrativeActRefusalAppealTerm.subscribtion = this.individualAdministrativeActRefusalAppealTerm.subscribe(this.initIndividualAdministrativeActRefusalAppealTerm, this);
            }

            this.individualAdministrativeActRefusalAppealAuthority = ko.observable();
            this.individualAdministrativeActRefusalAppealAuthority.title = 'Орган, пред който се обжалва индивидуален административен акт';

            this.administrativeBodyName = ko.observable();
            this.administrativeBodyName.title = 'Наименование на административен орган';

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

        IndividualAdministrativeActRefusal.prototype = function () {
            var initIndividualAdministrativeActRefusalAppealTerm = function () {
                if (gp.isLoadingDocument === true) {
                    var value = this.individualAdministrativeActRefusalAppealTerm();
                    this.individualAdministrativeActRefusalAppealTerm.subscribtion.dispose();
                    this.individualAdministrativeActRefusalAppealTerm(value.slice(1, -1));
                }
            },
             initOfficial = function () {
                if (gp.isLoadingDocument === true) {
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
                }
            },
         changeOfficial = function (data) {
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
             }
         },
                toJSON = function () {
                    if (this.individualAdministrativeActRefusalAppealTerm !== undefined && this.individualAdministrativeActRefusalAppealTerm.length > 0) {
                        this.individualAdministrativeActRefusalAppealTerm = "P" + this.individualAdministrativeActRefusalAppealTerm + "D";
                    }
                    return utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initIndividualAdministrativeActRefusalAppealTerm: initIndividualAdministrativeActRefusalAppealTerm,
                changeOfficial: changeOfficial,
                initOfficial: initOfficial,
                toJSON: toJSON      
            }
        }();

        return IndividualAdministrativeActRefusal;

    }
);