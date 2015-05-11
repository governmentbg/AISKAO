define('babh/ForageForTransportationByFormDatas',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageForTransportationByFormData'],
    function (ko, Utils,
        gp,
        Enums,
        ForageForTransportationByFormData) {

        var ForageForTransportationByFormDatas = function () {

            this.forageForTransportationByFormData = ko.observableArray([new ForageForTransportationByFormData()]);
        }

        ForageForTransportationByFormDatas.prototype = function () {
            var createForageForTransportationByFormData = function () {
                return new ForageForTransportationByFormData();
            },
             addForageForTransportationByFormData = function (data) {
                this.forageForTransportationByFormData.push(new ForageForTransportationByFormData());
            },
             removeForageForTransportationByFormData = function (value) {
                 if (this.forageForTransportationByFormData().length > 1) {
                     this.forageForTransportationByFormData.remove(value);
                 }
             },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                createForageForTransportationByFormData: createForageForTransportationByFormData,
                addForageForTransportationByFormData: addForageForTransportationByFormData,
                removeForageForTransportationByFormData: removeForageForTransportationByFormData,
                toJSON: toJSON
            }
        }();

        return ForageForTransportationByFormDatas;

    });