define('babh/ForageFormTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageFormTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1247';
            //this._settings.options = {
            //    xmlns: this._settings.xmlns
            //};


            this.forageFormType = ko.observableArray([]);
            this.forageFormType.nomForageFormTypes = ko.observable(Enums.forageFormTypes);
            this.forageFormType.title = "Форма на фуражи";
            //this.forageFormType.extend({
            //    fieldIsFromEnum: {
            //        field: this.forageFormType,
            //        nomenclatureTitle: 'Номенклатура за форма на фуражите',
            //        nomenclatureValues: Enums.forageFormTypes
            //    }
            //});
        }

        ForageFormTypes.prototype = function () {
            var getForageFormTypeName = function (data) {
                var forageName = ko.utils.arrayFirst(Enums.forageFormTypes, function (item) {
                    if (item.key == data) {
                        return item;
                    }
                });
                return forageName.name;
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                getForageFormTypeName: getForageFormTypeName,
                toJSON: toJSON
            }
        }();

        return ForageFormTypes;

    });