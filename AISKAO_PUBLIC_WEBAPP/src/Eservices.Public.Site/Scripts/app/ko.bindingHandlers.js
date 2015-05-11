define('ko.bindingHandlers',
['jquery', 'ko', 'modernizr', 'libs/xml2json', 'GlobalParameters'],
function ($, ko, modernizr, xml2json, gp) {
    var unwrap = ko.utils.unwrapObservable;

    // datepicker
    //---------------------------
    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options    
            var bindings = allBindingsAccessor(),
                val = bindings.datepicker(),
                options = bindings.datepickerOptions || {};
            $(element).datetimepicker(options);
            if (val) {
                $(element).datetimepicker('setLocalDate', new Date(val));
                $($(element).children()[0]).removeClass('koError');
            } else {
                if (unwrap(bindings.dateIsRequired)) {
                    $($(element).children()[0]).addClass('koError');
                }
            }

            //when a user changes the date, update the view model
            ko.utils.registerEventHandler(element, "changeDate", function (event) {
                var value = valueAccessor();
                var bindings = allBindingsAccessor();
                var time = "",
                    xmlDate = "";
                if (event.date) {
                    if (ko.isObservable(value)) {
                        var lYear = event.date.getFullYear(),
                            lMonth = ("0" + (event.date.getMonth() + 1)).slice(-2),
                            lDate = ("0" + (event.date.getDate())).slice(-2);
                        xmlDate = [lYear, lMonth, lDate].join('-');
                        value(xmlDate);

                        if (bindings.datepickerOptions.pickTime || bindings.saveTime) {
                            var lHour = event.date.getUTCHours(),
                                lMinutes = ("0" + (event.date.getMinutes())).slice(-2),
                                lSeconds = ("0" + (event.date.getSeconds())).slice(-2);
                            time = [lHour, lMinutes, lSeconds].join(':');

                            var offset = event.date.getTimezoneOffset() / 60;
                            var lTimeZone = ("0" + Math.abs(offset)).slice(-2) + ':00';
                            var offsetSign = (offset < 0 ? '+' : '-');
                            var lISODate = event.date.toLocaleDateString();
                            var xmlDateTime = [xmlDate, time].join('T'); 
                            value([xmlDateTime, lTimeZone].join(offsetSign));
                        }

                        //value(event.date);
                        $($(element).children()[0]).removeClass('koError');
                    }
                }
                else {
                    if (bindings.dateIsRequired()) {
                        $($(element).children()[0]).addClass('koError');
                    }
                }
            });

            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).datetimepicker("destroy");
            })
        }
    };

    // has formattedDate
    //---------------------------
    ko.bindingHandlers.formattedDate = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var val = valueAccessor()(),
                currentDate = new Date(val),
                formattedDate = ("0" + (currentDate.getDate())).slice(-2) + '.' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '.' + currentDate.getFullYear();

            if (val != undefined && val != null) {
                $(element).text(formattedDate);
            }
        }
    };

    // has formattedDateTime
    //-----------------------------

    ko.bindingHandlers.formattedDateTime = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            $(element).on('change', function (evt) {
                if (ko.isObservable(valueAccessor())) {
                    valueAccessor()();
                }
            });
        },

        update: function (element, valueAccessor, allBindingsAccessor) {
            var val = valueAccessor()(),
                currentDateTime = new Date(val),
                formattedDateTime = ("0" + (currentDateTime.getDate())).slice(-2) +
                                    '.' + ("0" + (currentDateTime.getMonth() + 1)).slice(-2) +
                                    '.' + currentDateTime.getFullYear() +
                                    '. ' + currentDateTime.getHours() +
                                    ':' + ("0" + (currentDateTime.getMinutes())).slice(-2) +
                                    ':' + ("0" + (currentDateTime.getSeconds())).slice(-2);

            if (val != undefined && val != null) {
                $(element).text(formattedDateTime);
            }
        }
    };

    // has hiddenInput
    //---------------------------
    ko.bindingHandlers.hiddenInputValue = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var hiddenVal = $(element).val(),
            bindings = allBindingsAccessor();
            ko.utils.unwrapObservable(valueAccessor());
           if (bindings.applyValue != undefined && bindings.applyValue() == false) {
              //ако изрично е казано да не се взема стойността от value (напр. в случаите, когато програмно се задава стойност на съдържанието)
               return;
            } else {
                bindings.hiddenInputValue(hiddenVal);
            }
        }
    };

    // file
    //---------------------------
    ko.bindingHandlers.file = {
        init: function (element, valueAccessor) {
            //не се поддържа File API и File Reader от browser-a
            if (!window.FileReader || window.FileAPIProxy) {
                //добавяме pollyfill
                require(['libs/swfobject'], function () {
                    require(['libs/jquery.FileReader'], function () {
                        $(element).fileReader({
                            debugMode: false,
                            filereader: gp.applicationRootURL() + 'Content/filereader.swf',
                            expressInstall: gp.applicationRootURL() + 'Content/expressInstall.swf',
                            callback: function () {
                                alert('FileReader ready!');
                            }
                        });
                    });
                });
            }
            $(element).on('change', function (evt) {
                //var file = FileAPI.getFiles(this)[0];
                //вземаме новия файл
                var file = evt.target.files[0];
                if (ko.isObservable(valueAccessor())) {
                    valueAccessor()(file);
                }
            });
        },

        update: function (element, valueAccessor, allBindingsAccessor) {
            var file = unwrap(valueAccessor());
            var bindings = allBindingsAccessor();
            if (file) {
                if (bindings.fileBinaryData && ko.isObservable(bindings.fileBinaryData)) {
                    var binaryReader = new FileReader();
                    binaryReader.onload = function (e) {
                        //запазваме съдържанието на приложения файл (като base64)
                        bindings.fileBinaryData(e.target.result.replace(/\s/g, '').match(/,(.*)$/m)[1]);//.match(/,(.*)/)[1]
                        bindings.fileName(file.name);
                        bindings.fileType(file.type);

                        //ако е приложен структуриран документ
                        if (bindings.isXML === true) {
                            var textReader = new FileReader();
                            textReader.onload = function (e) {
                                //махаме нови редове, табулации от xml съдържанието
                                var xmlContent = e.target.result.replace(/[\r\n\t]+/g, '');

                                //премахваме xml директивата от приложения структуриран документ                      
                                var matchedExpressions = xmlContent.match("<\\?.*\\?>");
                                xmlDirective = matchedExpressions !== null ? matchedExpressions[0] : null;

                                if (xmlDirective !== null)
                                    xmlContent = xmlContent.replace(xmlDirective, "");

                                bindings.xml(xmlContent.replace(xmlDirective, ""));                                

                                var xmlDocumentJSON = x2js.xml_str2json(bindings.xml());
                                var docName = "";
                                //намираме наименованието на root елемента
                                for (var i in xmlDocumentJSON) {
                                    docName = i;
                                    break;
                                }
                                //ако е възможно - да се прочетат Име и УРИ на приложения структуриран документ
                                var header = xmlDocumentJSON[docName].ElectronicAdministrativeServiceHeader;

                                var docTypeName = '', docTypeURIRegisterIndex = '', docTypeURIBatchNumber = '';

                                if (header != null)
                                {
                                    docTypeName = header.DocumentTypeName ? header.DocumentTypeName.toString() : '';
                                    docTypeURIRegisterIndex = header.DocumentTypeURI && header.DocumentTypeURI.RegisterIndex ? header.DocumentTypeURI.RegisterIndex.toString() : '',
                                    docTypeURIBatchNumber = header.DocumentTypeURI && header.DocumentTypeURI.BatchNumber ? header.DocumentTypeURI.BatchNumber.toString() : '';
                                }

                                bindings.documentTypeName(docTypeName);
                                bindings.documentTypeURIRegisterIndex(docTypeURIRegisterIndex);
                                bindings.documentTypeURIBatchNumber(docTypeURIBatchNumber);
                            };
                            //прочитаме файла като текст
                            textReader.readAsText(file);
                        }
                    };
                    //прочитаме файла в base64 encoding
                    binaryReader.readAsDataURL(file);
                }
            }
        }
    };

    // downloadFile
    //---------------------------
    ko.bindingHandlers.downloadFile = {
        init: function (element, valueAccessor) {
            //ако не се поддържа атрибута adownload за dataURL
            if (!Modernizr.adownload) {
                $(element).on('change', function (evt) {
                    var fileContent = evt.target.result;
                    if (ko.isObservable(valueAccessor())) {
                        valueAccessor()(fileContent);
                    }
                });

            }
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            //ако не се поддържа атрибута adownload за dataURL
            if (!Modernizr.adownload) {
                var fileContent = unwrap(valueAccessor()),
                    bindings = allBindingsAccessor(),
                    fileName = bindings.downloadFileName();
               
                //добавяме pollyfill
                require(['libs/swfobject'], function () {
                    require(['libs/downloadify'], function () {
                        //запазваме елемента/бутона, който ще предоставя възможност за download
                        var exportButton = $(element).next();
                        //запазваме размерите на елемента/бутона, който ще предоставя възможност за download
                        var exportButtonWidth = exportButton.outerWidth();
                        var exportButtonHeight = exportButton.outerHeight();
                      
                        var self = this,
                            fileOptions = {
                                filename: function () {
                                    return fileName;
                                },
                                data: function () {
                                    return fileContent;
                                },
                                dataType: 'base64',
                                onComplete: function () {
                                    alert('Your File Has Been Saved!');
                                },
                                onCancel: function () {
                                    alert('You have cancelled the saving of this file.');
                                },
                                onError: function () {
                                    alert('You must put something in the File Contents or there will be nothing to save!');
                                },
                                transparent: true,
                                swf: gp.applicationRootURL() + 'Content/downloadify.swf',
                                downloadImage: gp.applicationRootURL() + 'Content/bootstrap/img/downloadFileFlash.png',
                                width: exportButtonWidth,
                                height: exportButtonHeight,
                                transparent: true,
                                append: false
                            };
                        //задаваме настройки за библиотеката
                        $(element).downloadify(fileOptions);
                        //намираме елемента object за flash
                        var flashObject = $(element).find('[id^="downloadify"]');

                        // Set the Flash object to the same size as my button
                        //вземаме позицията и размерите на flash обеката
                        var exportButtonPosition = flashObject.position();

                        // Set my button directly underneath the Flash object
                        //позиционираме елемента/бутона за download ПОД flash обекта
                        exportButton.css({ top: exportButtonPosition.top, left: exportButtonPosition.left, position: 'absolute', 'z-index': -99999 });

                    });
                });
            }
        }
    };


    // escape
    //---------------------------
    ko.bindingHandlers.escape = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var command = valueAccessor();
            $(element).keyup(function (event) {
                if (event.keyCode === 27) { // <ESC>
                    command.call(viewModel, viewModel, event);
                }
            });
        }
    };

    // hidden
    //---------------------------
    ko.bindingHandlers.hidden = {
        update: function (element, valueAccessor) {
            var value = unwrap(valueAccessor());
            ko.bindingHandlers.visible.update(element, function () { return !value; });
        }
    };

    // checboxImage
    //---------------------------
    ko.bindingHandlers.checkboxImage = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var $el = $(element),
                settings = valueAccessor();

            $el.addClass('checkbox');

            $el.click(function () {
                if (settings.checked) {
                    settings.checked(!settings.checked());
                }
            });

            ko.bindingHandlers.checkboxImage.update(
                element, valueAccessor, allBindingsAccessor, viewModel);
        },
        update: function (element, valueAccessor) {
            var $el = $(element),
                settings = valueAccessor(),
                enable = (settings.enable !== undefined) ? unwrap(settings.enable()) : true,
                checked = (settings.checked !== undefined) ? unwrap(settings.checked()) : true;

            $el.prop('disabled', !enable);

            checked ? $el.addClass('selected') : $el.removeClass('selected');
        }
    };

    // favoriteCheckbox
    //---------------------------
    ko.bindingHandlers.favoriteCheckbox = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var $el = $(element);

            $el.addClass('markfavorite');

            ko.bindingHandlers.favoriteCheckbox.update(
                element, valueAccessor, allBindingsAccessor, viewModel);
        },
        update: function (element, valueAccessor) {
            var $el = $(element),
                valAccessor = valueAccessor(),
                enable = (valAccessor.enable !== undefined) ? unwrap(valAccessor.enable()) : true,
                checked = (valAccessor.checked !== undefined) ? unwrap(valAccessor.checked()) : true;

            $el.prop('disabled', !enable);
            if (checked) {
                if (enable) {
                    $el.attr('title', 'remove favorite');
                } else {
                    $el.attr('title', 'locked');
                }
            } else {
                $el.attr('title', 'mark as favorite');
            }

            checked ? $el.addClass('selected') : $el.removeClass('selected');
            enable ? $el.removeClass('locked') : $el.addClass('locked');
        }
    };

    // starRating
    //---------------------------
    ko.bindingHandlers.starRating = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            // Create the span's (only do in init)
            for (var i = 0; i < 5; i++) {
                $('<span>').appendTo(element);
            }

            ko.bindingHandlers.starRating.update(element, valueAccessor, allBindingsAccessor, viewModel);
        },

        update: function (element, valueAccessor, allBindingsAccessor) {
            // Give the first x stars the 'chosen' class, where x <= rating
            var ratingObservable = valueAccessor(),
                allBindings = allBindingsAccessor(),
                enable = (allBindings.enable !== undefined) ? unwrap(allBindings.enable) : true;

            // Toggle the appropriate CSS classes
            if (enable) {
                $(element).addClass('starRating').removeClass('starRating-readonly');
            } else {
                $(element).removeClass('starRating').addClass('starRating-readonly');
            }

            // Wire up the event handlers, if enabled
            if (enable) {
                // Handle mouse events on the stars
                $('span', element).each(function (index) {
                    var $star = $(this);

                    $star.hover(
                        function () {
                            $star.prevAll().add(this).addClass('hoverChosen');
                        },
                        function () {
                            $star.prevAll().add(this).removeClass('hoverChosen');
                        });

                    $star.click(function () {
                        //var ratingObservable = valueAccessor(); // Get the associated observable
                        ratingObservable(index + 1); // Write the new rating to it
                    });
                });
            }

            // Toggle the chosen CSS class (fills in the stars for the rating)
            $('span', element).each(function (index) {
                $(this).toggleClass('chosen', index < ratingObservable());
            });
        }
    };

    // editable table
    //---------------------------
    ko.bindingHandlers.editableHTML = {
        init: function (element, valueAccessor) {
            var $element = $(element);
            var initialValue = ko.utils.unwrapObservable(valueAccessor());
            $element.html(initialValue);
            $element.on('keyup', function () {
                observable = valueAccessor();
                observable($element.html());
            });
        }
    };
});