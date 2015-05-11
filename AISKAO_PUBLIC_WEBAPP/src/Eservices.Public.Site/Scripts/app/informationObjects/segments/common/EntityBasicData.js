define('common/EntityBasicData',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var EntityBasicData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Основни данни за юридическо лице, клон на чуждестранно юридическо лице или едноличен търговец';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000013';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.name = ko.observable();
            this.name.title = 'Наименование на юридическо лице, клон на чуждестранно юридическо лице или едноличен търговец';
            this.name.extend({
                fieldIsRequired: {
                    field: this.name,
                    sectionTitle: this._settings.sectionTitle
                }
            });
            this.identifier = ko.observable();
            this.identifier.title = 'ЕИК/код по БУЛСТАТ';
            this.identifier.extend({
                fieldIsRequired: {
                    field: this.identifier,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsValidBULSTAT: {
                    field: this.identifier
                }
            });

            this.name.displayValue = ko.computed(function () {
                return this.name() + ", ЕИК/БУЛСТАТ " + this.identifier();
            }, this);
        }

        EntityBasicData.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return EntityBasicData;

    }
);