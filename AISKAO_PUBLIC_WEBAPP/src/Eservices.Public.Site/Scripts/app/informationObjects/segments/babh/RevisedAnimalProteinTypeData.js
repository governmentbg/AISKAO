define('babh/RevisedAnimalProteinTypeData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/RevisedAnimalProteinTypes',
    'babh/OtherRevisedAnimalProteins'],
    function (ko, Utils,
        gp,
        Enums,
        RevisedAnimalProteinTypes,
        OtherRevisedAnimalProteins) {

        var RevisedAnimalProteinTypeData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Данни за вид преработени животински протеини като странични животински продукти и/или производни продукти от категория 3, попадащи в обхвата на Регламент (ЕО) № 1069/2009';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1242';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };


            this.revisedAnimalProteinTypes = ko.observable(new RevisedAnimalProteinTypes());

            this.otherRevisedAnimalProteins = ko.observable(new OtherRevisedAnimalProteins());
            this.otherRevisedAnimalProteins.title = "Други преработени животински протеини";
        }

        RevisedAnimalProteinTypeData.prototype = function () {
            toJSON = function () {
                if (this.revisedAnimalProteinTypes !== undefined &&
                    this.revisedAnimalProteinTypes.revisedAnimalProteinType !== undefined &&
                    this.revisedAnimalProteinTypes.revisedAnimalProteinType.length === 0) {
                    this.revisedAnimalProteinTypes = undefined;
                }
                if (this.otherRevisedAnimalProteins.otherRevisedAnimalProtein && this.otherRevisedAnimalProteins.otherRevisedAnimalProtein.length === 0) {
                    this.otherRevisedAnimalProteins = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return RevisedAnimalProteinTypeData;

    });