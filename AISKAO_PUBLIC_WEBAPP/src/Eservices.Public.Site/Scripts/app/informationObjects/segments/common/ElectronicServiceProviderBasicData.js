define('common/ElectronicServiceProviderBasicData',
    ['ko', 'GlobalParameters', 'common/EntityBasicData', 'Enums', 'Utils'],
    function (ko, gp, EntityBasicData, Enums, Utils) {

        var ElectronicServiceProviderBasicData = function () {
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000002';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.entityBasicData = ko.observable(new EntityBasicData());

            this.electronicServiceProviderType = ko.observable();
            this.electronicServiceProviderType.electronicServiceProviderTypes = ko.observableArray(Enums.electronicServiceProviderTypes);
            this.electronicServiceProviderType.selectedElectronicServiceProviderType = ko.observable();
            this.electronicServiceProviderType.subscribe(this.initElectronicServiceProviderType, this);
            this.electronicServiceProviderType.title = 'Вид на доставчик на електронни административни услуги';
            this.electronicServiceProviderType.extend({
                fieldIsFromEnum: {
                    field: this.electronicServiceProviderType,
                    nomenclatureTitle: 'Номенклатура на видовете доставчици на електронни административни услуги',
                    nomenclatureValues: Enums.electronicServiceProviderTypes
                }
            });
        }

        ElectronicServiceProviderBasicData.prototype = function () {
            var initElectronicServiceProviderType = function () {
                if (gp.isLoadingDocument == true) {
                    var providerType = this.electronicServiceProviderType(),
                        nomVals = this.electronicServiceProviderType.electronicServiceProviderTypes();
                    if (providerType) {
                        this.electronicServiceProviderType.selectedElectronicServiceProviderType(ko.utils.arrayFirst(nomVals, function (item) {
                            if (item.key === providerType) {
                                return item;
                            }
                        }));
                    }
                }
            },
            initElectronicServiceProvider = function(providerData) {
                var self = this;
                var localProviderEntityData = new EntityBasicData();
                localProviderEntityData.name(providerData.providerEntityName); //('Община Велико Търново');
                localProviderEntityData.identifier(providerData.providerEntityId); //('000133634');
            
                self.entityBasicData(localProviderEntityData);
                self.electronicServiceProviderType('0006-000031');
                self.electronicServiceProviderType.selectedElectronicServiceProviderType(ko.utils.arrayFirst(Enums.electronicServiceProviderTypes, function (item) {
                    if (item.key === '0006-000031') {
                        return item;
                    }
                }));

                return self;
            },
                toJSON = function () {
                    //if (this.electronicServiceProviderType) {
                    //    this.electronicServiceProviderType = this.electronicServiceProviderType.key;
                    //}
                    return Utils.toJSONForXML(this, this._settings.options);
                };
            return {
                initElectronicServiceProviderType: initElectronicServiceProviderType,
                initElectronicServiceProvider: initElectronicServiceProvider,
                toJSON: toJSON
            }
        }();

        return ElectronicServiceProviderBasicData;

    }
);