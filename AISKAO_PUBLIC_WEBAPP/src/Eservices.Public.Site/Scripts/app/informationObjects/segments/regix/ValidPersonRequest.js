define('regix/ValidPersonRequest',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ValidPersonRequest = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Справка за физическо лице';
            this._settings.xmlns = 'http://egov.bg/RegiX/GRAO/NBD/ValidPersonRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                egn: 'EGN',
            }
            };

            this.egn = ko.observable();
            this.egn.title = 'ЕГН';
            this.egn.extend({
                fieldIsValidEGN: {
                    field: this.egn
                }
            });
        }

        ValidPersonRequest.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ValidPersonRequest;

    });