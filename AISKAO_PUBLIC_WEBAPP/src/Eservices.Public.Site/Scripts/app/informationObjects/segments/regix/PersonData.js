define('regix/PersonData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var PersonData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за физическо лице';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/MPS/MotorVehicleRegistrationResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    EGN: 'egn',
                }
            };

            this.egn = ko.observable();
            this.egn.title = "ЕГН";

            this.firstName = ko.observable();
            this.firstName.title = "Собствено име";

            this.surname = ko.observable();
            this.surname.title = "Бащино име";

            this.familyName = ko.observable();
            this.familyName.title = "Фамилно име";

            this.firstNameLatin = ko.observable();
            this.firstNameLatin.title = "Собствено име, изписано на латиница";

            this.surnameLatin = ko.observable();
            this.surnameLatin.title = "Бащино име, изписано на латиница";

            this.lastNameLatin = ko.observable();
            this.lastNameLatin.title = "Фамилно име, изписано на латиница";

            this.birthDate = ko.observable();
            this.birthDate.title = "Дата на раждане";

            this.genderName = ko.observable();
            this.genderName.title = "Наименование на пол";

            this.genderNameLatin = ko.observable();
            this.genderNameLatin.title = "Наименование на пол на латиница";
        }

        PersonData.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                toJSON: toJSON
            }
        }();

        return PersonData;

    });