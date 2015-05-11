define('iama/SeaWorkCompetencyGroup',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext',
    'iama/Competencies'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext,
        Competencies) {

        var SeaWorkCompetencyGroup = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.code = ko.observable();
            this.code.nomCompetencyGroups = ko.observableArray();
            this.code.subscribe(this.changeCompetencyGroups, this);
            if (gp.isLoadingDocument === true) {
                this.code.subscribe(this.initCompetencyGroups, this);
            }
            this.code.title = "Код на група правоспособности за плаване по море";

            this.name = ko.observable();
            this.name.nomCompetencyGroups = ko.observableArray();
            this.name.title = "Наименование на група правоспособности за плаване по море";

            this.competencies = ko.observable(new Competencies());
        }

        SeaWorkCompetencyGroup.prototype = function () {
            var initCompetencyGroups = function () {
                if (gp.isLoadingDocument === true) {
                    this.competencies().competency.groupCode(this.code());
                }
            },
            changeCompetencyGroups = function (newValue) {
                if (gp.isLoadingDocument === false) {
                    var self = this;
                    if (newValue) {
                        this.code(newValue);
                        //this.competencies(new Competencies());
                        this.competencies().competency.groupCode(newValue);
                    }
                    else if (!newValue) {
                        this.competencies(undefined);
                    }
                }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initCompetencyGroups: initCompetencyGroups,
                changeCompetencyGroups: changeCompetencyGroups,
                toJSON: toJSON
            }
        }();

        return SeaWorkCompetencyGroup;

    });