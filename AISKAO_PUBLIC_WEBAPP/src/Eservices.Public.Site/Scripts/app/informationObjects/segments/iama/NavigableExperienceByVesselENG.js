define('iama/NavigableExperienceByVesselENG',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var NavigableExperienceByVesselENG = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за плавателен стаж на кораб на английски език';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1093';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.vesselNameENG = ko.observable();
            this.vesselNameENG.title = 'Име на кораб на английски език';


            this.vesselIMONumberENG = ko.observable();
            this.vesselIMONumberENG.title = 'ИМО номер / УЕИН номер на английски език';


            this.navigationAreaENG = ko.observable();
            this.navigationAreaENG.title = 'Район на плаване на английски език';


            this.automationClass = ko.observable();
            this.automationClass.title = 'Клас на автоматизация';


            this.vesselGT = ko.observable();
            this.vesselGT.title = 'Характеристика на кораб - товар (GT)';


            this.vesselkW = ko.observable();
            this.vesselkW.title = 'Характеристика на кораб - мощност (kW)';


            this.vesselkVa = ko.observable();
            this.vesselkVa.title = 'Характеристика на кораб - (kVa)';


            this.vesselmPa = ko.observable();
            this.vesselmPa.title = 'Характеристика на кораб - налягане (mPa)';


            this.navigableExperienceOccupationENG = ko.observable();
            this.navigableExperienceOccupationENG.title = 'Длъжност от плавателен стаж на английски език';


            this.navigableExperienceStartDate = ko.observable();
            this.navigableExperienceStartDate.title = 'Начална дата на плавателен стаж';
            this.navigableExperienceStartDate.extend({
                fieldIsDate: {
                    field: this.navigableExperienceStartDate
                }
            });


            this.navigableExperienceEndDate = ko.observable();
            this.navigableExperienceEndDate.title = 'Крайна дата на плавателен стаж';
            this.navigableExperienceEndDate.extend({
                fieldIsDate: {
                    field: this.navigableExperienceEndDate
                }
            });


            this.navigableExperienceYearCount = ko.observable();
            this.navigableExperienceYearCount.title = 'Брой години плавателен стаж';


            this.navigableExperienceMonthCount = ko.observable();
            this.navigableExperienceMonthCount.title = 'Брой месеци плавателен стаж';


            this.navigableExperienceDayCount = ko.observable();
            this.navigableExperienceDayCount.title = 'Брой дни плавателен стаж';


            this.navigableExperiencePercentage = ko.observable();
            this.navigableExperiencePercentage.title = 'Процент признат плавателен стаж';
        }

        NavigableExperienceByVesselENG.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return NavigableExperienceByVesselENG;

    });