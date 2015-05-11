define('babh/ForageMaterialsByProductDatas',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'babh/ForageMaterialsByProductData'],
    function (ko, Utils,
        gp,
        Enums,
        ForageMaterialsByProductData) {

        var ForageMaterialsByProductDatas = function () {

            this.forageMaterialsByProductData = ko.observableArray([]);
        }

        ForageMaterialsByProductDatas.prototype = function () {
            var createForageMaterialsByProductData = function () {
                return new ForageMaterialsByProductData();
            },
            addForageMaterialsByProductData = function (data) {
                this.forageMaterialsByProductData.push(new ForageMaterialsByProductData());
            },
            removeForageMaterialsByProductData = function (value) {
                    this.forageMaterialsByProductData.remove(value);
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                createForageMaterialsByProductData: createForageMaterialsByProductData,
                addForageMaterialsByProductData: addForageMaterialsByProductData,
                removeForageMaterialsByProductData:removeForageMaterialsByProductData,
                toJSON: toJSON
            }
        }();

        return ForageMaterialsByProductDatas;

    });