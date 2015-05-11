define('common/AttachedDocuments',
    ['ko', 'jquery', 'Utils', 'Enums', 'GlobalParameters', 'common/AttachedDocument', 'common/ElectronicDocumentXml'],
    function (ko, $, Utils, Enums, gp, AttachedDocument, ElectronicDocumentXml) {

        var AttachedDocuments = function () {
            this._settings = {};
            this._settings.needsToInstallFlash = gp.needsToInstallFlash;

            this.attachedDocument = ko.observableArray([]);
            this.attachedXmlDocument = ko.observableArray([]);

            this._settings.attachedDocumentTypes = ko.observableArray(Enums.attachedDocumentTypes);
            this._settings.attachedDocumentType = ko.observable();
        };

        AttachedDocuments.prototype = function () {
            var createAttachedDocument = function () {
                return new AttachedDocument();
            },
            createAttachedXmlDocument = function () {
                return new ElectronicDocumentXml();
            },
            addAttachedDocument = function (docType) {
                if (docType.key == 'attachedDocument') {
                    this.attachedDocument.push(new AttachedDocument());
                }
                if (docType.key == 'attachedXmlDocument') {
                    this.attachedXmlDocument.push(new ElectronicDocumentXml());
                }
                
            },
            removeAttachedDocument = function (value) {
                if (window.FileAPIProxy) {
                    if (this.attachedXmlDocument().length + this.attachedDocument().length === 1) {
                        $('#fileReaderSWFObject').remove();
                        window.FileAPIProxy.ready = false;
                    }
                }
                this.attachedDocument.remove(value);
            },
            removeAttachedXmlDocument = function (value) {
                if (window.FileAPIProxy) {
                    if (this.attachedXmlDocument().length + this.attachedDocument().length === 1) {
                        $('#fileReaderSWFObject').remove();
                        window.FileAPIProxy.ready = false;
                    }
                }
                this.attachedXmlDocument.remove(value);
            },
            toJSON = function () {
                if (this.attachedDocument && this.attachedDocument.length === 0) {
                    this.attachedDocument = undefined;
                }
                if (this.attachedXmlDocument && this.attachedXmlDocument.length === 0) {
                    this.attachedXmlDocument = undefined;
                }
                return Utils.toJSONForXML(this);
            };
            return {
                createAttachedDocument: createAttachedDocument,
                createAttachedXmlDocument: createAttachedXmlDocument,
                addAttachedDocument: addAttachedDocument,
                removeAttachedDocument: removeAttachedDocument,
                removeAttachedXmlDocument: removeAttachedXmlDocument,
                toJSON: toJSON
            }
        }();

        return AttachedDocuments;

    }
);