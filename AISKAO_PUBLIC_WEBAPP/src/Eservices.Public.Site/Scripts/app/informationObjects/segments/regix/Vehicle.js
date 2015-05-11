define('regix/Vehicle',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/PersonData',
    'regix/EntityData',
    'regix/ForeignerPersonData'],
    function (ko, Utils,
        gp,
        Enums,
        PersonData,
        EntityData,
        ForeignerPersonData) {

        var Vehicle = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за МПС';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/MPS/MotorVehicleRegistrationResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    vinNumber: 'VINNumber',
                }
            };

            this.vehicleRegistrationNumber = ko.observable();
            this.vehicleRegistrationNumber.title = "Регистрационен номер на МПС";

            this.firstRegistrationDate = ko.observable();
            this.firstRegistrationDate.title = "Дата нa първа регистрация";

            this.motorVehicleRegistrationCertificateNumber = ko.observable();
            this.motorVehicleRegistrationCertificateNumber.title = "Номер на документа";

            this.ownerPersonData = ko.observable(new PersonData());
            this.ownerPersonData.title = "Собственик на МПС - физическо лице";

            this.ownerEntityData = ko.observable(new EntityData());
            this.ownerEntityData.title = "Собственик на МПС -  юридическо лице";

            this.ownerForeignerPersonData = ko.observable(new ForeignerPersonData());
            this.ownerForeignerPersonData.title = "Собственик на МПС -  чужденец";

            this.motorVehicleType = ko.observable();
            this.motorVehicleType.title = "Вид МПС на кирилица";

            this.motorVehicleTypeLatin = ko.observable();
            this.motorVehicleTypeLatin.title = "Вид МПС на латиница";

            this.motorVehicleModel = ko.observable();
            this.motorVehicleModel.title = "Марка (модел) на кирилица";

            this.motorVehicleModelLatin = ko.observable();
            this.motorVehicleModelLatin.title = "Марка (модел) на латиница";

            this.tradeDescription = ko.observable();
            this.tradeDescription.title = "Търговско описание на кирилица";

            this.tradeDescriptionLatin = ko.observable();
            this.tradeDescriptionLatin.title = "Търговско описание на латиница";

            this.vinNumber = ko.observable();
            this.vinNumber.title = "Идентификационен номер на МПС";

            this.issueDate = ko.observable();
            this.issueDate.title = "Дата на издаване на свидетелството";

            this.category = ko.observable();
            this.category.title = "Категория на превозното средство";

            this.color = ko.observable();
            this.color.title = "Цвят на МПС на кирилица";

            this.colorLatin = ko.observable();
            this.colorLatin.title = "Цвят на МПС на латиница";

            this.engineNumber = ko.observable();
            this.engineNumber.title = "Номер на двигател";

            this.colorSecondary = ko.observable();
            this.colorSecondary.title = "Допълнителен цвят на МПС";

            this.colorSecondaryLatin = ko.observable();
            this.colorSecondaryLatin.title = "Допълнителен цвят на МПС на латиница";

        }

        Vehicle.prototype = function () {
            var createPersonData = function () {
                return new PersonData();
                },
                createEntityData = function () {
                    return new EntityData();
                },
                createForeignerPersonData = function () {
                    return new ForeignerPersonData();
                },
                toJSON = function () {
                    return Utils.toJSONForXML(this, this._settings.options);
                };
            return {
                createPersonData: createPersonData,
                createEntityData: createEntityData,
                createForeignerPersonData: createForeignerPersonData,
                toJSON: toJSON
            }
        }();

        return Vehicle;

    });