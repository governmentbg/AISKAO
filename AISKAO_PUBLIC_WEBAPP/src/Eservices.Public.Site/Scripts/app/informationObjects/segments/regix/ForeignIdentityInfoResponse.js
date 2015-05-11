define('regix/ForeignIdentityInfoResponse',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/ReturnInformation',
    'regix/PersonNamesMVR',
    'regix/NationalityList',
    'regix/Statuses'],
    function (ko, Utils,
        gp,
        Enums,
        ReturnInformation,
        PersonNamesMVR,
        NationalityList,
        Statuses) {

        var ForeignIdentityInfoResponse = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Справка с данни за чуждестранно физическо лице от Единния регистър за чужденци';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/RCH//ForeignIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    EGN: 'egn',
                    LNCh: 'lnch'
                }
            };

            this.returnInformations = ko.observable(new ReturnInformation());
            this.returnInformations.title = "Информация на резултат";

            this.egn = ko.observable();
            this.egn.title = "ЕГН";

            this.lnch = ko.observable();
            this.lnch.title = "ЛНЧ";

            this.personNames = ko.observable(new PersonNamesMVR());
            this.personNames.title = "Имена";

            this.birthDate = ko.observable();
            this.birthDate.title = "Дата на раждане";
            this.birthDate.extend({
                fieldIsDate: {
                    field: this.birthDate
                }
            });

            this.nationalityList = ko.observable(new NationalityList());
            this.nationalityList.title = "Списък други гражданства";

            this.statuses = ko.observable(new Statuses());

            this.picture = ko.observableArray([]);
            this.picture.title = "Снимка";

            this.identitySignature = ko.observableArray([]);
            this.identitySignature.title = "Личен подпис";
        }

        ForeignIdentityInfoResponse.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForeignIdentityInfoResponse;

    });