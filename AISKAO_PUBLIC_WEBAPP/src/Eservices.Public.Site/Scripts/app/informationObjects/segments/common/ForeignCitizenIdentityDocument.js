define('common/ForeignCitizenIdentityDocument',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var ForeignCitizenIdentityDocument = function () {
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000010';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.documentNumber = ko.observable();
            this.documentType = ko.observable();
        }

        ForeignCitizenIdentityDocument.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForeignCitizenIdentityDocument;

    }
);