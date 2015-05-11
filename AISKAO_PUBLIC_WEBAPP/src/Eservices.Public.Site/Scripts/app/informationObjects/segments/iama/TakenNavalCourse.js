define('iama/TakenNavalCourse',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'dataPackages/datacontext'],
    function (ko, Utils,
        gp,
        Enums,
        datacontext) {

        var TakenNavalCourse = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Информация за преминати курсове за специална и допълнителна подготовка на морски лица';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1190';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.navalEducationalOrganizationCode = ko.observable();
            this.navalEducationalOrganizationCode.title = "Код на учебно заведение или център, провеждащо обучение и подготовка на морски лица";
            this.navalEducationalOrganizationCode.nomNavalEducationalOrganizations = ko.observableArray();
            this.navalEducationalOrganizationCode.selectedNavalEducationalOrganization = ko.observable();
            this.navalEducationalOrganizationCode.isLoaded = ko.observable(false);
            this.navalEducationalOrganizationCode.isLoading = ko.observable(false);
            this.navalEducationalOrganizationCode.subscribe(this.initNavalEducationalOrganization, this);
            var self = this;
            self.navalEducationalOrganizationCode.isLoading(true);
            datacontext.getNavalEducationalOrganizations(this.navalEducationalOrganizationCode.nomNavalEducationalOrganizations)
                        .then(function () {
                            self.navalEducationalOrganizationCode.isLoaded(true);
                            self.navalEducationalOrganizationCode.isLoading(false);
                        });
            this.navalEducationalOrganizationCode.subscribtion = this.navalEducationalOrganizationCode.selectedNavalEducationalOrganization.subscribe(this.changeNavalEducationalOrganization, this);

            this.navalEducationalOrganizationName = ko.observable();
            this.navalEducationalOrganizationName.title = "Наименование на учебно заведение или център, провеждащ обучение и подготовка на морски лица";
            this.navalEducationalOrganizationName.nomNavalEducationalOrganizations = ko.observableArray();

            this.otherNavalEducationalOrganization = ko.observable();
            this.otherNavalEducationalOrganization.title = "Друго учебно заведение или център, провеждащо обучение и подготовка на морски лица";

            this.navalCompetencyCourseCode = ko.observable();
            this.navalCompetencyCourseCode.title = "Код на курс за специална и допълнителна подготовка на морски лица";
            this.navalCompetencyCourseCode.nomNavalCompetencyCourses = ko.observableArray();
            this.navalCompetencyCourseCode.selectedNavalCompetencyCourse = ko.observable();
            this.navalCompetencyCourseCode.isLoaded = ko.observable(false);
            this.navalCompetencyCourseCode.isLoading = ko.observable(false);
            this.navalCompetencyCourseCode.subscribe(this.initNavalCompetencyCourse, this);
            var self = this;
            self.navalCompetencyCourseCode.isLoading(true);
            datacontext.getNavalCompetencyCourses(this.navalCompetencyCourseCode.nomNavalCompetencyCourses)
                        .then(function () {
                            self.navalCompetencyCourseCode.isLoaded(true);
                            self.navalCompetencyCourseCode.isLoading(false);
                        });
            this.navalCompetencyCourseCode.subscribtion = this.navalCompetencyCourseCode.selectedNavalCompetencyCourse.subscribe(this.changeNavalCompetencyCourse, this);

            this.navalCompetencyCourseName = ko.observable();
            this.navalCompetencyCourseName.title = "Наименование на курс за специална и допълнителна подготовка на морски лица";

            this.otherNavalCompetencyCourse = ko.observable();
            this.otherNavalCompetencyCourse.title = "Друг курс за специална и допълнителна подготовка на морски лица";

            this.navalCompetencyCourseDateTaken = ko.observable();
            this.navalCompetencyCourseDateTaken.title = "Дата на завършване на курс за специална и допълнителна подготовка на морски лица";

        }

        TakenNavalCourse.prototype = function () {
            var initNavalEducationalOrganization = function () {
                var self = this;
                if (gp.isLoadingDocument === true) {
                    var aCode = self.navalEducationalOrganizationCode();
                    if (aCode) {
                        self.navalEducationalOrganizationCode.isLoading(true);
                        datacontext.getNavalEducationalOrganizations(self.navalEducationalOrganizationCode.nomNavalEducationalOrganizations)
                                .then(function () {
                                    self.navalEducationalOrganizationCode.subscribtion.dispose();
                                    self.navalEducationalOrganizationCode.isLoading(false);
                                    self.navalEducationalOrganizationCode.selectedNavalEducationalOrganization(ko.utils.arrayFirst(self.navalEducationalOrganizationCode.nomNavalEducationalOrganizations(), function (item) {
                                        if (item.code && item.code() === aCode) {
                                            return item;
                                        }
                                    }));
                                    self.navalEducationalOrganizationCode.selectedNavalEducationalOrganization.subscribe(self.changeNavalEducationalOrganization, self);
                                });
                    }
                }
            },
       changeNavalEducationalOrganization = function (newValue) {
           if (gp.isLoadingDocument === false) {
               if (newValue) {
                   this.navalEducationalOrganizationCode(newValue.code());
                   this.navalEducationalOrganizationName(newValue.name());
               }
                   if (newValue.code() != "13") {
                       this.otherNavalEducationalOrganization(undefined);
                   }
               }
       },
             initNavalCompetencyCourse = function () {
                var self = this;
                if (gp.isLoadingDocument === true) {
                    var aCode = self.navalCompetencyCourseCode();
                    if (aCode) {
                        self.navalCompetencyCourseCode.isLoading(true);
                        datacontext.getNavalCompetencyCourses(self.navalCompetencyCourseCode.nomNavalCompetencyCourses)
                                .then(function () {
                                    self.navalCompetencyCourseCode.subscribtion.dispose();
                                    self.navalCompetencyCourseCode.isLoading(false);
                                    self.navalCompetencyCourseCode.selectedNavalCompetencyCourse(ko.utils.arrayFirst(self.navalCompetencyCourseCode.nomNavalCompetencyCourses(), function (item) {
                                        if (item.code && item.code() === aCode) {
                                            return item;
                                        }
                                    }));
                                    self.navalCompetencyCourseCode.selectedNavalCompetencyCourse.subscribe(self.changeNavalCompetencyCourse, self);
                                });
                    }
                }
            },
            changeNavalCompetencyCourse = function (newValue) {
                if (gp.isLoadingDocument === false) {
                    if (newValue) {
                        this.navalCompetencyCourseCode(newValue.code());
                        this.navalCompetencyCourseName(newValue.name());
                    }
                        if (newValue.code() != "60") {
                            this.otherNavalCompetencyCourse(undefined);
                        }
                    }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initNavalEducationalOrganization: initNavalEducationalOrganization,
                changeNavalEducationalOrganization: changeNavalEducationalOrganization,
                initNavalCompetencyCourse: initNavalCompetencyCourse,
                changeNavalCompetencyCourse: changeNavalCompetencyCourse,
                toJSON: toJSON
            }
        }();

        return TakenNavalCourse;

    });