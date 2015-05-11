define('common/ElectronicServiceRecipient',
    ['ko', 'Utils', 'common/PersonBasicData', 'common/ForeignCitizenBasicData', 'common/EntityBasicData', 'common/ForeignEntityBasicData'],
    function (ko, Utils, PersonBasicData, ForeignCitizenBasicData, EntityBasicData, ForeignEntityBasicData) {

        var ElectronicServiceRecipient = function () {
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000015';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.person = ko.observable();
            this.foreignPerson = ko.observable();
            this.entity = ko.observable();
            this.foreignEntity = ko.observable();
        }

        ElectronicServiceRecipient.prototype = function () {
            var createPerson = function () {
                    return new PersonBasicData();
                },
                createForeignPerson = function () {
                    return new ForeignCitizenBasicData();
                },
                createEntity = function () {
                    return new EntityBasicData();
                },
                createForeignEntity = function () {
                    return new ForeignEntityBasicData();
                },
                toJSON = function () {
                    return Utils.toJSONForXML(this, this._settings.options);
                };
            return {
                createPerson: createPerson,
                createForeignPerson: createForeignPerson,
                createEntity: createEntity,
                createForeignEntity: createForeignEntity,
                toJSON: toJSON
            }
        }();

        return ElectronicServiceRecipient;
    }
);