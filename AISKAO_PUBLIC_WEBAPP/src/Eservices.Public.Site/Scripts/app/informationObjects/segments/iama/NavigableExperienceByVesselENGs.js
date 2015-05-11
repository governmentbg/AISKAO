define('iama/NavigableExperienceByVesselENGs',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'iama/NavigableExperienceByVesselENG'],
    function (ko, Utils,
        gp,
        Enums,
        NavigableExperienceByVesselENG) {

        var NavigableExperienceByVesselENGs = function () {

            this.navigableExperienceByVesselENG = ko.observableArray([]);
        }

        NavigableExperienceByVesselENGs.prototype = function () {
            var createNavigableExperienceByVesselENG = function () {
                return new NavigableExperienceByVesselENG();
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                createNavigableExperienceByVesselENG: createNavigableExperienceByVesselENG,
                toJSON: toJSON
            }
        }();

        return NavigableExperienceByVesselENGs;

    });