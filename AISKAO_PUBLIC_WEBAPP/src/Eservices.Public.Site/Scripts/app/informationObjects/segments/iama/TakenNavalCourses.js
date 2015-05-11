define('iama/TakenNavalCourses',
    ['ko', 'Utils',
    'GlobalParameters',
    'Enums',
    'iama/TakenNavalCourse'],
    function (ko, Utils,
        gp,
        Enums,
        TakenNavalCourse) {

        var TakenNavalCourses = function () {

            this.takenNavalCourse = ko.observableArray([new TakenNavalCourse()]);
        }

        TakenNavalCourses.prototype = function () {
            var createTakenNavalCourse = function () {
                return new TakenNavalCourse();
            },
            addTakenNavalCourse = function (data) {
                this.takenNavalCourse.push(new TakenNavalCourse());
            },
            removeTakenNavalCourse = function (value) {
                if (this.takenNavalCourse().length > 1) {
                    this.takenNavalCourse.remove(value);
                }
            },
            toJSON = function () {
                return Utils.toJSONForXML(this);
            };
            return {
                createTakenNavalCourse: createTakenNavalCourse,
                addTakenNavalCourse: addTakenNavalCourse,
                removeTakenNavalCourse:removeTakenNavalCourse,
                toJSON: toJSON
            }
        }();

        return TakenNavalCourses;

    });