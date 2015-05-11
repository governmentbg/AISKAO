define('regix/NationalityList',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'regix/Nationality'],
    function (ko, Utils,
        gp,
        Enums,
        Nationality) {

        var NationalityList = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Списък гражданство';
            this._settings.xmlns = 'http://egov.bg/RegiX/MVR/RCH//ForeignIdentityInfoResponse';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.nationality = ko.observableArray([new Nationality()]);
            this.nationality.title = "Гражданство";
        }

        NationalityList.prototype = function () {
            var createNationality = function () {
                return new Nationality();
            },
            addNationality = function (data) {
                this.nationality.push(new Nationality);
            },
             removeNationality = function (value) {
                 this.nationality.remove(value);
             },
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                createNationality: createNationality,
                addNationality: addNationality,
                removeNationality: removeNationality,
                toJSON: toJSON
            }
        }();

        return NationalityList;

    });