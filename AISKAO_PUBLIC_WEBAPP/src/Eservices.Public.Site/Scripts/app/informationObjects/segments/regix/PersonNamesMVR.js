define('regix/PersonNamesMVR',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var PersonNamesMVR = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Име на физическо лице, изписано на кирилица и латиница';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/BDS/PersonalIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.firstName = ko.observable();
            this.firstName.title = "Собствено име";

            this.surName = ko.observable();
            this.surName.title = "Бащино име";

            this.familyName = ko.observable();
            this.familyName.title = "Фамилно име";

            this.firstNameLatin = ko.observable();
            this.firstNameLatin.title = "Собствено име, изписано на латиница";

            this.surnameLatin = ko.observable();
            this.surnameLatin.title = "Бащино име, изписано на латиница";

            this.lastNameLatin = ko.observable();
            this.lastNameLatin.title = "Фамилно име, изписано на латиница";
        }

        PersonNamesMVR.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return PersonNamesMVR;

    });