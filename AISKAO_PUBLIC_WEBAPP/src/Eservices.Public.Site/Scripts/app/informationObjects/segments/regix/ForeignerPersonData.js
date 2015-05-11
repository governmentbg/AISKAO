define('regix/ForeignerPersonData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForeignerPersonData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за физическо лице - чужденец';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/MPS/MotorVehicleRegistrationResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    EGN: 'egn',
                    LNCh: 'lnch'
                }
            };

            this.egn = ko.observable();
            this.egn.title = "ЕГН";

            this.lnch = ko.observable();
            this.lnch.title = "ЛНЧ";

            this.names = ko.observable();
            this.names.title = "Имена";

            this.namesLatin = ko.observable();
            this.namesLatin.title = "Имена, изписани на латиница";

            this.genderName = ko.observable();
            this.genderName.title = "Наименование на пол";

            this.genderNameLatin = ko.observable();
            this.genderNameLatin.title = "Наименование на пол на латиница";

        }

        ForeignerPersonData.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForeignerPersonData;

    });