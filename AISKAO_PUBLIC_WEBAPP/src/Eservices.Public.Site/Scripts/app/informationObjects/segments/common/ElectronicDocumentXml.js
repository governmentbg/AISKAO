define('common/ElectronicDocumentXml',
    ['ko', 'Utils', 'common/RegisterObjectURI'],
     function (ko, Utils, RegisterObjectURI) {
         var ElectronicDocumentXml = function () {
             this._settings = {};
             this._settings.sectionTitle = 'Приложен електронен документ в XML формат';
             this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000092';
             this._settings.options = {
                 xmlns: this._settings.xmlns
             };
             this.documentTypeURI = ko.observable(new RegisterObjectURI());
             this.documentTypeURI.tittle = 'УРИ на документ, вписан в регистъра на информационните обекти';
             //this.documentTypeURI.extend = {
             //    fieldIsRequired: {
             //        field: this.documentTypeURI,
             //        sectionTitle: this._settings.sectionTitle
             //    }
             //};

             this.documentTypeName = ko.observable();
             this.documentTypeName.tittle = 'Наименование на документ, вписан в регистъра на информационните обекти';
             //this.documentTypeName.extend = {
             //    fieldIsRequired: {
             //        field: this.documentTypeName,
             //        sectionTitle: this._settings.sectionTitle
             //    }
             //};

             this.electronicDocumentXmlContent = ko.observable();
             this.electronicDocumentXmlContent.tittle = 'XML съдържание на електронен документ';
             //this.electronicDocumentXmlContent.extend = {
             //    fieldIsRequired: {
             //        field: this.electronicDocumentXmlContent,
             //        sectionTitle: this._settings.sectionTitle
             //    }
             //};
             this.electronicDocumentXmlContent.file = ko.observable();
             this.electronicDocumentXmlContent.fileBinaryData = ko.observable();
             this.electronicDocumentXmlContent.fileType = ko.observable();
             this.electronicDocumentXmlContent.fileName = ko.observable();
             this.electronicDocumentXmlContent.xml = ko.observable();

             this.electronicDocumentXmlContent.downloadLink = ko.computed(function () {
                 return "data:" + this.electronicDocumentXmlContent.fileType() + ";base64," + this.electronicDocumentXmlContent.fileBinaryData();
             }, this);

         };

         ElectronicDocumentXml.prototype = function () {
             var toJSON = function () {
                 return Utils.toJSONForXML(this, this._settings.options);
             };
             return {
                 toJSON: toJSON
             }
         }();

         return ElectronicDocumentXml;

     });