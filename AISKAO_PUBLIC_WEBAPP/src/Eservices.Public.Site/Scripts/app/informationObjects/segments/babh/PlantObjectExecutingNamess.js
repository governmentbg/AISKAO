define('babh/PlantObjectExecutingNamess',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'common/PersonNames'],
    function (ko, Utils,
        gp,
        Enums,
        PersonNames) {

        var PlantObjectExecutingNamess = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Имена на лице, извършващо дейността в обект';
            //this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1103';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.plantObjectExecutingNames = ko.observableArray([new PersonNames()]);
        }

        PlantObjectExecutingNamess.prototype = function () {
            var createPlantObjectExecutingNames = function () {
                return new PersonNames();
            },
             addPlantObjectExecutingNames = function (data) {
                 this.plantObjectExecutingNames.push(new PersonNames());
             },
             removePlantObjectExecutingNames = function (value) {
                 if (this.plantObjectExecutingNames().length > 1) {
                     this.plantObjectExecutingNames.remove(value);
                 }
             },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createPlantObjectExecutingNames: createPlantObjectExecutingNames,
                addPlantObjectExecutingNames: addPlantObjectExecutingNames,
                removePlantObjectExecutingNames: removePlantObjectExecutingNames,
                toJSON: toJSON
            }
        }();

        return PlantObjectExecutingNamess;

    });