define('common/AttachedDocument',
    ['ko', 'jquery', 'Utils'],
    function (ko, $, Utils) {

        var AttachedDocument = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Приложен документ';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000139';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.attachedDocumentFileContent = ko.observable();
            this.attachedDocumentFileContent.title = 'Файлово съдържание на приложен документ';
            this.attachedDocumentFileContent.extend({
                fieldIsRequired: {
                    field: this.attachedDocumentFileContent,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsBase64Binary: {
                    field: this.attachedDocumentFileContent
                }
            });
            this.attachedDocumentFileContent.file = ko.observable();
             //this.attachedDocumentFileContent.subscribe(this.initAttachedDocumentFileContent, this);
            this.attachedDocumentDescription = ko.observable();
            this.attachedDocumentDescription.title = 'Описание на приложен документ';
            this.attachedDocumentDescription.extend({
                fieldIsRequired: {
                    field: this.attachedDocumentDescription,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.attachedDocumentUniqueIdentifier = ko.observable();
            this.fileType = ko.observable();
            this.attachedDocumentFileName = ko.observable();
            this.attachedDocumentFileName.title = 'Име на файл';
            this.attachedDocumentFileName.extend({
                fieldIsRequired: {
                    field: this.attachedDocumentFileName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.attachedDocumentFileContent.downloadLink = ko.computed(function () {
                return "data:" + this.fileType() + ";base64," + this.attachedDocumentFileContent();
            }, this);

        }

        AttachedDocument.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return AttachedDocument;

    }
);