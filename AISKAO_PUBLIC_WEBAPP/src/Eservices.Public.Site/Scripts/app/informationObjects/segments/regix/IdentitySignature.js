define('regix/IdentitySignature',
    ['ko', 'jquery', 'Utils'],
    function (ko, $, Utils) {

        var IdentitySignature = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Личен подпис';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/RCH//ForeignIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.identitySignatureFileContent = ko.observable();
            this.identitySignatureFileContent.title = 'Файлово съдържание на приложен документ';
            this.identitySignatureFileContent.extend({
                fieldIsRequired: {
                    field: this.identitySignatureFileContent,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsBase64Binary: {
                    field: this.identitySignatureFileContent
                }
            });
            this.identitySignatureFileContent.file = ko.observable();
            this.identitySignatureDescription = ko.observable();
            this.identitySignatureeDescription.title = 'Описание на приложен документ';
            this.identitySignatureDescription.extend({
                fieldIsRequired: {
                    field: this.identitySignatureDescription,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.identitySignatureUniqueIdentifier = ko.observable();
            this.fileType = ko.observable();
            this.identitySignatureFileName = ko.observable();
            this.identitySignatureFileName.title = 'Име на файл';
            this.identitySignatureFileName.extend({
                fieldIsRequired: {
                    field: this.identitySignatureFileName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.identitySignatureFileContent.downloadLink = ko.computed(function () {
                return "data:" + this.fileType() + ";base64," + this.identitySignatureFileContent();
            }, this);

        }

        IdentitySignature.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return IdentitySignature;

    }
);