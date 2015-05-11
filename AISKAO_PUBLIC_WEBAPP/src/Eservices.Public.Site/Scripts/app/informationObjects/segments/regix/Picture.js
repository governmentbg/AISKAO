define('regix/Picture',
    ['ko', 'jquery', 'Utils'],
    function (ko, $, Utils) {

        var Picture = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Снимка';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/BDS/PersonalIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.pictureFileContent = ko.observable();
            this.pictureFileContent.title = 'Файлово съдържание снимка';
            this.pictureFileContent.extend({
                fieldIsRequired: {
                    field: this.pictureFileContent,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsBase64Binary: {
                    field: this.pictureFileContent
                }
            });
            this.pictureFileContent.file = ko.observable();
            this.pictureDescription = ko.observable();
            this.pictureDescription.title = 'Описание на снимка';
            this.pictureDescription.extend({
                fieldIsRequired: {
                    field: this.pictureDescription,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.pictureUniqueIdentifier = ko.observable();
            this.fileType = ko.observable();
            this.pictureFileName = ko.observable();
            this.pictureFileName.title = 'Име на файл';
            this.pictureFileName.extend({
                fieldIsRequired: {
                    field: this.pictureFileName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.pictureFileContent.downloadLink = ko.computed(function () {
                return "data:" + this.fileType() + ";base64," + this.pictureFileContent();
            }, this);

        }

        Picture.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return Picture;

    }
);