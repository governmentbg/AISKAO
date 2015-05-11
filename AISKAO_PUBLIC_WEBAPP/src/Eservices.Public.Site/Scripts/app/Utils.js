define('Utils',
    ['jquery', 'GlobalParameters'],
    function ($, gp) {

        var Utils = function () {

            var toJSONForXML = function (io, o) {
                var options = $.extend({ xmlns: undefined, xmlAttributes: undefined }, o);
                var result = {};
                for (var i in io) {
                    if (i === '_settings') {
                        continue;
                    }
                    var capitalI;
                    if (io[i] !== undefined && io.hasOwnProperty(i) && typeof io[i] !== 'function' && i !== 'xmlns' && io[i] !== '') {
                        if (options.propertiesTitles !== undefined && options.propertiesTitles[i] !== undefined) {
                            capitalI = options.propertiesTitles[i];
                        } else {
                            capitalI = i.charAt(0).toUpperCase() + i.slice(1);
                        }
                        if (io[i] instanceof Array) {
                            result[capitalI] = [];
                            for (var j in io[i]) {
                                if (io[i][j]["toJSON"] !== undefined && typeof io[i][j]["toJSON"] === 'function') {
                                    result[capitalI][j] = $.extend({}, io[i][j].toJSON(), { _xmlns: options.xmlns }, options.xmlAttributes);
                                }
                                else {
                                    result[capitalI][j] = $.extend({}, {
                                        _xmlns: options.xmlns,
                                        __text: io[i][j]
                                    }, options.xmlAttributes);
                                }
                            }
                        } else if (io[i] instanceof Date) {
                            result[capitalI] = $.extend({}, {
                                _xmlns: options.xmlns,
                                __text: io[i].toJSON()
                            }, options.xmlAttributes);
                        } else if (io[i]["toJSON"] !== undefined && typeof io[i]["toJSON"] === 'function') {
                            result[capitalI] = $.extend({}, io[i].toJSON(), { _xmlns: options.xmlns }, options.xmlAttributes);
                        }
                        else {
                            result[capitalI] = $.extend({}, {
                                _xmlns: options.xmlns,
                                __text: io[i]
                            }, options.xmlAttributes);
                        }
                    }
                }
                return result;
            }

            var fromJSONToJS = function (io, data) {
                var options = {};
                //gp.isLoadingDocument = true;
                for (var j in io['_settings']) {
                    if (j === 'options') {
                        options = io['_settings'][j];
                        break;
                    }
                    //if (io['_settings'].loding) {
                    //    io['_settings'].loding = true;
                    //}
                }
                for (var i in io) {
                    if (i === '_settings') {
                        continue;
                    }
                    //при зареждане на xml изрично сетваме авторът и получателят да не съвпадат
                    //if (i === 'electronicServiceApplicant') {
                    //    io[i]().recipientGroups.isAuthorEqualsRecipient(false);
                    //}
                    var capitalI;
                    if (options !== undefined && options.propertiesTitles !== undefined && options.propertiesTitles[i] !== undefined) {
                        capitalI = options.propertiesTitles[i];
                    } else {
                        capitalI = i.charAt(0).toUpperCase() + i.slice(1);
                    }
                    //в случай, че е необходим изрично да се създаде инстанция на конкретния обект
                    var createInstance = 'create' + capitalI;
                    if (data[capitalI] && io[i] && !io[i]() && io[createInstance]) {
                        io[i](io[createInstance]());
                    }
                    //ако е масив
                    if (data[capitalI] && io[i]() instanceof Array) {

                        io[i]([]);
                        //ако масива има повече от един елемента
                        if (data[capitalI] instanceof Array) {
                            for (var j in data[capitalI]) {
                                //махаме служебните properties
                                if (j.indexOf('_') < 0) {
                                    if (io[createInstance]) {
                                        //добавяне в масива инстанция на обект (ако изрично )
                                        io[i].push(io[createInstance]());
                                    }
                                    if (io[i]()[j] && io[i]()[j]["toJSON"] !== undefined && typeof io[i]()[j]["toJSON"] === 'function') {
                                        fromJSONToJS(io[i]()[j], data[capitalI][j]);
                                    }
                                    else if (!io[i]()[j] && data[capitalI][j] && i !== "toJSON") {                                        
                                        if (data[capitalI][j].__text) {
                                            io[i].push(data[capitalI][j].__text);
                                        } else {
                                            io[i].push(data[capitalI][j]);
                                        }
                                    }
                                }
                            }
                        }
                            //ако за обект от тип масив има само един елемент, то в data той се пази като Object, а не като масив
                        else {
                            if (io[createInstance]) {
                                //добавяне в масива инстанция на обект (ако изрично )
                                io[i].push(io[createInstance]());
                            }
                            if (io[i]()[0]) {
                                fromJSONToJS(io[i]()[0], data[capitalI]);
                            } else {
                                io[i].push(data[capitalI]);
                            }
                        }

                    } else if (data[capitalI] && io[i]() !== undefined && io[i]()["toJSON"] !== undefined && typeof io[i]()["toJSON"] === 'function') {
                        fromJSONToJS(io[i](), data[capitalI]);
                    }
                    else {
                        if (io[i] && data[capitalI] && data[capitalI].__text && i !== "toJSON") {
                            if (data[capitalI].__text === "true") {
                                io[i](Boolean(true));
                            } else if (data[capitalI].__text === "false") {
                                io[i](Boolean(false));
                            } else {
                                io[i](data[capitalI].__text);
                            }
                        } else if (io[i] && data[capitalI] && i !== "toJSON") {
                            if (data[capitalI] === "true") {
                                io[i](Boolean(true));
                            } else if (data[capitalI] === "false") {
                                io[i](Boolean(false));
                            } else {
                                io[i](data[capitalI]);
                            }
                        }
                    }
                }
            };

            return {
                toJSONForXML: toJSONForXML,
                fromJSONToJS: fromJSONToJS
                //parseErrorMessage: parseErrorMessage
            };

        }();
        return Utils;
    }
);