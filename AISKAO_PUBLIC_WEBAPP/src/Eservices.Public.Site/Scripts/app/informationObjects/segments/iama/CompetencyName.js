define('iama/CompetencyName',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var CompetencyName = function () {

            this.name = ko.observable();
        }

        CompetencyName.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                toJSON: toJSON
            }
        }();

        return CompetencyName;

    });