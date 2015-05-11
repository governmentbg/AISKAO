define('iama/Competencies',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'iama/Competency'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        Competency) {

        var Competencies = function () {
            this.competency = ko.observableArray([]);
            this.competency.isLoading = ko.observable(false);

            this.competency.competencyList = ko.observableArray([]);
            this.competency.nomCompetencies = ko.observableArray([]);
            this.competency.groupCode = ko.observable();
            this.competency.groupCode.subscribe(this.changeCompetencyGroups, this);
            //this.competency.groupCode.subscribtion = this.competency.groupCode.subscribe(this.changeCompetencyGroups, this);
            if (gp.isLoadingDocument === true) {
                this.competency.groupCode.subscribe(this.initCompetencies, this);
            }

        }

        Competencies.prototype = function () {
            var createCompetency = function () {
                return new Competency();
            },
            initCompetencies = function () {
                if (gp.isLoadingDocument === true) {
                    var self = this;
                    self.competency.isLoading(true);
                    if (self.competency.groupCode()) {
                        datacontext.getSeaWorkCompetencies(self.competency.groupCode(), self.competency.competencyList)
                            .then(function () {
                                    self.competency.nomCompetencies(ko.utils.arrayMap(self.competency.competencyList(), function (item) {
                                        item.selectedCompetency = ko.observable();
                                        item.selectedCompetency(ko.utils.arrayFirst(self.competency(), function (checkedItem) {
                                            if (item.name() == checkedItem.name())
                                                return item;
                                        }));
                                        return item;
                                    }));
                                    self.competency.isLoading(false);
                            });
                    }
                }
            },
            changeCompetencyGroups = function () {
                if (gp.isLoadingDocument === false) {
                    var self = this;
                    if (this.competency.groupCode()) {
                        datacontext.getSeaWorkCompetencies(self.competency.groupCode(), self.competency.competencyList)
                                .then(function () {
                                    self.competency.nomCompetencies(ko.utils.arrayMap(self.competency.competencyList(), function (item) {
                                        item.selectedCompetency = ko.observable();
                                        return item;
                                    }));
                                });
                    }
                }
            },
            changeCompetency = function (data, selectedItem) {
                var selectedCompetency = ko.utils.arrayFirst(data.competency(), function (item) {
                    return item.name() == selectedItem.name()
                });
                if (!selectedCompetency) {
                    selectedCompetency = new Competency();
                    selectedCompetency.name(selectedItem.name());
                    data.competency.push(selectedCompetency);
                    selectedItem.selectedCompetency(selectedCompetency);
                } else {
                    ko.utils.arrayRemoveItem(data.competency(), selectedCompetency);
                    selectedItem.selectedCompetency(undefined);
                }
                return true;
            }
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                changeCompetency: changeCompetency,
                createCompetency: createCompetency,
                initCompetencies: initCompetencies,
                changeCompetencyGroups: changeCompetencyGroups,
                toJSON: toJSON
            }
        }();

        return Competencies;

    });