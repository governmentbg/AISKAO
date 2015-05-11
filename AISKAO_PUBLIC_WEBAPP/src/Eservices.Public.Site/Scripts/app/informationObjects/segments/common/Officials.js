define('common/Officials',
    ['ko', 'Utils', 'Enums', 'GlobalParameters', 'common/PersonNames', 'common/ForeignCitizenNames'],
    function (ko, Utils, Enums, gp, PersonNames, ForeignCitizenNames) {

        var Officials = function () {

            this.personNames = ko.observable();
            this.personNames.title = "Имена на физическо лице";
            this.foreignCitizenNames = ko.observable();
            this.foreignCitizenNames.title = "Имена на физическо лице, нерегистрирано по българското законодателство";

        }

        Officials.prototype = function () {
            
            var toJSON = function () {
                return Utils.toJSONForXML(this);
            },
              createPersonNames = function () {
                  return new PersonNames();
              },
           createForeignCitizenNames = function () {
               return new ForeignCitizenNames();
           };
            return {
                toJSON: toJSON,
                createPersonNames: createPersonNames,
                createForeignCitizenNames: createForeignCitizenNames
            }
        }();

        return Officials;

    });