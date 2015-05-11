define('regix/Status',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var Status = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Статус';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/RCH//ForeignIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.statusName = ko.observable();
            this.statusName.title = "Наименование на статут на пребиваване в РБ";

            this.statusNameLatin = ko.observable();
            this.statusNameLatin.title = "Наименование на статут на пребиваване в РБ на латиница език";

            this.dateFrom = ko.observable();
            this.dateFrom.title = "Срок на пребиваване в РБ - начална дата";
            this.dateFrom.extend({
                fieldIsDate: {
                    field: this.dateFrom
                }
            });

            this.dateTo = ko.observable();
            this.dateTo.title = "Срок на пребиваване в РБ - крайна дата";
            this.dateTo.extend({
                fieldIsDate: {
                    field: this.dateTo
                }
            });

        }

        Status.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return Status;

    });