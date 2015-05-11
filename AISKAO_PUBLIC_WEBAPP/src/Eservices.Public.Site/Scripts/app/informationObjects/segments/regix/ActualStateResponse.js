define('regix/ActualStateResponse',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/LegalFormType',
    'regix/SeatType'],
    function (ko, Utils,
        gp,
        Enums,
        LegalFormType,
        SeatType) {

        var ActualStateResponse = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Справка за актуално състояние';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR/ActualStateResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    uic: 'UIC'
                }
            };

            this.status = ko.observable();
            this.status.title = "Статус на партида";
            this.status.nomStatusTypes = ko.observableArray(Enums.statusTypes);
            this.status.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.status.subscribe(this.initStatusType, this);
            }

            this.uic = ko.observable();
            this.uic.title = "ЕИК";

            this.company = ko.observable();
            this.company.title = "Фирма";

            this.legalForm = ko.observable(new LegalFormType());
            this.legalForm.title = "Правна форма";

            this.transliteration = ko.observable();
            this.transliteration.title = "Изписване на чужд език";

            this.seat = ko.observable(new SeatType());
            this.seat.title = "Седалище и адрес на управление";
        }

        ActualStateResponse.prototype = function () {
            var initStatusType = function () {
                if (gp.isLoadingDocument === true) {
                    var statusCode = this.status();
                    if (statusCode) {
                        this.status.displayValue(ko.utils.arrayFirst(this.status.nomStatusTypes(), function (item) {
                            if (item.key === statusCode) {
                                return item;
                            }
                        }));
                    }
                }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initStatusType: initStatusType,
                toJSON: toJSON
            }
        }();

        return ActualStateResponse;

    });