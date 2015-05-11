define('iama/SeaWorkRestrictions',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var SeaWorkRestrictions = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Ограничения за работа на определен тип кораб';
            //this._settings.xmlns = 'http://ereg.egov.bg/value/R-1140';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.seaWorkRestriction = ko.observableArray([]);
            this.seaWorkRestriction.nomSeaWorkRestrictions = ko.observable(Enums.seaWorkRestrictions);
        }

        SeaWorkRestrictions.prototype = function () {
            var getSeaWorkRestrictionName = function (data) {
                var seaWorkName = ko.utils.arrayFirst(Enums.seaWorkRestrictions, function (item) {
                    if (item.key == data) {
                        return item;
                    }
                });
                return seaWorkName.name;
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                getSeaWorkRestrictionName: getSeaWorkRestrictionName,
                toJSON: toJSON
            }
        }();

        return SeaWorkRestrictions;

    });