define('documents/ActualStateRequest',
    ['ko', 'Utils', 'regix/ActualStateRequest'],
    function (ko, Utils, ActualStateRequest) {

        var ActualStateRequestDocument = function () {
            this.segment = ko.observable(new ActualStateRequest());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR/ActualStateRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'ActualStateRequest'
                }
            };
            this._settings.isEditable = ko.observable(true);
        };

        ActualStateRequestDocument.prototype = function () {
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

        return ActualStateRequestDocument;

    }
);