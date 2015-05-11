define('babh/ForageTransportActivityData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageTransportVechicleRegistrationNumbers',
    'babh/ForageFormTypes'],
    function (ko, Utils,
        gp,
        Enums,
        ForageTransportVechicleRegistrationNumbers,
        ForageFormTypes) {

        var ForageTransportActivityData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за транспортна дейност';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1349';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageTransportVechicleType = ko.observable();
            this.forageTransportVechicleType.title = "Вид на транспортно средство";

            this.forageTransportVechicleRegistrationNumbers = ko.observable(new ForageTransportVechicleRegistrationNumbers());
            this.forageTransportVechicleRegistrationNumbers.title = "Регистрационен номер на транспортно средство";

            this.forageFormTypes = ko.observable(new ForageFormTypes());
        }

        ForageTransportActivityData.prototype = function () {
            //var initForageType = function () {
            //    if (gp.isLoadingDocument === true) {
            //        var forageTypeForTransportationCode = this.forageTypeForTransportation();
            //        if (forageTypeForTransportationCode) {
            //            this.forageTypeForTransportation.displayValue(ko.utils.arrayFirst(this.forageTypeForTransportation.nomForageTypeForTransportationTypes(), function (item) {
            //                if (item.key === forageTypeForTransportationCode) {
            //                    return item;
            //                }
            //            }));
            //        }
            //    }
            //},
            //changeForageTypeForTransportations = function (data) {
            //    var self = this;
            //    if (data.isChecked() == true) {
            //        self.forageTypeForTransportation.push(data.key);
            //    } else if (data.isChecked() == false && ko.utils.arrayIndexOf(self.forageTypeForTransportation(), data) > 0) {
            //        self.forageTypeForTransportation.remove(data.key);
            //    }
            //},
            //  getForageTypeForTransportationName = function (data) {
            //      var forageName = ko.utils.arrayFirst(this.forageTypeForTransportation.nomForageTypeForTransportationTypes(), function (item) {
            //          if (item.key == data) {
            //              return item;
            //          }
            //      });
            //      return forageName.name;
            //  },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                //initForageType: initForageType,
                //changeForageTypeForTransportations: changeForageTypeForTransportations,
                //getForageTypeForTransportationName: getForageTypeForTransportationName,
                toJSON: toJSON
            }
        }();

        return ForageTransportActivityData;

    });