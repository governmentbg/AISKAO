define('common/ElectronicServiceApplicant',
    ['ko', 'Utils', 'Enums', 'GlobalParameters', 'common/RecipientGroup'],
    function (ko, Utils, Enums, gp, RecipientGroup) {

        var ElectronicServiceApplicant = function () {
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000016';
            this._settings.sectionTitle = "Заявител на електронна административна услуга";
            this._settings.options = {
                xmlns: this._settings.xmlns,
                propertiesTitles: {
                    recipientGroups: 'RecipientGroup'
                }
            };


            this.recipientGroups = ko.observableArray([new RecipientGroup()]);

            this.emailAddress = ko.observable();
            this.emailAddress.title = 'Eлектронна поща';
            this.emailAddress.extend({
                fieldIsRequired: {
                    field: this.emailAddress,
                    sectionTitle: this._settings.sectionTitle
                },
                fieldIsValidEmail: {
                    field: this.emailAddress
                }
            });

            this.recipientGroups.isAuthorEqualsRecipient = ko.observable();
            this.recipientGroups.isAuthorEqualsRecipient.subscribe(this.authorEqualsRecipient, this);
            this.recipientGroups.isAuthorEqualsRecipient(!gp.isLoadingDocument);
        };

        ElectronicServiceApplicant.prototype = function () {
            var createRecipientGroup = function () {
                return new RecipientGroup();
            },
            removeRecipientGroup = function (value) {
                if (this.recipientGroups().length > 1) {
                    this.recipientGroups.remove(value);
                }
            },
            addRecipientGroup = function () {
                this.recipientGroups.push(new RecipientGroup());
            },
            authorEqualsRecipient = function (newValue) {
                if (gp.isLoadingDocument === false) {
                    this.recipientGroups([]);
                    var recipientGr = new RecipientGroup();
                    if (newValue) {
                        recipientGr.authors.selectedAuthorType.subscribe(recipientGr.ensureSameAuthorAndRecipient, recipientGr);
                    }
                    this.recipientGroups.push(recipientGr);
                }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createRecipientGroup: createRecipientGroup,
                addRecipientGroup: addRecipientGroup,
                removeRecipientGroup: removeRecipientGroup,
                authorEqualsRecipient: authorEqualsRecipient,
                toJSON: toJSON
            };
        }();

        return ElectronicServiceApplicant;
    }
);