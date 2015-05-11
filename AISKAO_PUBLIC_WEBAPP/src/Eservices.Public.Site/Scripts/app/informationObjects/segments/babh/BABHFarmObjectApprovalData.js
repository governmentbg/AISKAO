define('babh/BABHFarmObjectApprovalData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var BABHFarmObjectApprovalData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за полученото одобрение на заявление за регистрация на животновъден обект';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1434';
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    farmObjectApprovingProtocol: 'BABHFarmObjectApprovingProtocol',
                    farmObjectApprovingComission: 'BABHFarmObjectApprovingComission'
                }
            };

            this.farmObjectApprovingProtocol = ko.observable();
            this.farmObjectApprovingProtocol.title = "Протокол (от дата), одобряващ регистрация на животновъден обект";

            this.farmObjectApprovingComission = ko.observable();
            this.farmObjectApprovingComission.title = "Заповед за назначаване на комисията, одобрила регистрацията на животновъден обект";

            this.vetRegistrationNumber = ko.observable();
            this.vetRegistrationNumber.tile = "Ветеринарен регистрационен номер";

        }

        BABHFarmObjectApprovalData.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return BABHFarmObjectApprovalData;

    });