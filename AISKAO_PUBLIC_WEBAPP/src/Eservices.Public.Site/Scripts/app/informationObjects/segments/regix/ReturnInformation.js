define('regix/ReturnInformation',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ReturnInformation = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за резултат';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/BDS/PersonalIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.returnCode = ko.observable();
            this.returnCode.nomReturnCodes = ko.observableArray(Enums.returnCodeTypes);
            this.returnCode.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.returnCode.subscribe(this.initReturnCode, this);
            }
            this.returnCode.extend({
                fieldIsFromEnum: {
                    field: this.returnCode,
                    nomenclatureTitle: 'Номенклатура за връщан код за резултат',
                    nomenclatureValues: Enums.returnCodeTypes
                }
            });

            this.info = ko.observable();
            this.info.title = "Описание на грешката";

        }

        ReturnInformation.prototype = function () {
            var initReturnCode = function () {
                 if (gp.isLoadingDocument === true) {
                     var returnCodeCode = this.returnCode();
                     if (returnCodeCode) {
                         this.returnCode.displayValue(ko.utils.arrayFirst(this.returnCode.nomReturnCodes(), function (item) {
                             if (item.key === returnCodeCode) {
                                 return item;
                             }
                         }));
                     }
                 }
             },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                initReturnCode: initReturnCode,
                toJSON: toJSON
            }
        }();

        return ReturnInformation;

    });