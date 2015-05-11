define('regix/PersonalIdentityInfoResponse',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/ReturnInformation',
    'regix/PersonNamesMVR',
    'regix/Picture'],
    function (ko, Utils,
        gp,
        Enums,
        ReturnInformation,
        PersonNamesMVR,
        Picture) {

        var PersonalIdentityInfoResponse = function () {
            this._settings = {};
            this._settings.needsToInstallFlash = gp.needsToInstallFlash;
            this._settings.sectionTitle = 'Справка за лице по документ за самоличност';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/BDS/PersonalIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.returnInformations = ko.observable(new ReturnInformation());
            this.returnInformations.title = "Информация на резултат";

            this.egn = ko.observable();
            this.egn.title = "ЕГН";

            this.personNames = ko.observable(new PersonNamesMVR());
            this.personNames.title = "Имена";

            this.picture = ko.observableArray([]);
            this.picture.title = "Снимка";

            this.identitySignature = ko.observable();
            this.identitySignature.title = "Личен подпис";
        }

        PersonalIdentityInfoResponse.prototype = function () {
            var createPicture = function () {
                return new Picture();
            },
            toJSON = function () {
                if (this.picture && this.picture.length === 0) {
                    this.picture = undefined;
                }
                return Utils.toJSONForXML(this);
            };
            return {
                createPicture: createPicture,
                toJSON: toJSON
            }
        }();

        return PersonalIdentityInfoResponse;

    });