define('iama/SeaWorkCompetenciesList',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'iama/SeaWorkCompetencyGroups'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        SeaWorkCompetencyGroups) {

        var SeaWorkCompetenciesList = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Списък на придобитите правоспособности за работа по море';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1142';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.seaWorkCompetencyGroups = ko.observable(new SeaWorkCompetencyGroups());
            this.seaWorkCompetencyGroups.seaWorkLists = ko.observableArray([]);
            var self = this;
            datacontext.getSeaWorkCompetencyGroups(self.seaWorkCompetencyGroups.seaWorkLists)
                                   .then(function () {
                                       //self.seaWorkCompetencyGroups(new SeaWorkCompetencyGroups());
                                       self.seaWorkCompetencyGroups().seaWorkCompetencyGroup.nomSeaWorkCompetencyGroups(ko.utils.arrayMap(self.seaWorkCompetencyGroups.seaWorkLists(), function (item) {
                                           item.selectedCompetencyGroup = ko.observable();
                                           if (gp.isLoadingDocument === true) {
                                               item.selectedCompetencyGroup(ko.utils.arrayFirst(self.seaWorkCompetencyGroups().seaWorkCompetencyGroup(), function (checkedItem) {
                                                   if (item.code() == checkedItem.code())
                                                       return item;
                                               }));
                                           }
                                           return item;
                                       }));
                                   });
        }
        SeaWorkCompetenciesList.prototype = function () {
            var toJSON = function () {
                if (this.seaWorkCompetencyGroups !== undefined &&
                    (this.seaWorkCompetencyGroups.seaWorkCompetencyGroup == undefined ||
                    this.seaWorkCompetencyGroups.seaWorkCompetencyGroup.length == 0)) {
                    this.seaWorkCompetencyGroups = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return SeaWorkCompetenciesList;

    });