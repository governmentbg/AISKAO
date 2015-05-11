define('regix/PersonNames',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var PersonNames = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Имена';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/BULSTAT';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.firstName = ko.observable();
            this.firstName.title = "Име";

            this.surName = ko.observable();
            this.surName.title = "Презиме";

            this.familyName = ko.observable();
            this.familyName.title = "Фамилия";

            this.foreignerCyrillicName = ko.observable();
            this.foreignerCyrillicName.title = "Имена на чуждестранен гражданин на кирилица";

            this.foreignerLatinName = ko.observable();
            this.foreignerLatinName.title = "Имена на чуждестранен гражданин на латиница";
        }

        PersonNames.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return PersonNames;

    });