define('regix/Nationality',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var Nationality = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Гражданство';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/RCH//ForeignIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.nationalityCode = ko.observable();
            this.nationalityCode.title = "Код на държава";

            this.nationalityName = ko.observable();
            this.nationalityName.title = "Наименование на държава";

            this.nationalityNameLatin = ko.observable();
            this.nationalityNameLatin.title = "Наименование на държава на латиница";
        }

        Nationality.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                toJSON: toJSON
            }
        }();

        return Nationality;

    });