define('regix/LegalFormType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var LegalFormType = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.legalFormAbbr = ko.observable();
            this.legalFormName = ko.observable();

        }

        LegalFormType.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return LegalFormType;

    });