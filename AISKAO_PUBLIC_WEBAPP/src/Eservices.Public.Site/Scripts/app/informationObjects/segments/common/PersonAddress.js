define('common/PersonAddress',
    ['ko', 'GlobalParameters', 'Enums', 'Utils'],
    function (ko, gp, Enums, Utils) {

        var PersonAddress = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Адрес на физическо лице';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000094';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.districtGRAOCode = ko.observable();
            this.districtGRAOCode.nomDistricts = ko.observableArray();
            this.districtGRAOCode.title = "Код на област (ЕСГРАОН)";
            this.districtGRAOCode.extend({
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.districtGRAOCode,
                    dataPackField: 'code',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Класификатор на административно-териториални и териториални единици (ЕСГРАОН)',
                    dataPackValues: this.districtGRAOCode.nomDistricts
                },
                fieldExactLength: {
                    field: this.districtGRAOCode,
                    exactLength: 2
                },
                fieldCharsAllowed: {
                    field: this.districtGRAOCode,
                    charsAllowed: 'цифри',
                    pattern: "^\\d+$"
                },
                fieldIsRequired: {
                    field: this.districtGRAOCode,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.districtGRAOName = ko.observable();
            this.districtGRAOName.nomDistricts = ko.observableArray();
            this.districtGRAOName.title = "Област (ЕСГРАОН)";
            this.districtGRAOName.extend({
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.districtGRAOName,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Класификатор на административно-териториални и териториални единици (ЕСГРАОН)',
                    dataPackValues: this.districtGRAOName.nomDistricts
                },
                fieldExactLength: {
                    field: this.districtGRAOName,
                    exactLength: 25
                },
                fieldIsRequired: {
                    field: this.districtGRAOName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.municipalityGRAOCode = ko.observable();
            this.municipalityGRAOCode.nomMunicipalities = ko.observableArray();
            this.municipalityGRAOCode.title = "Код на община (ЕСГРАОН)";
            this.municipalityGRAOCode.extend({
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.municipalityGRAOCode,
                    dataPackField: 'code',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Класификатор на административно-териториални и териториални единици (ЕСГРАОН)',
                    dataPackValues: this.municipalityGRAOCode.nomMunicipalities
                },
                fieldExactLength: {
                    field: this.municipalityGRAOCode,
                    exactLength: 2
                },
                fieldCharsAllowed: {
                    field: this.municipalityGRAOCode,
                    charsAllowed: 'цифри',
                    pattern: "^\\d+$"
                },
                fieldIsRequired: {
                    field: this.municipalityGRAOCode,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.municipalityGRAOName = ko.observable();
            this.municipalityGRAOName.nomMunicipalities = ko.observableArray();
            this.municipalityGRAOName.title = "Община (ЕСГРАОН)";
            this.municipalityGRAOName.extend({
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.municipalityGRAOName,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Класификатор на административно-териториални и териториални единици (ЕСГРАОН)',
                    dataPackValues: this.municipalityGRAOName.nomMunicipalities
                },
                fieldExactLength: {
                    field: this.municipalityGRAOName,
                    exactLength: 25
                },
                fieldIsRequired: {
                    field: this.municipalityGRAOName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.settlementGRAOCode = ko.observable();
            this.settlementGRAOCode.nomSettlements = ko.observableArray();
            this.settlementGRAOCode.title = "Код на населено място (ЕСГРАОН)";
            this.settlementGRAOCode.extend({
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.settlementGRAOCode,
                    dataPackField: 'code',
                    dataPackFieldTitle: 'Code',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Класификатор на административно-териториални и териториални единици (ЕСГРАОН)',
                    dataPackValues: this.settlementGRAOCode.nomSettlements
                },
                fieldExactLength: {
                    field: this.settlementGRAOCode,
                    exactLength: 5
                },
                fieldCharsAllowed: {
                    field: this.settlementGRAOCode,
                    charsAllowed: 'цифри',
                    pattern: "^\\d+$"
                },
                fieldIsRequired: {
                    field: this.settlementGRAOCode,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.settlementGRAOName = ko.observable();
            this.settlementGRAOName.nomSettlements = ko.observableArray();
            this.settlementGRAOName.title = "Населено място (ЕСГРАОН)";
            this.settlementGRAOName.extend({
                fieldIsFromDataPack: {
                    sectionTitle: this._settings.sectionTitle,
                    field: this.settlementGRAOName,
                    dataPackField: 'name',
                    dataPackFieldTitle: 'Name',
                    dataPackTitle: 'Данни за области, общини, кметства и населени места от Класификатор на административно-териториални и териториални единици (ЕСГРАОН)',
                    dataPackValues: this.settlementGRAOName.nomSettlements
                },
                fieldExactLength: {
                    field: this.settlementGRAOName,
                    exactLength: 25
                },
                fieldIsRequired: {
                    field: this.settlementGRAOName,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.streetGRAOCode = ko.observable();
            this.streetGRAOCode.title = "Код на улица";
            this.streetGRAOCode.extend({
                fieldExactLength: {
                    field: this.streetGRAOCode,
                    exactLength: 5
                },
                fieldCharsAllowed: {
                    field: this.streetGRAOCode,
                    charsAllowed: 'цифри',
                    pattern: "^\\d+$"
                }
            });

            this.streetText = ko.observable();
            this.streetText.title = "ул./бул./пл./ж.к./кв.";
            this.streetText.extend({
                fieldMaxLength: {
                    field: this.streetText,
                    maxLength: 30
                }
            });

            this.buildingNumber = ko.observable();
            this.buildingNumber.title = "Номер на сграда";
            this.buildingNumber.extend({
                fieldMaxLength: {
                    field: this.buildingNumber,
                    maxLength: 4
                },
                fieldCharsAllowed: {
                    field: this.buildingNumber,
                    charsAllowed: 'цифри и букви на кирилица',
                    pattern: "^[А-я]{3}[0-9]{2}$"
                }
            });

            this.entrance = ko.observable();
            this.entrance.title = "Вход";
            this.entrance.extend({
                fieldMaxLength: {
                    field: this.entrance,
                    maxLength: 2
                },
                fieldIsValidEntrance: {
                    field: this.entrance,
                    charsAllowed: 'цифри и букви на кирилица',
                    pattern: "^[А-я]{3}[0-9]{2}$"
                }
            });

            this.floor = ko.observable();
            this.floor.title = "Етаж";
            this.floor.extend({
                fieldMaxLength: {
                    field: this.floor,
                    maxLength: 2
                },
                fieldIsValidEntrance: {
                    field: this.floor,
                    charsAllowed: 'цифри',
                    pattern: "^\\d+$"
                }
            });

            this.apartment = ko.observable();
            this.apartment.title = "Апартамент";
            this.apartment.extend({
                fieldMaxLength: {
                    field: this.apartment,
                    maxLength: 2
                },
                fieldIsValidEntrance: {
                    field: this.apartment,
                    charsAllowed: 'цифри',
                    pattern: "^\\d+$"
                }
            });

        }
        PersonAddress.prototype = function () {
                    var toJSON = function () {
                        return Utils.toJSONForXML(this, this._settings.options);
                    }
                return {
                    toJSON: toJSON
                }
            }();

            return PersonAddress;
        }
);

