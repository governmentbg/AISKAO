define('regix/StatusType',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var StatusType = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Входни данни за справка с данни за чуждестранно физическо лице от Единния регистър за чужденци';
            this._settings.xmlns = 'http://egov.bg/RegiX/AV/TR/ActualStateResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.testStatusType = ko.observable();
            this.testStatusType.title = "Статус на партида";
            this.testStatusType.nomTestStatusTypes = ko.observableArray(Enums.testStatusTypes);
            this.testStatusType.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.testStatusType.subscribe(this.initTestStatusType, this);
            }
        }

        StatusType.prototype = function () {
            var initTestStatusType = function () {
                if (gp.isLoadingDocument === true) {
                    var testStatusTypeCode = this.testStatusType();
                    if (testStatusTypeCode) {
                        this.testStatusType.displayValue(ko.utils.arrayFirst(this.testStatusType.nomTestStatusTypes(), function (item) {
                            if (item.key === testStatusTypeCode) {
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
                initTestStatusType: initTestStatusType,
                toJSON: toJSON
            }
        }();

        return StatusType;

    });