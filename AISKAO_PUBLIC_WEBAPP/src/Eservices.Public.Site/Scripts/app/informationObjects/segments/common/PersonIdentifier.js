define('common/PersonIdentifier',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var PersonIdentifier = function () {
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000006';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    egn: 'EGN',
                    lnch: 'LNCh'
                }
            };

            this.egn = ko.observable();
            this.egn.title = 'ЕГН';
            this.egn.extend({
                fieldIsValidEGN: {
                    field: this.egn
                }
            });

            this.lnch = ko.observable();
            this.lnch.title = 'ЛНЧ';
            //this.lnch.extend({
            //    fieldIsValidLNCH: {
            //        field: this.lnch
            //    }
            //});
        }

        PersonIdentifier.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return PersonIdentifier;
    }
);