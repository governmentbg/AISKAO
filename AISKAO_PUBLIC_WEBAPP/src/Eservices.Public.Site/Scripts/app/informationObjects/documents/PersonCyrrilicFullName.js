define('documents/PersonCyrrilicFullName',
    ['ko', 'Utils', 'iama/PersonCyrrilicFullName'],
    function (ko, Utils, PersonCyrrilicFullName) {

        var PersonCyrrilicFullNameDocument = function () {
            this.segment = ko.observable(new PersonCyrrilicFullName());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1107';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'PersonCyrrilicFullName'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        PersonCyrrilicFullNameDocument.prototype = function () {
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

        return PersonCyrrilicFullNameDocument;

    }
);