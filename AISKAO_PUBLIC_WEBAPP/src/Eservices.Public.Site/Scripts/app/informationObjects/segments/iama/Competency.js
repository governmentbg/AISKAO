define('iama/Competency',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var Competency = function () {

            this.name = ko.observable();
        }

        Competency.prototype = function () {
          var toJSON = function () {
                return Utils.toJSONForXML(this);
            };
          return {
                toJSON: toJSON
            }
        }();

        return Competency;

    });