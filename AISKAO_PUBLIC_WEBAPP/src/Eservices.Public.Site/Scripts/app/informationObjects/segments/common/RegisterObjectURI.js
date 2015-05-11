define('common/RegisterObjectURI',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var RegisterObjectURI = function () {
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000022';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.registerIndex = ko.observable();
            this.registerIndex.title = 'Регистров индекс';
            this.registerIndex.extend({
                fieldIsNumber: {
                    field: this.registerIndex
                },
                fieldIsGreaterThan: {
                    field: this.registerIndex,
                    value: 0
                }
            });

            this.batchNumber = ko.observable();
            this.batchNumber.title = 'Партиден номер в раздел';
            this.batchNumber.extend({
                fieldIsNumber: {
                    field: this.batchNumber
                },
                fieldIsGreaterThan: {
                    field: this.batchNumber,
                    value: 0
                }
            });
        }

        RegisterObjectURI.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return RegisterObjectURI;

    }
);