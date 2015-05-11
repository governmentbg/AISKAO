define('babh/ForageMaterialData',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageMaterialsByProductDatas'],
    function (ko, Utils,
        gp,
        Enums,
        ForageMaterialsByProductDatas) {

        var ForageMaterialData = function () {
            this._settings = {};
            this._settings.sectionTitle = 'Производство на фуражни суровини, предназначени за пазара';
            this._settings.xmlns = 'http://ereg.egov.bg/segment/R-1145';
            this._settings.options = {
                xmlns: this._settings.xmlns
            };

            this.forageMaterialsByProductDatas = ko.observable(new ForageMaterialsByProductDatas());
        }

        ForageMaterialData.prototype = function () {
            toJSON = function () {
                if (this.forageMaterialsByProductDatas !== undefined &&
                    (this.forageMaterialsByProductDatas.forageMaterialsByProductData == undefined ||
                    this.forageMaterialsByProductDatas.forageMaterialsByProductData.length == 0)) {
                    this.forageMaterialsByProductDatas = undefined;
                }
                return Utils.toJSONForXML(this, this._settings.options);
            };
            return {
                toJSON: toJSON
            }
        }();

        return ForageMaterialData;

    });