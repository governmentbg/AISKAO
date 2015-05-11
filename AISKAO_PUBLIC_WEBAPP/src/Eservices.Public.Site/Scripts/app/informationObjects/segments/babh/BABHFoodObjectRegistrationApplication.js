define('babh/BABHFoodObjectRegistrationApplication',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'common/ElectronicAdministrativeServiceHeader',
    'common/ServiceApplicantReceiptData',
    'common/EKATTEAddress',
    'babh/ContactPersonData',
    'babh/FoodGroupsList',
    'common/AttachedDocuments',
    'common/ElectronicAdministrativeServiceFooter',
     'dataPackages/datacontext'],

    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        ElectronicAdministrativeServiceHeader,
        ServiceApplicantReceiptData,
        EKATTEAddress,
        ContactPersonData,
        FoodGroupsList,
        AttachedDocuments,
        ElectronicAdministrativeServiceFooter,
        datacontext) {

        var BABHFoodObjectRegistrationApplication = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Заявление за регистрация на обект за производство и търговия с храни';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1063';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    regionalDirectionCode: 'BABHRegionalDirectionCode',
                    regionalDirectionName: 'BABHRegionalDirectionName'
                }
            };
            
            var headerData = {
                sunauServiceURI: '0011-000010',
                sunauServiceName: '"Регистрация на обекти за производство и търговия с храни"',
                registerIndex: '10',
                batchNumber: '7',
                documentTypeName: '"Заявление за регистрация на обект за производство и търговия с храни"'
            };
            var localEHeader = new ElectronicAdministrativeServiceHeader();
            localEHeader.initElectronicServiceHeader(headerData);
            this.electronicAdministrativeServiceHeader = ko.observable(localEHeader);

            this.serviceTermType = ko.observable();
            //this.serviceTermType.nomServiceTermTypes = ko.observableArray(Enums.serviceTermTypes);
            this.serviceTermType.serviceTermTypes = ko.observableArray();
            this.serviceTermType.displayValue = ko.observable();
            var self = this;
            self.serviceTermType.isLoading = ko.observable(true);
            datacontext.getServiceTermTypes(this._settings.xmlns, this.serviceTermType.serviceTermTypes)
               .then((function (data) {
                   if (gp.isLoadingDocument === true) {
                       var self = this;
                       var serviceTermTypeCode = self.serviceTermType();
                       if (serviceTermTypeCode) {
                           self.serviceTermType.displayValue(ko.utils.arrayFirst(self.serviceTermType.serviceTermTypes(), function (item) {
                               if (item.key === serviceTermTypeCode) {
                                   return item;
                               }
                           }));
                       }
                   }
                   this.serviceTermType.isLoading(false);
               }).bind(this));

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
            this.regionalDirectionName = ko.observable();

            this.foodObjectPurpose = ko.observable();
            this.foodObjectPurpose.nomFoodObjectPurposeTypes = ko.observableArray(Enums.foodObjectPurposeTypes);
            this.foodObjectPurpose.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.foodObjectPurpose.subscribe(this.initFoodObjectPurpose, this);
            }
            this.foodObjectPurpose.subscribtion = this.foodObjectPurpose.subscribe(this.changeFoodObjectPurpose, this);
            this.foodObjectPurpose.title = "Вид обект за производство и търговия с храни";
            this.foodObjectPurpose.extend({
                fieldIsRequired: {
                    field: this.foodObjectPurpose,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsFromEnum: {
                    field: this.foodObjectPurpose,
                    nomenclatureTitle: 'Номенклатура за вид на обект за производство и търговия с храни',
                    nomenclatureValues: Enums.foodObjectPurposeTypes
                }
            });

            this.foodObjectCategory = ko.observable();
            this.foodObjectCategory.title = "Категория обект за производство и търговия с храни";

            this.foodObjectRealAddress = ko.observable(new EKATTEAddress());
            this.foodObjectRealAddress().districtCode.subscribe(function () {
                datacontext.getDirectionsByCode(this.foodObjectRealAddress().districtCode, this.regionalDirectionName);
            }, this);
            this.foodObjectRealAddress()._settings.sectionIsRequired(true);
            this.foodObjectRealAddress.extend({
                fieldIsRequired: {
                    field: this.foodObjectRealAddress,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.regionalDirectionName.isLoading = ko.observable(false);
            this.regionalDirectionCode = ko.computed({
                read: function () {
                    return this.foodObjectRealAddress().districtCode();
                },
                write: function (value) {
                    return value;
                },
                owner: this
            });

            this.foodObjectRequirementsMet = ko.observable(true);
            this.foodObjectRequirementsMet.title = "Изисквания за обект";

            this.foodObjectDeclarationBestPractices = ko.observable(true);
            this.foodObjectDeclarationBestPractices.title = "Декларация за добри практики";

            this.contactPersonData = ko.observable(new ContactPersonData());
            this.contactPersonData.extend({
                fieldIsRequired: {
                    field: this.contactPersonData,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.foodGroupsList = ko.observable(new FoodGroupsList());

            this.foodObjectDeclarationGMO = ko.observable();
            this.foodObjectDeclarationGMO.title = "Декларация за ГМО";

            this.foodObjectName = ko.observable();
            this.foodObjectName.title = "Наименование на обект";

            this.attachedDocuments = ko.observable(new AttachedDocuments());

            this.electronicAdministrativeServiceFooter = ko.observable(new ElectronicAdministrativeServiceFooter());
        }
        BABHFoodObjectRegistrationApplication.prototype = function () {
            var initFoodObjectPurpose = function () {
                if (gp.isLoadingDocument === true) {
                    this.foodObjectPurpose.subscribtion.dispose();
                    var self = this;
                    foodObjectPurposeCode = this.foodObjectPurpose();
                    if (foodObjectPurposeCode) {

                        self.foodObjectPurpose.displayValue(ko.utils.arrayFirst(self.foodObjectPurpose.nomFoodObjectPurposeTypes(), function (item) {
                            if (item.key === foodObjectPurposeCode) {
                                return item;
                            }
                        }));
                        self.foodGroupsList().foodGroups.foodPurpose(foodObjectPurposeCode);
                        self.foodObjectPurpose.subscribe(self.changeFoodObjectPurpose, self);
                    }
                }
            },
            changeFoodObjectPurpose = function (data) {
                if (gp.isLoadingDocument === false) {
                    var self = this;
                    if (data) {
                        this.foodObjectPurpose(data);
                        this.foodGroupsList(new FoodGroupsList());
                        this.foodGroupsList().foodGroups.foodPurpose(data);
                    }
                    else if (!data) {
                        this.foodGroupsList(undefined);
                    }
                    else if (data != "R-1009") {
                        this.foodObjectDeclarationGMO(undefined);
                    }
                }
            },         
            toJSON = function () {
                    if (this.attachedDocuments && this.attachedDocuments.attachedDocument && this.attachedDocuments.attachedXmlDocument && this.attachedDocuments.attachedDocument.length === 0 && this.attachedDocuments.attachedXmlDocument.length === 0) {
                        this.attachedDocuments = undefined;
                    }
                    return Utils.toJSONForXML(this, this._settings.options);
                };
            return {
                    initFoodObjectPurpose: initFoodObjectPurpose,
                    changeFoodObjectPurpose: changeFoodObjectPurpose,
                    toJSON: toJSON
                }
            }();

            return BABHFoodObjectRegistrationApplication;

        });