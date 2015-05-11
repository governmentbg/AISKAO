define('iama/IAMANavigationCompetencyCertificateApplication',
        ['ko', 'Utils',
        'GlobalParameters',
        'Enums',
        'dataPackages/datacontext',
        'common/ElectronicAdministrativeServiceHeader',
        'common/ServiceApplicantReceiptData',
        'common/AttachedDocuments',
        'common/ElectronicAdministrativeServiceFooter',
        'iama/NavigationCompetences',
        'dataPackages/datacontext'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        ElectronicAdministrativeServiceHeader,
        ServiceApplicantReceiptData,
        AttachedDocuments,
        ElectronicAdministrativeServiceFooter,
        NavigationCompetences,
        datacontext) {

        var IAMANavigationCompetencyCertificateApplication = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Заявление за издаване/преиздаване на свидетелство за правоспособност за плаване по ВВПЕ';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1041';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    directorateCode: 'IAMADirectorateCode',
                    directorateNameBG: 'IAMADirectorateNameBG',
                    licenseIssueFlag: 'IAMALicenseIssueFlag'
                }
            };
            var headerData = {
                sunauServiceURI: '0011-000010',
                sunauServiceName: 'Издаване/преиздаване на свидетелство за правоспособност за плаване по ВВПЕ',
                registerIndex: '10',
                batchNumber: '7',
                documentTypeName: 'Заявление за издаване/преиздаване на свидетелство за правоспособност за плаване по ВВПЕ'
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
                    nomenclatureTitle: 'Номенклатура на видовете услуги, спрямо срока за предоствянето им',
                    nomenclatureValues: Enums.serviceTermTypes
                },
                fieldIsRequired: {
                    field: this.serviceTermType,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.serviceApplicantReceiptData = ko.observable(new ServiceApplicantReceiptData());
            this.serviceApplicantReceiptData()._settings.applicationXmlNS(this._settings.xmlns);

            this.directorateCode = ko.observable();
            this.directorateCode.nomDirectorates = ko.observableArray();
            this.directorateCode.selectedDirectorate = ko.observable();
            this.directorateCode.isLoading = ko.observable(false);
            this.directorateCode.subscribe(this.initDirectorate, this);
            var self = this;
            self.directorateCode.isLoading(true);
            datacontext.getIAMADirectorates(this.directorateCode.nomDirectorates)
                        .then(function () {
                            self.directorateCode.isLoading(false);
                        });
            this.directorateCode.subscribtion = this.directorateCode.selectedDirectorate.subscribe(this.changeDirectorate, this);
            this.directorateCode.title = 'Код на дирекция на Морска администрация';
            this.directorateCode.extend({
                fieldIsRequired: {
                    field: this.directorateCode,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.directorateNameBG = ko.observable();
            this.directorateNameBG.title = 'Наименование на дирекция на Морска администрация на български език';
            this.directorateNameBG.extend({
                fieldIsRequired: {
                    field: this.directorateNameBG,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.licenseIssueFlag = ko.observable('true');
            this.licenseIssueFlag.subscribe(function () {
                if (gp.isLoadingDocument == true) {
                    this.licenseIssueFlag(this.licenseIssueFlag().toString());
                }
            }, this);
            this.licenseIssueFlag.title = 'Указател за издаване или преиздаване на свидетелство за правоспособност';
            this.licenseIssueFlag.extend({
                fieldIsRequired: {
                    field: this.licenseIssueFlag,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.personalIdentityDocumentNumber = ko.observable();
            this.personalIdentityDocumentNumber.title = 'Номер на документ за самоличност';
            this.personalIdentityDocumentNumber.extend({
                fieldIsRequired: {
                    field: this.personalIdentityDocumentNumber,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.navigationCompetences = ko.observable(new NavigationCompetences());

            this.attachedDocuments = ko.observable(new AttachedDocuments());

            this.electronicAdministrativeServiceFooter = ko.observable(new ElectronicAdministrativeServiceFooter());

        }

        IAMANavigationCompetencyCertificateApplication.prototype = function () {
            var initDirectorate = function () {
                if (gp.isLoadingDocument === true) {
                    var self = this;
                    self.directorateCode.subscribtion.dispose();
                    var dCode = self.directorateCode();
                    if (dCode) {
                        self.directorateCode.isLoading(true);
                        datacontext.getIAMADirectorates(self.directorateCode.nomDirectorates)
                        .then(function () {
                            self.directorateCode.isLoading(false);
                            self.directorateCode.selectedDirectorate(ko.utils.arrayFirst(self.directorateCode.nomDirectorates(), function (item) {
                                if (item.code && item.code() === dCode) {
                                    return item;
                                }
                            }));
                            self.directorateCode.selectedDirectorate.subscribe(self.changeDirectorate, self);
                        });
                    }
                }
            },
            changeDirectorate = function (newValue) {
                if (gp.isLoadingDocument === false) {
                    if (newValue) {
                        this.directorateCode(newValue.code);
                        this.directorateNameBG(newValue.nameBG);
                    }
                }
            },
            toJSON = function () {
                if (this.attachedDocuments && this.attachedDocuments.attachedDocument && this.attachedDocuments.attachedXmlDocument && this.attachedDocuments.attachedDocument.length === 0 && this.attachedDocuments.attachedXmlDocument.length === 0) {
                    this.attachedDocuments = undefined;
                }
                if (this.navigationCompetences !== undefined &&
                    this.navigationCompetences.navigationCompetence !== undefined &&
                    this.navigationCompetences.navigationCompetence.length === 0) {
                    this.navigationCompetences = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initDirectorate: initDirectorate,
                changeDirectorate: changeDirectorate,
                toJSON: toJSON
            }
        }();

        return IAMANavigationCompetencyCertificateApplication;

    });