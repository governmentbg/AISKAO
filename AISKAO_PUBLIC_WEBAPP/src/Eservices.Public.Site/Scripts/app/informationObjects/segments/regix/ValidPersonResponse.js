define('regix/ValidPersonResponse',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ValidPersonResponse = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Справка за физическо лице';
            this._settings.xmlns = 'http://egov.bg/RegiX/GRAO/NBD/ValidPersonResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    EGN: 'egn',
                }
            };

            this.firstName = ko.observable();
            this.firstName.title = "Собствено име";

            this.surName = ko.observable();
            this.surName.title = "Бащино име";

            this.familyName = ko.observable();
            this.familyName.title = "Фамилно име";

            this.birthDate = ko.observable();
            this.birthDate.title = "Дата на раждане";

            this.deathDate = ko.observable();
            this.deathDate.title = "Дата на смърт";
        }

        ValidPersonResponse.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ValidPersonResponse;

    });