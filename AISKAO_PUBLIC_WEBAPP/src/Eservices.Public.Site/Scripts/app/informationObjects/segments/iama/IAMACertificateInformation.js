define('iama/IAMACertificateInformation',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext) {

        var IAMACertificateInformation = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Информация за свидетелство, издадено от ИАМА';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1156';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    certificateIssuingCityCode: 'IAMACertificateIssuingCityCode',
                    certificateIssuingCityName: 'IAMACertificateIssuingCityName',
                    certificateNumber: 'IAMACertificateNumber',
                    certificateIssuedDate: 'IAMACertificateIssuedDate'
                }
            };

            this.certificateNumber = ko.observable();
            this.certificateNumber.title = "Номер на свидетелство, издадено от ИАМА";

            this.certificateIssuedDate = ko.observable();
            this.certificateIssuedDate.title = "Дата на издаване на свидетелство от ИАМА";

            this.certificateIssuingCityCode = ko.observable();
            this.certificateIssuingCityCode.title = "Код на град, в който e издадено свидетелство от ИАМА";
            this.certificateIssuingCityCode.nomCertificateIssuingCities = ko.observableArray();
            this.certificateIssuingCityCode.selectedCertificateIssuingCity = ko.observable();
            this.certificateIssuingCityCode.isLoaded = ko.observable(false);
            this.certificateIssuingCityCode.isLoading = ko.observable(false);
            this.certificateIssuingCityCode.subscribe(this.initCertificateIssuingCity, this);
            this.certificateIssuingCityCode.subscribtion = this.certificateIssuingCityCode.selectedCertificateIssuingCity.subscribe(this.changeCertificateIssuingCity, this);
            var self = this;
            self.certificateIssuingCityCode.isLoading(true);
            datacontext.getCertificateIssuingCities(this.certificateIssuingCityCode.nomCertificateIssuingCities)
                        .then(function () {
                            self.certificateIssuingCityCode.isLoaded(true);
                            self.certificateIssuingCityCode.isLoading(false);
                        });


            this.certificateIssuingCityName = ko.observable();
            this.certificateIssuingCityName.title = "Наименование на град, в който e издадено свидетелство от ИАМА";

        }

        IAMACertificateInformation.prototype = function () {
            var initCertificateIssuingCity = function () {
                 if (gp.isLoadingDocument === true) {
                     var self = this;
                     self.certificateIssuingCityCode.subscribtion.dispose();
                     var dCode = self.certificateIssuingCityCode();
                     if (dCode) {
                         self.certificateIssuingCityCode.isLoading(true);
                         datacontext.getCertificateIssuingCities(self.certificateIssuingCityCode.nomCertificateIssuingCities)
                         .then(function () {
                             self.certificateIssuingCityCode.isLoading(false);
                             self.certificateIssuingCityCode.selectedCertificateIssuingCity(ko.utils.arrayFirst(self.certificateIssuingCityCode.nomCertificateIssuingCities(), function (item) {
                                 if (item.code && item.code() === dCode) {
                                     return item;
                                 }
                             }));
                             self.certificateIssuingCityCode.selectedCertificateIssuingCity.subscribe(self.changeCertificateIssuingCity, self);
                         });
                     }
                 }
             },
            changeCertificateIssuingCity = function (newValue) {
                if (gp.isLoadingDocument === false) {
                    if (newValue) {
                        this.certificateIssuingCityCode(newValue.code);
                        this.certificateIssuingCityName(newValue.name);
                    }
                }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initCertificateIssuingCity: initCertificateIssuingCity,
                changeCertificateIssuingCity: changeCertificateIssuingCity,
                toJSON: toJSON
            }
        }();

        return IAMACertificateInformation;

    });