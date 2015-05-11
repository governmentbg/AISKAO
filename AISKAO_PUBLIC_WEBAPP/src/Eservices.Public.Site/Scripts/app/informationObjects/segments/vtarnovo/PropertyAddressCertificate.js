define('vtarnovo/PropertyAddressCertificate',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'common/RegisterObjectURI',
    'common/DocumentURI',
    'common/Officials',
    'common/PersonNames',
    'common/ForeignCitizenNames',
    'common/ElectronicServiceProviderBasicData',
    'common/ElectronicServiceApplicant'],
    function (ko, Utils,
        gp,
        Enums,
        RegisterObjectURI,
        DocumentURI,
        Officials,
        PersonNames,
        ForeignCitizenNames,
        ElectronicServiceProviderBasicData,
        ElectronicServiceApplicant) {

        var PropertyAddressCertificate = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Удостоверение за административен адрес на поземлени имоти';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1036';
            this._settings.options = {
                xmlns: this._settings.xmlns
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
            this.electronicServiceApplicant.extend({
                fieldIsRequired: {
                    field: this.electronicServiceApplicant,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.propertyDetailData = ko.observable();
            this.propertyDetailData.title = "Детайли за административен адрес";

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

            this.XMLDigitalSignature = ko.observable();
            this.XMLDigitalSignature.title = "Данни за електронен подпис на XML документ по XADES стандарта";
            this.XMLDigitalSignature.extend({
                fieldIsRequired: {
                    field: this.XMLDigitalSignature,
                    sectionTitle: this._settings.sectionTitle
                }
            });

        }

        PropertyAddressCertificate.prototype = function () {
            var initOfficial = function () {
                if (gp.isLoadingDocument === true) {
                    this.official.selectedOfficial.subscribtion.dispose();
                    official = this.official().foreignCitizenNames();
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
                    this.official.selectedOfficial.subscribe(this.changeOfficial, this);
                }
            },
        changeOfficial = function (data) {
            if (gp.isLoadingDocument === false) {
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
            }
        },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initOfficial: initOfficial,
                changeOfficial: changeOfficial,
                toJSON: toJSON
            }
        }();

        return PropertyAddressCertificate;

    });