define('babh/ForageTransportActivityDatas',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageTransportActivityData'],
    function (ko, Utils,
        gp,
        Enums,
        ForageTransportActivityData) {

        var ForageTransportActivityDatas = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
           // this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.forageTransportActivityData = ko.observableArray([new ForageTransportActivityData()]);
        }

        ForageTransportActivityDatas.prototype = function () {
            var createForageTransportActivityData = function () {
                return new ForageTransportActivityData();
            },
            addForageTransportActivityData = function (data) {
                this.forageTransportActivityData.push(new ForageTransportActivityData());
            },
             removeForageTransportActivityData = function (value) {
                 if (this.forageTransportActivityData().length > 1) {
                     this.forageTransportActivityData.remove(value);
                 }
             },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createForageTransportActivityData: createForageTransportActivityData,
                addForageTransportActivityData: addForageTransportActivityData,
                removeForageTransportActivityData: removeForageTransportActivityData,
                toJSON: toJSON
            }
        }();

        return ForageTransportActivityDatas;

    });