define('regix/ContactsType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ContactsType = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    url: 'URL',
                    eMail: 'EMail'
                }
            };

            this.phone = ko.observable();

            this.fax = ko.observable();

            this.eMail = ko.observable();

            this.url = ko.observable();

        }

        ContactsType.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ContactsType;

    });