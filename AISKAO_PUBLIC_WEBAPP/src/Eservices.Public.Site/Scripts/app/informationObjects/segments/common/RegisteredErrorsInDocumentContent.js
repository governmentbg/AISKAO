define('common/RegisteredErrorsInDocumentContent',
    ['ko', 'Utils', 'common/RegisterObjectURI', 'common/RegisteredErrors'],
    function (ko, Utils, RegisterObjectURI, RegisteredErrors) {

        var RegisteredErrorsInDocumentContent = function () {
            //var docURI = new DocumentTypeURI();
            //docURI.registerIndex(10);
            //docURI.batchNumber(7);
            this._settings = {};
            this._settings.xmlns = 'http://ereg.egov.bg/segment/0009-000025';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };
            this._settings.sectionTitle = "Регистрирани грешки в съдържание на документ"
            this.documentTypeURI = ko.observable(new RegisterObjectURI());
            this.documentTypeURI().registerIndex(10);
            this.documentTypeURI().batchNumber(7);
            this.documentTypeName = ko.observable('Заявление за издаване на удостоверение за постоянен адрес');
            this.registeredErrors = ko.observable(new RegisteredErrors());
        }

        RegisteredErrorsInDocumentContent.prototype = function () {
            var toJSON = function () {
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
                //addError: addError
            }
        }();

        return RegisteredErrorsInDocumentContent;
    }
);