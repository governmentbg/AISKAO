define('documents/ActualStateResponse',
    ['ko', 'Utils', 'regix/ActualStateResponse'],
    function (ko, Utils, ActualStateResponse) {

        var ActualStateResponseDocument = function () {
            this.segment = ko.observable(new ActualStateResponse());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR/ActualStateResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'ActualStateResponse'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        ActualStateResponseDocument.prototype = function () {
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

        return ActualStateResponseDocument;

    }
);