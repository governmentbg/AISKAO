define('common/DocumentURI',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var DocumentURI = function () {
            this._settings = {};
            this._settings.sectionTitle = 'УРИ на регистриран документ в официален документен регистър';
            this._settings.sectionIsRequired = ko.observable(false);
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000001';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.registerIndex = ko.observable();
            this.registerIndex.title = 'Регистров индекс';
            this.registerIndex.extend({
                fieldIsRequired: {
                    params: {
                        field: this.registerIndex,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return this._settings.sectionIsRequired()
                    }.bind(this)
                },
                fieldIsNumber: {
                    field: this.registerIndex
                },
                fieldIsGreaterThan: {
                    field: this.registerIndex,
                    value: 0
                }
            });

            this.sequenceNumber = ko.observable();
            this.sequenceNumber.title = 'Пореден номер на документ';
            this.sequenceNumber.extend({
                fieldIsRequired: {
                    params: {
                        field: this.sequenceNumber,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return this._settings.sectionIsRequired()
                    }.bind(this)
                },
                fieldIsNumber: {
                    field: this.sequenceNumber
                },
                fieldIsGreaterThan: {
                    field: this.sequenceNumber,
                    value: 0
                }
            });
            this.receiptOrSigningDate = ko.observable();
            //this.receiptOrSigningDate.displayValue = ko.observable();
            //this.receiptOrSigningDate.displayValue.title = 'Display - Дата на получаване или подписване на документ';
            //this.receiptOrSigningDate.displayValue.extend({
            //    fieldIsDate: {
            //        field: this.receiptOrSigningDate.displayValue
            //    }
            //});
            this.receiptOrSigningDate.title = 'Дата на получаване или подписване на документ';
            this.receiptOrSigningDate.isRequired = ko.observable(true);
            this.receiptOrSigningDate.extend({
                fieldIsRequired: {
                    params: {
                        field: this.receiptOrSigningDate,
                        sectionTitle: this._settings.sectionTitle
                    },
                    onlyIf: function () {
                        return this._settings.sectionIsRequired()
                    }.bind(this)
                },
                fieldIsDate: {
                    field: this.receiptOrSigningDate
                }
            });

            this.registerIndex.displayValue = ko.computed(function () {
                if (this.sequenceNumber() != undefined && this.sequenceNumber().length > 0) {
                    return this.registerIndex() + "-" + this.sequenceNumber() + "-";
                } else if (this.registerIndex() != undefined && this.registerIndex().length > 0) {
                    return this.registerIndex()
                } else {
                    return "";
                }
            }, this);
        }


        DocumentURI.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return DocumentURI;

    }
);