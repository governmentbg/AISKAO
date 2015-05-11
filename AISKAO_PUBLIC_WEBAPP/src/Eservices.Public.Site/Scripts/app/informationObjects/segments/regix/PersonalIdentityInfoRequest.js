define('regix/PersonalIdentityInfoRequest',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var PersonalIdentityInfoRequest = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Входни данни за справка за лице по документ за самоличност';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/BDS/PersonalIdentityInfoRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    egn: 'EGN',
                }
            };

            this.identityDocumentNumber = ko.observable();
            this.identityDocumentNumber.title = "Номер на документ за самоличност";

            this.egn = ko.observable();
            this.egn.title = "ЕГН";
            this.egn.extend({
                fieldIsValidEGN: {
                    field: this.egn
                }
            });

        }

        PersonalIdentityInfoRequest.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return PersonalIdentityInfoRequest;

    });