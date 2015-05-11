define('regix/PersonType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/PersonNamesGRAO'],
    function (ko, Utils,
        gp,
        Enums,
        PersonNamesGRAO) {

        var PersonType = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    EGN: 'egn',
                    LNCh: 'lnch'
                }
            };

            this.isForeigner = ko.observable();
            this.isForeigner.title = "Чужденец";

            this.egn = ko.observable();
            this.egn.title = "ЕГН";

            this.lnch = ko.observable();
            this.lnch.title = "ЛНЧ";

            this.personNames = ko.observable(new PersonNamesGRAO());
            this.personNames.title = "Имена";

        }

        PersonType.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return PersonType;

    });