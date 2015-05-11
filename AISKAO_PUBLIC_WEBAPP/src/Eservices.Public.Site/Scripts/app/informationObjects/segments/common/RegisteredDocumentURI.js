define('common/RegisteredDocumentURI',
    ['ko', 'Utils', 'common/DocumentURI'],
     function (ko, Utils,DocumentURI) {


         var RegisteredDocumentURI = function () {
             this._settings = {};
             this._settings.sectionTitle = 'УРИ на регистриран документ';
             this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000044';
             this._settings.options = {
                 xmlns: this._settings.xmlns
             };


             this.documentURI = ko.observable(new DocumentURI());

             this.documentInInternalRegisterURI = ko.observable();
             this.documentInInternalRegisterURI.title = 'УРИ на регистриран документ във вътрешен документен регистър';
             

         };



         RegisteredDocumentURI.prototype = function () {
             var toJSON = function () {
                 return Utils.toJSONForXML(this, this._settings.options);
             };
             return {
                 toJSON: toJSON
             }
         }();

         return RegisteredDocumentURI;

     });