define('iama/NavigationCompetences',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'iama/TakenNavalCourse'],
    function (ko, Utils,
        gp,
        Enums,
        TakenNavalCourse) {

        var NavigationCompetences = function () {

            this.navigationCompetence = ko.observableArray([]);
            this.navigationCompetence.nomNavigationCompetences = Enums.navigationCompetencies;
        }

        NavigationCompetences.prototype = function () {
            var getNavigationCompetenceName = function (data) {
                var navigationName = ko.utils.arrayFirst(Enums.navigationCompetencies, function (item) {
                    if (item.key == data) {
                        return item;
                    }
                });
                return navigationName.name;
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                getNavigationCompetenceName: getNavigationCompetenceName,
                toJSON: toJSON
            }
        }();

        return NavigationCompetences;

    });