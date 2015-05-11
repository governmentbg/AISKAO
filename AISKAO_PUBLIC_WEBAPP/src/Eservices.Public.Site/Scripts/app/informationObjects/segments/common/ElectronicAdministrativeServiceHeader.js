define('common/ElectronicAdministrativeServiceHeader',
    ['ko', 'GlobalParameters', 'Enums', 'Utils',
    'common/ElectronicServiceApplicant',
    'common/EntityBasicData',
    'common/RegisterObjectURI',
    'common/DocumentURI',
    'common/ElectronicServiceProviderBasicData',
    'common/ElectronicServiceApplicantContactData',
    'dataPackages/datacontext'],
    function (ko, gp, Enums, Utils,
        ElectronicServiceApplicant,
        EntityBasicData,
        RegisterObjectURI,
        DocumentURI,
        ElectronicServiceProviderBasicData,
        ElectronicServiceApplicantContactData,
        datacontext) {

        var ElectronicAdministrativeServiceHeader = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Водеща част на заявление за предоставяне на електронна административна услуга, когато се изисква идентификация на заявителя';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000152';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    sunauServiceURI: 'SUNAUServiceURI',
                    sunauServiceName: 'SUNAUServiceName'
                }
            };

            this.sunauServiceURI = ko.observable();
            this.sunauServiceURI.title = 'УРИ на наименованието на административна услуга';
            this.sunauServiceURI.extend({
                fieldIsRequired: {
                    field: this.sunauServiceURI,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.documentTypeURI = ko.observable(new RegisterObjectURI());                                                //segment
            this.documentTypeURI.title = 'УРИ на документ, вписан в регистъра на информационните обекти';
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
            this.electronicServiceProviderBasicData = ko.observable(new ElectronicServiceProviderBasicData());                            //segment
            this.electronicServiceProviderBasicData.title = 'Доставчик на електронни административни услуги';
            this.electronicServiceProviderBasicData.extend({
                fieldIsRequired: {
                    field: this.electronicServiceProviderBasicData,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.electronicServiceProviderBasicData.isLoading = ko.observable(false);

            this.electronicServiceApplicant = ko.observable(new ElectronicServiceApplicant());                          //segment
            this.electronicServiceApplicant.title = 'Заявител на електронна административна услуга';
            this.electronicServiceApplicant.extend({
                fieldIsRequired: {
                    field: this.electronicServiceApplicant,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.electronicServiceApplicantContactData = ko.observable(new ElectronicServiceApplicantContactData());    //segment
            this.electronicServiceApplicantContactData.title = 'Данни за контакт със заявителя на електронната административна услуга';
            this.electronicServiceApplicantContactData()._settings.sectionIsRequired(true);
            this.electronicServiceApplicantContactData.extend({
                fieldIsRequired: {
                    field: this.electronicServiceApplicantContactData,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.applicationType = ko.observable();
            this.applicationType.title = 'Вид на заявлението според обстоятелството дали се подава за първи път заявлението се подава за първи път или е последващ документ';                                                                  //enum

            this.applicationType.applicationTypes = ko.observableArray(Enums.applicationTypes);
            this.applicationType.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.applicationType.subscribe(this.initApplicationType, this);
            }
            this.applicationType.subscribe(this.changeApplicationType, this);
            //this.applicationType.subscribe(this.changeApplicationType, this);
            this.applicationType.extend({
                fieldIsRequired: {
                    field: this.applicationType,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromEnum: {
                    field: this.applicationType,
                    nomenclatureTitle: 'Номенклатура на видовете заявления според обстоятелството дали заявлението се подава за първи път или е последващ документ',
                    nomenclatureValues: Enums.applicationTypes
                }
            });

            this.sunauServiceName = ko.observable();
            this.sunauServiceName.title = 'Наименование на административна услуга';
            this.sunauServiceName.extend({
                fieldIsRequired: {
                    field: this.sunauServiceName,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.documentURI = ko.observable();  //???-when is used???                                                  //segment
            this.sendApplicationWithReceiptAcknowledgedMessage = ko.observable(false);
            this.sendApplicationWithReceiptAcknowledgedMessage.title = 'Изпращане на електронния документ и приложените към него документи заедно с документа „Потвърждаване за получаване”';
            this.sendApplicationWithReceiptAcknowledgedMessage.extend({
                fieldIsRequired: {
                    field: this.sendApplicationWithReceiptAcknowledgedMessage,
                    sectionTitle: this._settings.sectionTitle
                }
            });//value
        }

        ElectronicAdministrativeServiceHeader.prototype = function () {
            var initApplicationType = function () {
                if (gp.isLoadingDocument) {
                    var self = this,
                        appTypeCode = this.applicationType();               
                    if (appTypeCode) {
                        this.applicationType.displayValue(ko.utils.arrayFirst(this.applicationType.applicationTypes(), function (item) {
                            if (item.key === appTypeCode) {
                                return item;
                            }
                        }));
                    }
                }
            },
            changeApplicationType = function (data) {
                if (data !== "0006-000121") {
                    this.documentURI(new DocumentURI());
                }
                else {
                    this.documentURI(undefined);
                }
            },
            initElectronicServiceHeader = function (headerData) {
                var self = this;
                //var localEHeader = new ElectronicAdministrativeServiceHeader();
                self.sunauServiceURI(headerData.sunauServiceURI);//('0011-000010');
                self.sunauServiceName(headerData.sunauServiceName); //('Издаване на удостоверение за постоянен адрес');

                var localDocTypeUri = new RegisterObjectURI();
                localDocTypeUri.registerIndex(headerData.registerIndex); //('10');
                localDocTypeUri.batchNumber(headerData.batchNumber); //('7');
                self.documentTypeURI(localDocTypeUri);
                self.documentTypeName(headerData.documentTypeName); //('Заявление за издаване на удостоверение за постоянен адрес');

                var localEServiceProvider = new ElectronicServiceProviderBasicData();
                var localProviderEntityData = new EntityBasicData();
                self.electronicServiceProviderBasicData.isLoading(true);
                datacontext.getElectronicServiceProviderBasicData(localProviderEntityData)
                .then(function () {
                    self.electronicServiceProviderBasicData.isLoading(false);
                    localEServiceProvider.entityBasicData(localProviderEntityData);
                });

                //localProviderEntityData.name(headerData.providerEntityName); //('Община Велико Търново');
                //localProviderEntityData.identifier(headerData.providerEntityId); //('000133634');

                localEServiceProvider.electronicServiceProviderType('0006-000031');
                localEServiceProvider.electronicServiceProviderType.selectedElectronicServiceProviderType(ko.utils.arrayFirst(Enums.electronicServiceProviderTypes, function (item) {
                    if (item.key === '0006-000031') {
                        return item;
                    }
                }));

                self.electronicServiceProviderBasicData(localEServiceProvider);
                
                return self;

            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON,
                changeApplicationType: changeApplicationType,
                initElectronicServiceHeader: initElectronicServiceHeader,
                initApplicationType: initApplicationType
            }
        }();

        return ElectronicAdministrativeServiceHeader;

    }
);