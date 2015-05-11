define('documents/PersonalIdentityInfoResponse',
    ['ko', 'Utils', 'regix/PersonalIdentityInfoResponse'],
    function (ko, Utils, PersonalIdentityInfoResponse) {

        var PersonalIdentityInfoResponseDocument = function () {
            this.segment = ko.observable(new PersonalIdentityInfoResponse());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/BDS/PersonalIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'PersonalIdentityInfoResponse'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        PersonalIdentityInfoResponseDocument.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            },
                fromJSON = function () {
                    return Utils.fromJSONToJS(this, this._settings.fromXML);
                };
            return {
                toJSON: toJSON,
                fromJSON: fromJSON
            }
        }();

        return PersonalIdentityInfoResponseDocument;

    }
);