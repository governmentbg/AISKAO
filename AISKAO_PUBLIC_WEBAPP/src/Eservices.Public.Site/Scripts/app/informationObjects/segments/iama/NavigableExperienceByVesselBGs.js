define('iama/NavigableExperienceByVesselBGs',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'iama/NavigableExperienceByVesselBG'],
    function (ko, Utils,
        gp,
        Enums,
        NavigableExperienceByVesselBG) {

        var NavigableExperienceByVesselBGs = function () {

            this.navigableExperienceByVesselBG = ko.observableArray([]);
        }

        NavigableExperienceByVesselBGs.prototype = function () {
            var createNavigableExperienceByVesselBG = function () {
                return new NavigableExperienceByVesselBG();
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                createNavigableExperienceByVesselBG: createNavigableExperienceByVesselBG,
                toJSON: toJSON
            }
        }();

        return NavigableExperienceByVesselBGs;

    });