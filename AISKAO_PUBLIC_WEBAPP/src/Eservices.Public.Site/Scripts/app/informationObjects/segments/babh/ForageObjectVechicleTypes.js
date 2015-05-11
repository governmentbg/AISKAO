define('babh/ForageObjectVechicleTypes',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForageObjectVechicleTypes = function () {
            this._settings = {};
            this._settings.sectionTitle = '';
            //this._settings.xmlns = '';
            this._settings.options = {
                xmlns: this._settings.xmlns         
            };


            this.forageObjectVechicleType = ko.observableArray([]);
            this.forageObjectVechicleType.nomForageObjectVechicleTypes = ko.observableArray(Enums.forageObjectVehicleTypes);
            this.forageObjectVechicleType.title = "Вид транспортни средства за осъществяване на дейност";
            this.forageObjectVechicleType.subscribe(this.initForageObjectVechicleType, this);
            this.forageObjectVechicleType.isChecked = ko.observable(false);
            this.forageObjectVechicleType.subscribtion = this.forageObjectVechicleType.isChecked.subscribe(this.checkForageObjectVechicleType, this);
            //this.forageObjectVechicleType.extend({
            //    fieldIsFromEnum: {
            //        field: this.forageObjectVechicleType,
            //        nomenclatureTitle: 'Номенклатура за вид транспортни средства, използвани за осъществяване на дейност',
            //        nomenclatureValues: Enums.forageObjectVehicleTypes
            //    }
            //});
        }

        ForageObjectVechicleTypes.prototype = function () {
            var getForageObjectVechicleTypeName = function (data) {
                var forageName = ko.utils.arrayFirst(Enums.forageObjectVehicleTypes, function (item) {
                    if (item.key == data) {
                        return item;
                    }
                });
                return forageName.name;
            },
            checkForageObjectVechicleType = function (data) {
                if (data == false) {
                    this.forageObjectVechicleType(undefined);
                }
            },
            initForageObjectVechicleType = function () {
                var self = this;
                this.forageObjectVechicleType.subscribtion.dispose();
                if (gp.isLoadingDocument === false && self.forageObjectVechicleType() != undefined) {
                    self.forageObjectVechicleType.isChecked(true);
                }
                self.forageObjectVechicleType.isChecked.subscribe(self.checkForageObjectVechicleType, self);
            },
            toJSON = function () {
                if (this.forageObjectVechicleType && this.forageObjectVechicleType.length === 0) {
                    this.forageObjectVechicleTypes = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                getForageObjectVechicleTypeName: getForageObjectVechicleTypeName,
                checkForageObjectVechicleType: checkForageObjectVechicleType,
                initForageObjectVechicleType: initForageObjectVechicleType,
                toJSON: toJSON
            }
        }();

        return ForageObjectVechicleTypes;

    });