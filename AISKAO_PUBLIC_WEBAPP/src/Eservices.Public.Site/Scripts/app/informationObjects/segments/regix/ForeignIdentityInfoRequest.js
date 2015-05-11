define('regix/ForeignIdentityInfoRequest',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums'],
    function (ko, Utils,
        gp,
        Enums) {

        var ForeignIdentityInfoRequest = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Входни данни за справка с данни за чуждестранно физическо лице от Единния регистър за чужденци';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/RCH/ForeignIdentityInfoRequest';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.identifierType = ko.observable();
            this.identifierType.nomIdentifierTypes = ko.observableArray(Enums.identifierType);
            this.identifierType.displayValue = ko.observable();
            if (gp.isLoadingDocument === true) {
                this.identifierType.subscribe(this.initIdentifierType, this);
            }
            this.identifierType.title = "Тип на идентификатор";

            this.identifier = ko.observable();
            this.identifier.title = "ЕГН или ЛНЧ";
            var self = this;
            this.identifier.extend({
                fieldIsValidLNCH: {
                    params: {
                        field: this.identifier,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return (self.identifierType() === 'LNCh')
                    }
                },
                fieldIsValidEGN: {
                    params: {
                        field: this.identifier,
                        sectionTitle: this._settings.sectionTitle
                    },     
                    onlyIf: function () {
                        return (self.identifierType() === 'EGN')
                    }
                }
            });
        };

        ForeignIdentityInfoRequest.prototype = function () {
            var initIdentifierType = function () {
                if (gp.isLoadingDocument === true) {
                    var identifierTypeCode = this.identifierType();
                    if (identifierTypeCode) {
                        this.identifierType.displayValue(ko.utils.arrayFirst(this.identifierType.nomIdentifierTypes(), function (item) {
                            if (item.key === identifierTypeCode) {
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
                initIdentifierType: initIdentifierType,
               // changeIdentifier: changeIdentifier,
                toJSON: toJSON
            }
        }();

        return ForeignIdentityInfoRequest;

    });