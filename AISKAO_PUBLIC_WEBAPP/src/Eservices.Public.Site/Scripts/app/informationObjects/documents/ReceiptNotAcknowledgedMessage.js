define('documents/ReceiptNotAcknowledgedMessage',
    ['ko', 'Utils', 'common/ReceiptNotAcknowledgedMessage'],
    function (ko, Utils, ReceiptNotAcknowledgedMessage) {

        var ReceiptNotAcknowledgedMessageDocument = function () {
            this.segment = ko.observable(new ReceiptNotAcknowledgedMessage());

            this._settings = {};
            this._settings.fromXML = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000017';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                xmlAttributes: {
                    '_xmlns:xsd': 'http://www.w3.org/2001/XMLSchema',
                    '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance'
                },
                propertiesTitles: {
                    segment: 'ReceiptNotAcknowledgedMessage'
                }
            };
            this._settings.isEditable = ko.observable(false);
        };

        ReceiptNotAcknowledgedMessageDocument.prototype = function () {
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

        return ReceiptNotAcknowledgedMessageDocument;

    }
);