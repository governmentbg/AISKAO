define('documents/ReceiptAcknowledgedMessage',
    ['ko', 'Utils', 'common/ReceiptAcknowledgedMessage'],
    function (ko, Utils, ReceiptAcknowledgedMessage) {

        var ReceiptAcknowledgedMessageDocument = function () {
            this.segment = ko.observable(new ReceiptAcknowledgedMessage());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000019';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'ReceiptAcknowledgedMessage'
                }
            };
            this._settings.isEditable = ko.observable(false);
        };

        ReceiptAcknowledgedMessageDocument.prototype = function () {
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

        return ReceiptAcknowledgedMessageDocument;

    }
);