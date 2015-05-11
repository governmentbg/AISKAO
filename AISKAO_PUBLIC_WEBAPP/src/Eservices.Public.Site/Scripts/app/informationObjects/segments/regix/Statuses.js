define('regix/Statuses',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/Status'],
    function (ko, Utils,
        gp,
        Enums,
        Status) {

        var Statuses = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Статуси на пребиваване';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/RCH//ForeignIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.status = ko.observableArray([new Status()]);
        }

        Statuses.prototype = function () {
            var createStatus = function () {
                return new Status();
            },
            addStatus = function (data) {
                this.status.push(new Status);
            },
             removeStatus = function (value) {
                 this.status.remove(value);
             },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createStatus: createStatus,
                addStatus: addStatus,
                removeStatus: removeStatus,
                toJSON: toJSON
            }
        }();

        return Statuses;

    });