define('babh/BABHForageOperatorObjectRegistrationApplication',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'common/ElectronicAdministrativeServiceHeader',
    'common/ServiceApplicantReceiptData',
    'common/EKATTEAddress',
    'babh/ForageOperatorActivitiesData',
    'common/AttachedDocuments',
    'common/ElectronicAdministrativeServiceFooter',
    'babh/ForageObjectVechicleTypes',
    'common/Residence',
    'babh/ForageCombinedProducesQTYMonthlyAnimalTypeData',
    'dataPackages/datacontext'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        ElectronicAdministrativeServiceHeader,
        ServiceApplicantReceiptData,
        EKATTEAddress,
        ForageOperatorActivitiesData,
        AttachedDocuments,
        ElectronicAdministrativeServiceFooter,
        ForageObjectVechicleTypes,
        Residence,
        ForageCombinedProducesQTYMonthlyAnimalTypeData,
        datacontext) {

        var BABHForageOperatorObjectRegistrationApplication = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Заявление за регистрация или промяна на обстоятелства по регистрация на обекти и оператори във фуражния сектор';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1287';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    regionalDirectionCode: 'BABHRegionalDirectionCode',
                    regionalDirectionName: 'BABHRegionalDirectionName'
                }
            };

            var headerData = {
                sunauServiceURI: '0011-000010',
                sunauServiceName: '"Издаване/преиздаване при промяна на обстоятелства на удостоверение за регистрация на обекти и оператори, които не задържат фуражи на склад, упражняващи дейност по Закона за фуражите"',
                registerIndex: '10',
                batchNumber: '7',
                documentTypeName: '"Заявление за регистрация или промяна на обстоятелства по регистрация на обекти и оператори във фуражния сектор"'
            };
            var localEHeader = new ElectronicAdministrativeServiceHeader();
            localEHeader.initElectronicServiceHeader(headerData);
            this.electronicAdministrativeServiceHeader = ko.observable(localEHeader);

            this.serviceTermType = ko.observable("0006-000083");
            //this.serviceTermType.nomServiceTermTypes = ko.observableArray(Enums.serviceTermTypes);
            //this.serviceTermType.serviceTermTypes = ko.observableArray();
            //var self = this;
            //self.serviceTermType.isLoading = ko.observable(true);
            //datacontext.getServiceTermTypes(this._settings.xmlns, this.serviceTermType.serviceTermTypes)
            //            .then(function () {
            //                self.serviceTermType.isLoading(false);
            //            });

            this.serviceTermType.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.serviceTermType.subscribe(this.initServiceTermType, this);
            }
            this.serviceTermType.title = 'Вид на услугата, спрямо срока за предоставянето й';
            this.serviceTermType.extend({
                fieldIsFromEnum: {
                    field: this.serviceTermType,
                    nomenclatureTitle: 'Номенклатура на видовете услуги, спрямо срока за предоставянето им',
                    nomenclatureValues: Enums.serviceTermTypes
                },
                fieldIsrequired: {
                    field: this.serviceTermType,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.serviceApplicantReceiptData = ko.observable(new ServiceApplicantReceiptData());
            this.serviceApplicantReceiptData()._settings.applicationXmlNS(this._settings.xmlns);

            this.regionalDirectionCode = ko.observable();
            this.regionalDirectionCode.nomDirections = ko.observableArray();
            this.regionalDirectionCode.isLoading = ko.observable(false);
            this.regionalDirectionCode.subscribtion = this.regionalDirectionCode.subscribe(this.changeDirection, this);
            var self = this;
            self.regionalDirectionCode.isLoading(true);
            datacontext.getDirections(this.regionalDirectionCode.nomDirections)
                       .then(function () {
                           self.regionalDirectionCode.isLoading(false);
                       });
            this.regionalDirectionCode.title = "Код на oбластна дирекция по безопасност на храните";
            this.regionalDirectionCode.extend({
                fieldIsRequired: {
                    field: this.regionalDirectionCode,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.regionalDirectionCode,
                    dataPackField: 'code',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.regionalDirectionCode.nomDirections
                },
            });

            this.regionalDirectionName = ko.observable();
            this.regionalDirectionName.title = "Наименование на oбластна дирекция по безопасност на храните";
            this.regionalDirectionName.nomDirections = ko.observableArray();
            this.regionalDirectionName.extend({
                fieldIsRequired: {
                    field: this.regionalDirectionName,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.regionalDirectionName,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Единния класификатор на административно-териториалните и териториални единици (ЕКАТТЕ)',
                    dataPackValues: this.regionalDirectionCode.nomDirections
                },
            });

            this.residence = ko.observable(new Residence());
            this.residence.title = "Седалище";

            this.forageObjectAddress = ko.observable(new EKATTEAddress());
            this.forageObjectAddress()._settings.sectionIsRequired(false);
            this.forageObjectAddress.extend({
                fieldIsRequired: {
                    field: this.forageObjectAddress,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.forageOperatorActivitiesData = ko.observable(new ForageOperatorActivitiesData());
            this.forageOperatorActivitiesData.title = "Данни за дейности на оператор във фуражния сектор";

            this.forageCombinedProducesQTYMonthlyAnimalTypeData = ko.observable(new ForageCombinedProducesQTYMonthlyAnimalTypeData());

            this.forageObjectVechicleTypes = ko.observable(new ForageObjectVechicleTypes());
            this.forageObjectVechicleTypes.title = "Вид транспортни средства за осъществяване на дейност";

            this.forageOperatorDeclaration = ko.observable(true);
            this.forageOperatorDeclaration.title = "Декларация на оператор във фуражния сектор";

            this.forageOperatorRegulationFulfillmentDeclaration = ko.observable(true);
            this.forageOperatorRegulationFulfillmentDeclaration.title = "Декларация на оператор във фуражния сектор за изпълнение на условията на Регламент (ЕО) № 183/2005";

            this.forageOperatorNoWarehouseDeclaration = ko.observable();
            this.forageOperatorNoWarehouseDeclaration.title = "Декларация на оператор във фуражния сектор за незадържане на фуражите на склад";

            this.commissioningCertificateData = ko.observable();
            this.commissioningCertificateData.title = "Данни от удостоверение за въвеждане в експлоатация";

            this.attachedDocuments = ko.observable(new AttachedDocuments());

            this.electronicAdministrativeServiceFooter = ko.observable(new ElectronicAdministrativeServiceFooter());
        }
        BABHForageOperatorObjectRegistrationApplication.prototype = function () {
            var initServiceTermType = function () {
                if (gp.isLoadingDocument === true) {
                    var self = this;
                    var serviceTermTypeCode = this.serviceTermType();
                    if (serviceTermTypeCode) {
                        datacontext.getServiceTermTypes(self._settings.xmlns, self.serviceTermType.serviceTermTypes)
                       .then(function () {
                           self.serviceTermType.displayValue(ko.utils.arrayFirst(self.serviceTermType.serviceTermTypes(), function (item) {
                               if (item.key === serviceTermTypeCode) {
                                   return item;
                               }
                           }));
                       });
                    }
                }
            },
           changeDirection = function (newValue) {
                var self = this;
                if (newValue) {
                    var regionalDirection = ko.utils.arrayFirst(this.regionalDirectionCode.nomDirections(), function (item) {
                        return item.code() == newValue;
                    });
                    if (regionalDirection !== undefined && regionalDirection !== null) {
                        this.regionalDirectionName(regionalDirection.name());
                    } else {
                        this.regionalDirectionName(undefined);
                    }
                } else {
                    this.regionalDirectionName(undefined);
                }
            },
            toJSON = function () {
                if (this.attachedDocuments.attachedDocument && this.attachedDocuments.attachedDocument.length === 0) {
                    this.attachedDocuments = undefined;
                }
                if (this.forageObjectAddress != undefined &&
                    this.forageObjectAddress.districtCode == undefined &&
                    this.forageObjectAddress.municipalityCode == undefined) {
                    this.forageObjectAddress = undefined;
                }
                if (this.forageObjectVechicleTypes != undefined &&
                  this.forageObjectVechicleTypes.forageObjectVechicleType != undefined &&
                  this.forageObjectVechicleTypes.forageObjectVechicleType.length === 0) {
                    this.forageObjectVechicleTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initServiceTermType: initServiceTermType,
                changeDirection: changeDirection,
                toJSON: toJSON
            }
        }();

        return BABHForageOperatorObjectRegistrationApplication;

    });