define('common/RegisteredBy',
    ['ko', 'Utils'],
     function (ko, Utils) {
         var RegisteredBy = function () {
             this._settings = {};
             this._settings.sectionTitle = '';
             this._settings.options = {
                 xmlns: this._settings.xmlns,
                 propertiesTitles: {
                     aisuri: 'AISURI'
                 }
             };
             this.aisuri = ko.observable();
             this.aisuri.tittle = 'УРИ на АИС в списъка на сертифицираните системи';
         };

         RegisteredBy.prototype = function () {
             var toJSON = function () {
                 return Utils.toJSONForXML(this, this._settings.options);
             };
             return {
                 toJSON: toJSON
             }
         }();

         return RegisteredBy;

     });