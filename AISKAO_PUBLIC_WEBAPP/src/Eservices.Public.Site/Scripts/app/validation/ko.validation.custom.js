define('validation/ko.validation.custom',
    ['ko', 'jquery', 'libs/knockout.validation.debug'],
    function (ko, $) {

        var getValue = function (o) {
            return (typeof o === 'function' ? o() : o);
        },
        isEmptyVal = function (val) {
            if (val === undefined) {
                return true;
            }
            if (val === null) {
                return true;
            }
            if (val === "") {
                return true;
            }
        },
        isDate = function (y, m, d) {
            var date = new Date(y, m - 1, d);
            var convertedDate =
            "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
            var givenDate = "" + y + m + d;
            return (givenDate == convertedDate);
        };

        ko.validation.rules['fieldIsNumber'] = {
            validator: function (val, params) {
                return isEmptyVal(val) || (/^(0|-?[1-9]+(\d*))$/.test(val));
            },
            message: function (params) {
                return '0006-000012: Полето "{0}" трябва да съдържа цяло число.'.replace(/\{0\}/gi, params.field.title);
            }
        };

        ko.validation.rules['fieldIsGreaterThan'] = {
            validator: function (val, params) {
                return isEmptyVal(val) || val > params.value;
            },
            message: function (params) {
                return '0006-000013: Полето "{0}" трябва да съдържа число, по-голямо от {1}.'.replace(/\{0\}/gi, params.field.title).replace(/\{1\}/gi, params.value);
            }
        };

        ko.validation.rules['fieldIsDate'] = {
            validator: function (val, params) {
                if (isEmptyVal(getValue(val))) {
                    return true;
                } else {
                    if (/Invalid|NaN/.test(new Date(val))) {
                        return false;
                    }
                    //if (!(/^(19|20)\d\d[\- /.](0[1-9]|1[012])[\- /.](0[1-9]|[12][0-9]|3[01])$/).test(val)) {
                    //    return false;
                    //}
                    var day = Number(val[8]) * 10 + Number(val[9]),
                        month = Number(val[5]) * 10 + Number(val[6]),
                        year = Number(val[0]) * 1000 + Number(val[1]) * 100 + Number(val[2]) * 10 + Number(val[3]);
                    // var date = new Date(year, month, day);
                    if (!isDate(year, month, day)) {
                        return false;
                    }
                }
                return true;
                //isEmptyVal(val) || !/Invalid|NaN/.test(new Date(val));
            },
            message: function (params) {
                var dateFormat = params.dateFormat ? params.dateFormat : 'ДД.ММ.ГГГГ';
                return '0006-000014: Полето "{0}" не съдържа валидна дата. Дата трябва да е във формат "{1}".'.replace(/\{0\}/gi, params.field.title).replace(/\{1\}/gi, dateFormat);
            }
        };

        ko.validation.rules['fieldIsRequired'] = {
            validator: function (val, params) {
                return !isEmptyVal(params.field());
            },
            message: function (params) {
                return '0006-000015: Полето "{0}" от секцията "{1}" трябва да е попълнено.'.replace(/\{0\}/gi, params.field.title).replace(/\{1\}/gi, params.sectionTitle);
            }
        };

        ko.validation.rules['fieldIsFromEnum'] = {
            validator: function (val, params) {
                return isEmptyVal(val) || ko.utils.arrayFirst(params.nomenclatureValues, function (item) {
                    if (val.key) {
                        return val.key === item.key;
                    } else {
                        return val === item.key;
                    }
                });
            },
            message: function (params) {
                return '0006-000016: Полето "{0}" може да заема само валидни стойности от "{1}".'.replace(/\{0\}/gi, params.field.title).replace(/\{1\}/gi, params.nomenclatureTitle);
            }
        };

        ko.validation.rules['fieldMaxLength'] = {
            validator: function (val, params) {
                return isEmptyVal(val) || val.length <= params.maxLength;
            },
            message: function (params) {
                return '0006-000017: Полето "{0}" не може да съдържа повече от {1} символа.'.replace(/\{0\}/gi, params.field.title).replace(/\{1\}/gi, params.maxLength);
            }
        };

        ko.validation.rules['fieldCharsAllowed'] = {
            validator: function (val, params) {
                var val = getValue(params.field());
                var regEx = new RegExp(params.pattern);
                return isEmptyVal(val) || regEx.test(val);
            },
            message: function (params) {
                return '0006-000018: В полето "{0}" може да се съдържат само {1}.'.replace(/\{0\}/gi, params.field.title).replace(/\{1\}/gi, params.charsAllowed);
            }
        };

        ko.validation.rules['requiredOneOfFields'] = {
            validator: function (val, params) {
                var anyOne = ko.utils.arrayFirst(params.fields, function (field) {
                    var stringTrimRegEx = /^\s+|\s+$/g,
                        testVal;

                    var val = getValue(field);

                    if (isEmptyVal(val))
                        return false;

                    testVal = val;
                    if (typeof (val) == "string") {
                        testVal = val.replace(stringTrimRegEx, '');
                    }

                    return ((testVal + '').length > 0);

                });

                return (anyOne != null);
            },
            message: function (params) {

                var fieldsTitles = ko.utils.arrayMap(params.fields, function (item) {
                    return "\"" + item.title + "\"";
                }).join(', ');

                return '0006-000019: Поне едно от полетата {0} в секцията "{1}" трябва да бъде попълнено.'.replace(/\{0\}/gi, fieldsTitles).replace(/\{1\}/gi, params.sectionTitle);
            }
        };

        ko.validation.rules['fieldExactLength'] = {
            validator: function (val, params) {
                var val = getValue(params.field());
                return isEmptyVal(val) || val.length === params.exactLength;
            },
            message: function (params) {
                return '0006-000020: Полето "{0}" трябва да съдържа точно {1} символа.'.replace(/\{0\}/gi, params.field.title).replace(/\{1\}/gi, params.exactLength);
            }
        };

        ko.validation.rules['fieldIsValidEGN'] = {
            validator: function (value, params) {
                var val = getValue(value);
                if (isEmptyVal(val)) {
                    return true;
                } else {
                    if (!(/^\d{2}([024][1-9]|[135][0-2])([0][1-9]|[12][0-9]|[3][01])\d{4}$/).test(val)) {
                        return false;
                    }
                    // Проверяват се денят, месецът и годината за валидна дата. 
                    var year = Number(val[0]) * 10 + Number(val[1]),
                        month = Number(val[2]) * 10 + Number(val[3]);
                    if (month > 40) {
                        // За родените след 31.12.1999 г. към месеца се прибавя числото 40.
                        month -= 40;
                        year += 2000;
                    }
                    else if (month > 20) {
                        // За родените преди 01.01.1900 г. към месеца се прибавя числото 20.
                        month -= 20;
                        year += 1800;
                    }
                    else {
                        year += 1900;
                    }
                    var day = Number(val[4]) * 10 + Number(val[5]);
                    // var date = new Date(year, month, day);
                    if (!isDate(year, month, day)) {
                        return false;
                    }
                    var checkSum = 0,
                        modulus = 0;
                    // 2.1.	Изчислява се сумата: 2*а1+4*а2+8*а3+5*а4+10*а5+9*а6+7*а7+3*а8+6*а9, където а1 e първата цифра от ЕГН, а2 - втората и т.н.
                    checkSum =
                        2 * val[0]
                        + 4 * val[1]
                        + 8 * val[2]
                        + 5 * val[3]
                        + 10 * val[4]
                        + 9 * val[5]
                        + 7 * val[6]
                        + 3 * val[7]
                        + 6 * val[8];
                    // 2.2.	Изчислява се остатъкът по модул 11 от сумата по т. 2.1
                    // 2.3.	Ако остатъкът е различен от 10, то той се определя като контролно число
                    // Ако остатъкът е десет - за контролно число се определя 0 и се сравнява с десетата цифра – те трябва да са равни
                    modulus = (checkSum % 11) % 10;
                    // контролното число и десетата цифра трябва да са равни. 
                    if (modulus != val[9]) {
                        return false;
                    }
                    return true;
                }
            },
            message: function () {
                return '0006-000021: Невалиден "ЕГН".';
            }
        };

        ko.validation.rules['fieldIsValidLNCH'] = {
            validator: function (value, params) {
                var val = getValue(value);
                if (isEmptyVal(val)) {
                    return true;
                } else {
                    if (!(/^\d{2}([024][1-9]|[135][0-2])([0][1-9]|[12][0-9]|[3][01])\d{4}$/).test(val)) {
                        return false;
                    }

                    var checkSum = 0;
                    modulus = 0;
                    // 1. Изчислява се сумата: 21*а1+19*а2+17*а3+13*а4+11*а5+9*а6+7*а7+3*а8+1*а9, където а1 e първата цифра от ЛНЧ, а2 - втората и т.н.
                    checkSum =
                        21 * val[0]
                        + 19 * val[1]
                        + 17 * val[2]
                        + 13 * val[3]
                        + 11 * val[4]
                        + 9 * val[5]
                        + 7 * val[6]
                        + 3 * val[7]
                        + 1 * val[8];
                    // 2. Изчислява се остатъкът по модул 11 от сумата по т.1
                    // Ако остатъкът е различен от 10, то той се определя като контролно число
                    // Ако остатъкът е десет - за контролно число се определя 0 и се сравнява с десетата цифра – те трябва да са равни
                    modulus = (checkSum % 11) % 10;
                    // контролното число и десетата цифра трябва да са равни. 
                    if (modulus != val[9]) {
                        return false;
                    }
                    return true;
                }
            },
            message: function () {
                return '0006-000022: Невалиден "ЛНЧ".';
            }
        };

        ko.validation.rules['fieldIsValidBULSTAT'] = {
            validator: function (val, params) {
                if (isEmptyVal(val)) {
                    return true;
                } else {
                    if (!(/^[0-9]{9}|[0-9]{13}|[0-9]{10}$/).test(val)) {
                        return false;
                    }

                    var checkSum = 0;
                    modulus = 0;
                    switch (val.length) {
                        case 9:
                            {
                                for (var i = 0; i < 8; i++) {
                                    // 1. Изчислява се сумата: 1*а1+2*а2+3*а3+4*а4+5*а5+6*а6+7*а7+8*а8, където а1 e първата цифра от ЕИК, а2 - втората и т.н.
                                    checkSum += val[i] * (i + 1);
                                }
                                // 2. Изчислява се остатъкът по модул 11 от сумата по т. 1
                                modulus = checkSum % 11;
                                if (modulus != 10) {
                                    // 3. Ако остатъкът е различен от 10, то той се определя като контролно число и се сравнява с деветата цифра – те трябва да са равни.
                                    if (modulus != val[8]) {
                                        return false;
                                    }
                                }
                                else {
                                    checkSum = 0;
                                    // 4. Ако остатъкът е 10
                                    for (var i = 0; i < 8; i++) {
                                        // се изчислява сумата 3*а1+4*а2+5*а3+6*а4+7*а5+8*а6+9*а7+10*а8, където а1 e първата цифра от ЕИК, а2 - втората и т.н
                                        checkSum += val[i] * (i + 3);
                                    }
                                    // 5. Изчислява се остатъкът по модул 11 от новата сума (по т.4)
                                    modulus = checkSum % 11;
                                    if (modulus != 10) {
                                        // 6. Ако остатъкът е различен от 10, то той се определя като контролно число и се сравнява с деветата цифра – те трябва да са равни
                                        if (modulus != val[8]) {
                                            return false;
                                        }
                                    }
                                    else {
                                        // 7. Ако остатъкът е десет - за контролно число се определя 0 и се сравнява с деветата цифра – те трябва да са равни.
                                        if (0 != val[8]) {
                                            return false;
                                        }
                                    }
                                }
                                break;
                            }
                        case 10:
                            {
                                // 1. Изчислява се сумата: 2*а1+4*а2+8*а3+5*а4+10*а5+9*а6+7*а7+3*а8 + 6*а9, където а1 e първата цифра от кода, а2 - втората и т.н.
                                checkSum = 2 * val[0] + 4 * val[1] + 8 * val[2] + 5 * val[3] + 10 * val[4] + 9 * val[5] + 7 * val[6] + 3 * val[7] + 6 * val[8];
                                // 2. Изчислява се остатъкът по модул 11 от сумата по т. 1
                                modulus = checkSum % 11;
                                // 3. Ако остатъкът е различен от 10, то той се определя като контролно число. Ако остатъкът е десет - за контролно число се определя 0
                                modulus = modulus % 10;
                                if (modulus == val[9]) {
                                    return;
                                }
                                else {
                                    // 4. Ако контролното число по т. 3 не съвпада с 10-тата цифра се изчислява сумата: 21*а1+19*а2+17*а3+13*а4+11*а5+9*а6+7*а7+3*а8 + 1*а9 , където а1 e първата цифра от ЛНЧ, а2 - втората и т.н.
                                    checkSum = 21 * val[0] + 19 * val[1] + 17 * val[2] + 13 * val[3] + 11 * val[4] + 9 * val[5] + 7 * val[6] + 3 * val[7] + 1 * val[8];
                                    //5. Изчислява се остатъкът по модул 11 от сумата по т. 5. Ако остатъкът е различен от 10, то той се определя като контролно число. Ако остатъкът е десет - за контролно число се определя 0.
                                    modulus = (checkSum % 11) % 10;
                                    // 6. Полученото по т.5 контролно число се сравнява с 10-тата цифра от кода. Ако не съвпадат се извежда съобщение за грешка, дефинирана с термин с УРИ R-0136
                                    if (modulus != val[9]) {
                                        return false;
                                    }
                                }
                                break;
                            }
                        case 13:
                            {
                                // 1. От първите осем цифри се изчислява контролно число по начина, описан за 9 цифров ЕИК/БУЛСТАТ и се сравнява с деветата цифра. Те трябва да са равни.
                                for (var i = 0; i < 8; i++) {
                                    // Изчислява се сумата: 1*а1+2*а2+3*а3+4*а4+5*а5+6*а6+7*а7+8*а8, където а1 e първата цифра от ЕИК, а2 - втората и т.н.
                                    checkSum += val[i] * (i + 1);
                                }
                                // Изчислява се остатъкът по модул 11 от сумата по т. 1
                                modulus = checkSum % 11;
                                if (modulus != val[8]) {
                                    // Ако остатъкът е различен от 10, то той се определя като контролно число и се сравнява с деветата цифра – те трябва да са равни.
                                    return false;
                                }
                                else {
                                    // 2.	Изчислява се сумата: 2*а9 + 7*а10 + 3*а11 +5*а12 , където а9 e деветата цифра от ЕИК, а10 - десетата и т.н.
                                    checkSum = 2 * val[8] + 7 * val[9] + 3 * val[10] + 5 * val[11];
                                    // 3.	Изчислява се остатъкът по модул 11 от сумата по т.2
                                    modulus = checkSum % 11;
                                    if (modulus != 10) {
                                        // 4. Ако остатъкът е различен от 10, се определя като контролно число и се сравнява с тринадесетата цифра – те трябва да са равни.
                                        if (modulus != val[12]) {
                                            return false;
                                        }
                                    }
                                    else {
                                        // 5. Ако остатъкът е 10, се изчислява сумата: 4*а9+9*а10+5*а11+7*а12, където а9 e деветата цифра от ЕИК, а10 - десетата и т.н.
                                        checkSum = 4 * val[8] + 9 * val[9] + 5 * val[10] + 7 * val[11];
                                        // 6.Изчислява се остатъкът по модул 11 от новата сума (по т.5)
                                        modulus = checkSum % 11;
                                        if (modulus != 10) {
                                            // 7. Ако остатъкът е различен от 10, то той се определя като контролно число и се сравнява с тринадесетата цифра – те трябва да са равни
                                            if (modulus != val[12]) {
                                                return false;
                                            }
                                        }
                                        else {
                                            // Ако остатъкът е десет - за контролно число се определя 0 и се сравнява с тринадесетата цифра – те трябва да са равни. 
                                            if (0 != val[12]) {
                                                return false;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                        default:
                            {
                                return false;
                            }
                    }
                    return true;
                }
            },
            message: function () {
                return '0006-000024: Невалиден "ЕИК/БУЛСТАТ".';
            }
        };

        ko.validation.rules['sectionIsRequired'] = {
            validator: function (val, params) {
                return !isEmptyVal(val);
            },
            message: function (params) {
                return '0006-000023: Попълването на секцията "{0}" е задължително.'.replace(/\{0\}/gi, params.field.title);
            }
        };

        ko.validation.rules['fieldIsValidEmail'] = {
            validator: function (val, params) {
                return isEmptyVal(val) || ((/^([\w]+[-._+&amp;])*[\w]+@([\w]+[.-]?)+[\w]\.[\w]+$/).test(val));
            },
            message: function (params) {
                return '0006-000025: Полето "{0}" трябва да съдържа валиден адрес на електронна поща.'.replace(/\{0\}/gi, params.field.title);
            }
        };

        //ko.validation.rules['fieldIsBase64Binary'] = {
        //    validator: function (val, params) {
        //        return isEmptyVal(val) || (/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/).test(val);
        //    },
        //    message: function (params) {
        //        return '0006-000026: Полето "{0}"  трябва да е от тип base64Binary.'.replace(/\{0\}/gi, params.field.title);
        //    }
        //};

        ko.validation.rules['fieldIsFromStandard'] = {
            validator: function (val, params) {
                var val = getValue(val);
                if (params.standardValues() && params.standardValues().length > 0) {
                    return isEmptyVal(val) || ko.utils.arrayFilter(params.standardValues(), function (item) {
                        return val === getValue(item[params.fieldTitle])
                    }).length > 0;
                } else {
                    return true;
                }
            },
            message: function (params) {
                return '0006-000030: Полето "{0}" може да заема само валидни стойности от стандарта "{1}".'.replace(/\{0\}/gi, params.field.title).replace(/\{1\}/gi, params.standard);
            }
        };

        ko.validation.rules['fieldsForForeignEntityID'] = {
            validator: function (val, params) {
                if (isEmptyVal(params.otherData())) {
                    if (!isEmptyVal(params.registerID()) &&
                        !isEmptyVal(params.registerName())) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (isEmptyVal(params.registerID()) &&
                       isEmptyVal(params.registerName())) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            message: function (params) {
                return '0006-000072: Не са посочени данни, еднозначно идентифициращи чуждестранно юридическо лице.';
            }
        };

        ko.validation.rules['citizenshipIsRequired'] = {
            validator: function (val, params) {
                return !isEmptyVal(val) && params.fields.length > 0;
            },
            message: function (params) {
                return '0006-000082: В секцията "{0}" трябва да бъде включена информация за гражданство на лицето.'.replace(/\{0\}/gi, params.sectionTitle);
            }
        };

        ko.validation.rules['fieldIsValidEntrance'] = {
            validator: function (val, params) {
                return isEmptyVal(val) || (/^[0-9]{0,2}$|^[А-я]?$/).test(val);
            },
            message: function (params) {
                return '0006-000086: Полето „Вход” може да съдържа или максимум две цифри или една буква на кирилица.';
            }
        };

        ko.validation.rules['fieldIsBetween'] = {
            validator: function (val, params) {
                return isEmptyVal(val) || (val >= params.minValue && val <= params.maxValue);
            },
            message: function (params) {
                return '0006-000139: Полето "{0}" трябва да съдържа число в интервала от {1} до {2}'.replace(/\{0\}/gi, params.field.title).replace(/\{1\}/gi, params.minValue).replace(/\{2\}/gi, params.maxValue);
            }
        };

        ko.validation.rules['requiredExactlyOneOfSegments'] = {
            validator: function (val, params) {
                var fieldsNotEmptyCount = ko.utils.arrayFilter(params.fields, function (field) {
                    return !isEmptyVal(field);
                }).length;

                return (fieldsNotEmptyCount === 1);
            },
            message: function (params) {

                var fieldsTitles = ko.utils.arrayMap(params.fields, function (item) {
                    return "\"" + item.title + "\"";
                }).join(', ');

                return '0006-000140: Един от изграждащите елементи {0} в секцията "{1}" трябва да бъде попълнен.'.replace(/\{0\}/gi, fieldsTitles).replace(/\{1\}/gi, params.sectionTitle);
            }
        };

        ko.validation.rules['fieldIsFromDataPack'] = {
            validator: function (value, params) {
                var val = getValue(value);
                if (params.dataPackValues() && params.dataPackValues().length > 0) {
                    return isEmptyVal() || ko.utils.arrayFilter(params.dataPackValues(), function (item) {
                        return val === getValue(item[params.dataPackField]);
                    }).length > 0;
                } else {
                    return true;
                }
            },
            message: function (params) {
                return '0006-000141: Полето "{0}" може да заема само валидни стойности от полето "{1}" от пакета от данни "{2}".'.replace(/\{0\}/gi, params.field.title).replace(/\{1\}/gi, params.dataPackFieldTitle).replace(/\{2\}/gi, params.dataPackTitle);
            }
        };
    });