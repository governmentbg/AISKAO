define('iama/PersonCyrrilicFullName',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'common/PersonNames'],
    function (ko, Utils,
        gp,
        Enums,
        PersonNames) {

        var PersonCyrrilicFullName = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Имена на физическо лице на кирилица';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1107';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.personCyrrilicFullName = ko.observable(new PersonNames());
}

        PersonCyrrilicFullName.prototype = function () {
            toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return PersonCyrrilicFullName;

        });