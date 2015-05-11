define('common/ElectronicStatementAuthor',
    ['ko', 'Utils', 'common/PersonBasicData', 'common/ForeignCitizenBasicData'],
    function (ko, Utils, PersonBasicData, ForeignCitizenBasicData) {

        var ElectronicStatementAuthor = function () {
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000012';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.person = ko.observable();
            this.foreignCitizen = ko.observable();
        }

        ElectronicStatementAuthor.prototype = function () {
            var createPerson = function () {
                return new PersonBasicData();
            },
                createForeignCitizen = function () {
                    return new ForeignCitizenBasicData();
                },
                toJSON = function () {
                    return Utils.toJSONForXML(this, this._settings.options);
                };
            return {
                createPerson: createPerson,
                createForeignCitizen: createForeignCitizen,
                toJSON: toJSON
            }
        }();

        return ElectronicStatementAuthor;
    }
);