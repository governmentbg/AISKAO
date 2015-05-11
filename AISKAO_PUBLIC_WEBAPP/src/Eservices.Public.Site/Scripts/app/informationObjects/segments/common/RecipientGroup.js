define('common/RecipientGroup',
    ['ko',
     'common/ElectronicServiceRecipient',
     'common/ElectronicStatementAuthor',
     'common/PersonBasicData',
     'common/ForeignCitizenBasicData',
     'common/EntityBasicData',
     'common/ForeignEntityBasicData',
     'GlobalParameters',
     'Enums',
     'Utils'],
    function (ko, ElectronicServiceRecipient, ElectronicStatementAuthor, PersonBasicData, ForeignCitizenBasicData, EntityBasicData, ForeignEntityBasicData, gp, Enums, Utils) {

        var RecipientGroup = function () {
            this._settings = {};
            //this._settings.loading = false;
            this._settings.options = {
                propertiesTitles: {
                    authors: 'Author',
                    recipients: 'Recipient'
                }
            };

            this.authors = ko.observableArray([new ElectronicStatementAuthor().person(new PersonBasicData())]);
            //this.authors.createAuthor = ko.observable();
            //this.authors.createAuthor(function () {
            //    return new ElectronicStatementAuthor();
            //});
            this.authorQuality = ko.observable();
            this.authorQuality.title = 'Качество, в което авторът действа от името на титуляра и обем на представителната власт';
            this.authorQuality.extend({
                fieldCharsAllowed: {
                    field: this.authorQuality,
                    charsAllowed: 'кирилица, цифри и символите интервал, ‘ (апостроф), – (тире) , запетая, . (точка), ? (въпросителна), ! (удивителна), : (двоеточие), % (процент), ( (лява кръгла скоба), ) (дясна кръгла скоба), " (кавички")',
                    pattern: "^[А-я0-9' \\-,.?!:%()\"]*$"
                }
            });

            this.recipients = ko.observableArray([new ElectronicServiceRecipient().person(new PersonBasicData())]);

            this.recipients.recipientTypes = ko.observableArray(ko.utils.arrayPushAll(ko.utils.arrayPushAll([], Enums.personTypes), Enums.entityTypes));
            this.recipients.selectedRecipientType = ko.observable();

            this.authors.authorTypes = ko.observableArray(Enums.personTypes);
            this.authors.selectedAuthorType = ko.observable();
        }

        RecipientGroup.prototype = function () {
            var createAuthor = function () {
                //this._settings.loading = true;
                return new ElectronicStatementAuthor();
            },
            removeAuthor = function (value) {
                this.authors.remove(value);
            },
            addAuthor = function (data) {
                if (gp.isLoadingDocument === false) {
                    switch (data.key) {
                        case "person":
                            //this.authors([]);
                            this.authors([new ElectronicStatementAuthor().person(new PersonBasicData())]);
                            break;
                        case "foreignPerson":
                            //this.authors([]);
                            this.authors([new ElectronicStatementAuthor().foreignCitizen(new ForeignCitizenBasicData())]);
                            break;
                    }
                }
            },
            createRecipient = function () {
                //this._settings.loading = true;
                return new ElectronicServiceRecipient();
            },
            removeRecipient = function (value) {
                this.recipients.remove(value);
            },
            addRecipient = function (data) {
                if (gp.isLoadingDocument === false) {
                    switch (data.key) {
                        case "person":
                            //this.recipients([]);
                            this.recipients([new ElectronicServiceRecipient().person(new PersonBasicData())]);
                            break;
                        case "foreignPerson":
                            //this.recipients([]);
                            this.recipients([new ElectronicServiceRecipient().foreignPerson(new ForeignCitizenBasicData())]);
                            break;
                        case "entity":
                            //this.recipients([]);
                            this.recipients([new ElectronicServiceRecipient().entity(new EntityBasicData())]);
                            break;
                        case "foreignEntity":
                            //this.recipients([]);
                            this.recipients([new ElectronicServiceRecipient().foreignEntity(new ForeignEntityBasicData())]);
                            break;
                    }
                }
            },
            ensureSameAuthorAndRecipient = function () {
                if (gp.isLoadingDocument === false) {
                    this.authors([]);
                    this.recipients([]);
                    switch (this.authors.selectedAuthorType().key) {
                        case "person":
                            var newPerson = new PersonBasicData();
                            this.authors.push(new ElectronicStatementAuthor().person(newPerson));
                            this.recipients.push(new ElectronicServiceRecipient().person(newPerson));
                            break;
                        case "foreignPerson":
                            var newForeignCitizen = new ForeignCitizenBasicData();
                            this.authors.push(new ElectronicStatementAuthor().foreignCitizen(newForeignCitizen));
                            this.recipients.push(new ElectronicServiceRecipient().foreignPerson(newForeignCitizen));
                            break;
                    }
                }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createAuthor: createAuthor,
                addAuthor: addAuthor,
                removeAuthor: removeAuthor,
                createRecipient: createRecipient,
                addRecipient: addRecipient,
                removeRecipient: removeRecipient,
                ensureSameAuthorAndRecipient: ensureSameAuthorAndRecipient,
                toJSON: toJSON
            }
        }();

        return RecipientGroup;
    }
);