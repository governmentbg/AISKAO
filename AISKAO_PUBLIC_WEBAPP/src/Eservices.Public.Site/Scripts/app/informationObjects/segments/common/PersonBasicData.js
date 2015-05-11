define('common/PersonBasicData',
    ['ko', 'common/PersonNames', 'common/PersonIdentifier', 'GlobalParameters', 'Enums', 'Utils'],
    function (ko, PersonNames, PersonIdentifier, gp, Enums, Utils) {

        var PersonBasicData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Основни данни за физическо лице';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000008';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            //properties
            this.names = ko.observable(new PersonNames());
            this.names.title = 'Имена на физическо лице';
            this.names.extend({
                fieldIsRequired: {
                    field: this.names,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.identifier = ko.observable(new PersonIdentifier());
            this.identifier.title = 'Идентификатор на физическо лице';
            this.identifier.extend({
                fieldIsRequired: {
                    field: this.identifier,
                    sectionTitle: this._settings.sectionTitle
                }
            });

            this.identifier.identifierTypes = ko.observableArray(Enums.identifierTypes);
            this.identifier.selectedIdentifierType = ko.observable();
            this.identifier.selectedIdentifierType(ko.utils.arrayFirst(this.identifier.identifierTypes(), function (item) {
                if (item.key === 'egn') {
                    return item;
                };
            }));
            var self = this;
            this.identifier().egn.extend({
                fieldIsRequired: {
                    params:{
                        field: this.identifier().egn,
                        sectionTitle: this._settings.sectionTitle,
                    },
                    onlyIf: function () {
                        return self.identifier.selectedIdentifierType() !== undefined && self.identifier.selectedIdentifierType().key === "egn";
                    }
                }
            });
            this.identifier().lnch.subscribe(this.initIdentifier, this);
            this.identifier().egn.subscribe(this.initIdentifier, this);
            this.identifier.subscribtion = this.identifier.selectedIdentifierType.subscribe(this.changeIdentifier, this);
        }

        PersonBasicData.prototype = function () {
            var initIdentifier = function () {
                if (gp.isLoadingDocument === true) {
                    this.identifier.subscribtion.dispose();
                    var idLnch = this.identifier().lnch(),
                        nomVals = this.identifier.identifierTypes();
                    if (idLnch) {
                        this.identifier.selectedIdentifierType(ko.utils.arrayFirst(nomVals, function (item) {
                            if (item.key === 'lnch') {
                                return item;
                            };
                        }));
                    } else {
                        this.identifier.selectedIdentifierType(ko.utils.arrayFirst(nomVals, function (item) {
                            if (item.key === 'egn') {
                                return item;
                            };
                        }));
                    }
                    this.identifier.selectedIdentifierType.subscribe(this.changeIdentifier, this);
                }
            },
        changeIdentifier = function () {
            if (gp.isLoadingDocument === false) {
                var self = this;
                switch (this.identifier.selectedIdentifierType().key) {
                    case "egn":
                        this.identifier().egn(this.identifier().lnch());
                        this.identifier().lnch(undefined);
                        this.identifier().egn.extend({
                            fieldIsRequired: {
                                params: {
                                    field: this.identifier().egn,
                                    sectionTitle: this._settings.sectionTitle,
                                },
                                onlyIf: function () {
                                    return self.identifier.selectedIdentifierType() !== undefined && self.identifier.selectedIdentifierType().key === "egn";
                                }
                            }
                        });
                        break;
                    case "lnch":
                        this.identifier().lnch(this.identifier().egn());
                        this.identifier().egn(undefined);
                        this.identifier().lnch.extend({
                            fieldIsRequired: {
                                params: {
                                    field: this.identifier().lnch,
                                    sectionTitle: this._settings.sectionTitle,
                                },
                                onlyIf: function () {
                                    return self.identifier.selectedIdentifierType() !== undefined && self.identifier.selectedIdentifierType().key === "lnch";
                                }
                            }
                        });
                        break;
                }
            }
        },
        toJSON = function () {
            return Utils.toJSONForXML(this, this._settings.options);
        };
            return {
                initIdentifier: initIdentifier,
                changeIdentifier: changeIdentifier,
                toJSON: toJSON
            }
        }();

        return PersonBasicData;
    }
);