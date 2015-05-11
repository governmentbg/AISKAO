define('common/ForeignCitizenBasicData',
    ['ko', 'Utils', 'common/ForeignCitizenNames', 'common/ForeignCitizenPlaceOfBirth', 'common/ForeignCitizenIdentityDocument'],
    function (ko, Utils, ForeignCitizenNames, ForeignCitizenPlaceOfBirth, ForeignCitizenIdentityDocument) {

        var ForeignCitizenBasicData = function () {
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000011';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.names = ko.observable(new ForeignCitizenNames());
            this.birthDate = ko.observable();
            this.birthDate.title = 'Дата на раждане';
            this.birthDate.isRequired = ko.observable(false);
            this.birthDate.extend({
                fieldIsDate: {
                    field: this.birthDate
                }
            });
       
            
            this.placeOfBirth = ko.observable(new ForeignCitizenPlaceOfBirth());
            this.identityDocument = ko.observable(new ForeignCitizenIdentityDocument());

        };

        ForeignCitizenBasicData.prototype = function () {
            var toJSON = function () {
                     return Utils.toJSONForXML(this, this._settings.options);
                 };
            return {
                toJSON: toJSON
            }
        }();

        return ForeignCitizenBasicData;

    }
);