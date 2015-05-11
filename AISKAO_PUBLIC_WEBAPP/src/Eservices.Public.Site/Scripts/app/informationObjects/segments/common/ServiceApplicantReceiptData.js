define('common/ServiceApplicantReceiptData',
    ['ko', 'Enums', 'Utils', 'GlobalParameters', 'dataPackages/datacontext', 'common/ApplicantAdress', 'common/MunicipalityAdministrationAdress', 'dataPackages/datacontext'],
    function (ko, Enums, Utils, gp, datacontext, ApplicantAdress, MunicipalityAdministrationAdress, datacontext) {
        var ServiceApplicantReceiptData = function () {
            var self = this;
            this._settings = {};
            this._settings.sectionTitle = 'Данни за получаване на резултат от услуга от заявителя';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000141';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };
            this._settings.applicationXmlNS = ko.observable();

            this.serviceResultReceiptMethod = ko.observable();
            this.serviceResultReceiptMethod.serviceResultReceiptMethods = ko.observableArray();
            this.serviceResultReceiptMethod.isLoading = ko.observable(true);
            this._settings.applicationXmlNS.subscribe(function () {
                var self = this;
                datacontext.getServiceResultReceiptMethod(this._settings.applicationXmlNS(), this.serviceResultReceiptMethod.serviceResultReceiptMethods)
                            .then(function () {
                                self.serviceResultReceiptMethod.isLoading(false);
                            });
            }, this);

            this.serviceResultReceiptMethod.displayValue = ko.observable();
            this.serviceResultReceiptMethod.subscribe(this.initServiceResultReceiptMethod, this);
            this.serviceResultReceiptMethod.subscribtion = this.serviceResultReceiptMethod.subscribe(this.changeServiceResultReceiptMethod, this);
            this.serviceResultReceiptMethod.title = 'Начин на получаване на резултат от услуга';
            this.serviceResultReceiptMethod.extend({
                fieldIsRequired: {
                    field: this.serviceResultReceiptMethod,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.applicantAdress = ko.observable();
            this.municipalityAdministrationAdress = ko.observable();

            this.postOfficeBox = ko.observable();
            this.postOfficeBox.title = 'Пощенска кутия';
            this.postOfficeBox.extend({
                fieldIsRequired: {
                    params: {
                        field: this.postOfficeBox,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return (self.serviceResultReceiptMethod() === '0006-000081')
                    }
                }
            });
        };

        ServiceApplicantReceiptData.prototype = function () {
            var initServiceResultReceiptMethod = function () {
                if (gp.isLoadingDocument === true) {
                    this.serviceResultReceiptMethod.subscribtion.dispose();
                    var self = this,
                        serviceResultReceiptMethod = this.serviceResultReceiptMethod();
                    if (serviceResultReceiptMethod) {
                        datacontext.getServiceResultReceiptMethod(this._settings.applicationXmlNS(), this.serviceResultReceiptMethod.serviceResultReceiptMethods)
                            .then(function () {
                                self.serviceResultReceiptMethod.displayValue(ko.utils.arrayFirst(self.serviceResultReceiptMethod.serviceResultReceiptMethods(), function (item) {
                                    if (item.key === serviceResultReceiptMethod) {
                                        return item;
                                    }
                                }));
                            });
                    }
                    this.serviceResultReceiptMethod.subscribe(this.changeServiceResultReceiptMethod, this);
                }
            },
                changeServiceResultReceiptMethod = function (data) {
                    if (gp.isLoadingDocument === false) {
                        if (data === '0006-000078') {
                            this.applicantAdress(undefined);
                            this.municipalityAdministrationAdress(new MunicipalityAdministrationAdress());
                        } else if (data === '0006-000080') {
                          this.municipalityAdministrationAdress(undefined);
                        this.applicantAdress(new ApplicantAdress());
                    }
                }
                },
                createApplicantAdress = function () {
                    return new ApplicantAdress();
                },
                createMunicipalityAdministrationAdress = function () {
                    return new MunicipalityAdministrationAdress();
                },
                toJSON = function () {
                    return Utils.toJSONForXML(this, this._settings.options);
                };
        return {
            initServiceResultReceiptMethod: initServiceResultReceiptMethod,
            changeServiceResultReceiptMethod: changeServiceResultReceiptMethod,
            createApplicantAdress: createApplicantAdress,
            createMunicipalityAdministrationAdress: createMunicipalityAdministrationAdress,
            toJSON: toJSON
        }
    }();

        return ServiceApplicantReceiptData;
    }
);