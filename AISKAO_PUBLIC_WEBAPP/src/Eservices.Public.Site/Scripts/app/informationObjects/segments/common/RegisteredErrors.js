define('common/RegisteredErrors',
    ['ko', 'Utils'],
    function (ko, Utils) {

        var RegisteredErrors = function () {
            this._settings = {};
            this._settings.options = {
                propertiesTitles: {
                    errors: 'Error'
                }
            };

            this.errors = ko.observableArray([]);
        }

        RegisteredErrors.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return RegisteredErrors;
    }
);