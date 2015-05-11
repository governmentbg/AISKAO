define('iama/SeaWorkCompetencyGroups',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'iama/SeaWorkCompetencyGroup'],
    function (ko, Utils,
        gp,
        Enums,
        SeaWorkCompetencyGroup) {

        var SeaWorkCompetencyGroups = function () {
            this.seaWorkCompetencyGroup = ko.observableArray([]);
            this.seaWorkCompetencyGroup.nomSeaWorkCompetencyGroups = ko.observableArray([]);
        }

        SeaWorkCompetencyGroups.prototype = function () {
            var createSeaWorkCompetencyGroup = function () {
                return new SeaWorkCompetencyGroup();
            },
             changeCompetencyGroup = function (data, selectedItem) {
                var selectedCompetencyGroup = ko.utils.arrayFirst(data.seaWorkCompetencyGroup(), function (item) {
                    return item.code() == selectedItem.code()
                });
                if (!selectedCompetencyGroup) {
                    selectedCompetencyGroup = new SeaWorkCompetencyGroup();
                    selectedCompetencyGroup.code(selectedItem.code());
                    selectedCompetencyGroup.name(selectedItem.name());
                    data.seaWorkCompetencyGroup.push(selectedCompetencyGroup);
                    selectedItem.selectedCompetencyGroup(selectedCompetencyGroup);
                } else {
                    ko.utils.arrayRemoveItem(data.seaWorkCompetencyGroup(), selectedCompetencyGroup);
                    selectedItem.selectedCompetencyGroup(undefined);
                }
                return true;
             },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                createSeaWorkCompetencyGroup: createSeaWorkCompetencyGroup,
                changeCompetencyGroup: changeCompetencyGroup,
                toJSON: toJSON
            }
        }();

        return SeaWorkCompetencyGroups;

    });