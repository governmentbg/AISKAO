define('informationObjects/ViewModel',
    ['ko', 'jquery', 'durandal/system',
    'durandal/viewLocator',
    'GlobalParameters',
    'libs/xml2json',
    'modernizr',
    'common/ElectronicDocumentXml',
    'documents/RegisteredErrorsInDocumentContentDocument',
    'common/RegisteredErrorInDocumentContent',
    'common/RegisterObjectURI',
    'common/XMLDigitalSignature'],
    function (ko, $, system,
        viewLocator,
        gp,
        xml2json,
        modernizr,
        ElectronicDocumentXml,
        RegisteredErrorsInDocumentContentDocument,
        RegisteredErrorInDocumentContent,
        RegisterObjectURI,
        XMLDigitalSignature) {

        var ViewModel = function () {
            this._settings = ko.observable();
            this._settings.showErrors = ko.observable(false);
            this._settings.isEditable = ko.observable(false);
            this._settings.documentType = ko.observable();
            this._settings.xmlContent = ko.observable();
            //this._settings.administration = ko.observable();
            this._settings.documentNotFoundMessage = ko.observable();
            this._settings.applicationRootURL = ko.observable();
            this._settings.resultXML = ko.observable();
            this._settings.resultErrXML = ko.observable();
            this._settings.resultSignedXML = ko.observable();
            this._settings.moveXpath = ko.observable();
            this._settings.isSigned = ko.observable(false);
            this._settings.xmlContent.applyValue = ko.observable(true);
            this._settings.validartionErrors = ko.observableArray();
            this._settings.viewDocument = ko.observable(false);

            this._settings.fileBinaryData = ko.observable();
            this._settings.fileType = ko.observable();
            this._settings.fileName = ko.observable();
            this._settings.downloadLink = ko.computed(function () {
                return "data:" + this._settings.fileType() + ";base64," + this._settings.fileBinaryData();
            }, this);

            this._settings.errFileBinaryData = ko.observable();
            this._settings.errFileType = ko.observable();
            this._settings.errFileName = ko.observable();
            this._settings.errDownloadLink = ko.computed(function () {
                return "data:" + this._settings.errFileType() + ";base64," + this._settings.errFileBinaryData();
            }, this);


            this._settings.moveNS = ko.observable()

            this.doc = ko.observable();

            this.result = ko.observable('a');

            //this._settings.resultXML = ko.observable();
            //this._settings.resultErrXML = ko.observable();
            //this._settings.resultSignedXML = ko.observable();
        };

        ViewModel.prototype = function () {
            var self = this,
            editDocument = function () {
                this._settings.xmlContent.applyValue(false);
                this._settings.xmlContent(undefined);
                if (this._settings.isSigned()) {
                    alert("Документът е подписан! При редакция подписът ще бъде премахнат!");
                    this.doc().segment().electronicAdministrativeServiceFooter().xmlDigitalSignature(undefined);
                    this._settings.isSigned(false);
                }
                this._settings.showErrors(false);
                this._settings.viewDocument(false);
                viewLocator.translateViewIdToArea(system.getModuleId(this.doc()), 'Editor');
                gp.isLoadingDocument = false;
                this._settings.isEditable(false);
                return true;
            },
            viewDocument = function () {
                //за преглед на въведено съдържание - най-бързия начин засега...
                generateXML(this);
                this._settings.xmlContent.applyValue(false);
                this._settings.xmlContent(this._settings.resultXML());
                this._settings.viewDocument(true);
                this.loadDocumentContent();
                //return true;
            }
            //зареждане на документ по подадени параметри
            loadDocument = function () {
                var rootURL = this._settings.applicationRootURL() ? this._settings.applicationRootURL() : "";
                gp.applicationRootURL(rootURL);
                //ако е зададено наименованието на типа документ (root елемента/име на documents модул)
                if (this._settings.xmlContent()) {
                    this._settings.viewDocument(true);
                    this.loadDocumentContent();
                    this._settings.documentNotFoundMessage(undefined);
                    return true;
                } else if (this._settings.documentType()) {
                    this._settings.viewDocument(false);
                    this.createNewDocument();
                    this._settings.isEditable(false);
                    this._settings.documentNotFoundMessage(undefined);
                    return true;
                    //ако е подадено xml съдържание на документ
                }
                else {
                    this._settings.documentNotFoundMessage("Не е подаден тип на заявление за попълване!");
                }
            },
            //зареждане на документ за редакция
            createNewDocument = function () {
                if (this._settings.documentType()) {
                    var self = this,
                        //намираме наименованието на модула за зареждане
                        docName = getDocumentName(this._settings.documentType());
                    //зареждане на необходимите js файлове
                    requirejs([docName], function (document) {
                        //инициализиране на искания документ
                        self.doc(new document());
                        setSignXpathParams(self);
                    })

                }
            },

            loadDocumentContent = function (pIsAttachedXmlDocument) {
                var self = this;
                var xmlContent = this._settings.xmlContent();
                var isAttachedXmlDocument = pIsAttachedXmlDocument || false;

                var tempJSON = x2js.xml_str2json(xmlContent);
                var documentType;


                //getSignatureInfo(self);
                for (var i in tempJSON) {
                    documentType = i;
                    break;
                }

                var attXMLDocName = "";
                //За приложените структурирани документи
                if (!isAttachedXmlDocument) {
                    //от приложените документ
                    var attachedDocuments = tempJSON[documentType].AttachedDocuments;
                    if (attachedDocuments != undefined) {
                        var attachedXmlDocumentsArr = x2js.asArray(attachedDocuments.AttachedXmlDocument);
                        for (var idx in attachedXmlDocumentsArr) {
                            //TODO: Валидация на приложен структуриран документ
                            //TODO: Визуализация на приложен структуриран документ (засега линк към base64 съдържание на файла???)
                            var xmlDoc = attachedXmlDocumentsArr[idx];
                            try {
                                for (var j in xmlDoc.ElectronicDocumentXmlContent) {
                                    if (j != "__cnt") {
                                        attXMLDocName = j;
                                        break;
                                    }
                                }
                                xmlDoc.ElectronicDocumentXmlContent = x2js.json2xml_str(xmlDoc.ElectronicDocumentXmlContent);
                            } catch (e) {
                            }
                            finally {
                            }
                        }
                    }
                }

                gp.isLoadingDocument = true;
                var docName = getDocumentName(documentType);
                requirejs([docName], function (document) {
                    self.doc(new document());

                    setSignXpathParams(self);

                    viewLocator.translateViewIdToArea(system.getModuleId(self.doc()), 'Display');
                    self.doc()._settings.fromXML = tempJSON;
                    self.doc().fromJSON();


                    var signature = {};
                    if (tempJSON[documentType].ElectronicAdministrativeServiceFooter &&
                        tempJSON[documentType].ElectronicAdministrativeServiceFooter.XMLDigitalSignature != undefined &&
                        tempJSON[documentType].ElectronicAdministrativeServiceFooter.XMLDigitalSignature.Signature != undefined) {
                        signature = tempJSON[documentType].ElectronicAdministrativeServiceFooter.XMLDigitalSignature;
                        self.doc().segment().electronicAdministrativeServiceFooter()._settings.isSigned(true);
                        self.doc().segment().electronicAdministrativeServiceFooter().xmlDigitalSignature()._settings.isSigned(true);
                        self._settings.isSigned(true);
                    } else if (tempJSON[documentType].XMLDigitalSignature != undefined &&
                                tempJSON[documentType].XMLDigitalSignature.Signature != undefined) {
                        signature = tempJSON[documentType].XMLDigitalSignature;
                        self.doc().segment().xmlDigitalSignature()._settings.isSigned(true);
                        self._settings.isSigned(true);
                    } else if (tempJSON[documentType].Signature != undefined) {
                        signature = tempJSON[documentType].Signature;
                        self.doc().segment().xmlDigitalSignature()._settings.isSigned(true);
                        self._settings.isSigned(true);
                    }
                    if (self._settings.isSigned()) {
                        getSignatureInfo(self);
                    }

                    //За приложените структурирани документи
                    if (!isAttachedXmlDocument) {
                        if (self.doc().segment().attachedDocuments !== undefined && self.doc().segment().attachedDocuments() !== undefined && self.doc().segment().attachedDocuments().length > 0) {
                            var attDocs = self.doc().segment().attachedDocuments().attachedXmlDocument();
                            for (var i in attDocs) {
                                //base64 encoding на съдържанието на документа
                                //TODO: Да се добави pollyfill за IE                        
                                Modernizr.load({
                                    test: window.btoa && window.atob,
                                    nope: '../../scripts/libs/base64.min.js',
                                    complete: function () {
                                        attDocs[i].electronicDocumentXmlContent.fileBinaryData(window.btoa(unescape(encodeURIComponent(attDocs[i].electronicDocumentXmlContent()))));
                                        attDocs[i].electronicDocumentXmlContent.fileType("text/xml");
                                        attDocs[i].electronicDocumentXmlContent.fileName(attXMLDocName + ".xml");
                                    }
                                });
                            }
                        }
                    }

                    //ko.validation.group(self.doc);
                    generateErrXML(self);
                    self._settings.showErrors(self.doc.errors() && self.doc.errors().length > 0);
                    self._settings.isEditable(self.doc()._settings.isEditable());
                    //gp.isLoadingDocument = false;
                })
            },
            //намиране наименованието на модула за зареждане
            getDocumentName = function (documentType) {
                //ако е подадено наименование на администрация, за която се отнася документа се взема то
                //ако не е подадено наименование на администрация се търси в "common"
                //var adminName = administration !== undefined && administration.length > 0 ? administration + '/' : 'common/';
                //модула се локализира в папката за документи/име на администрация(или common)/име на документ
                var docName = 'documents/' + documentType;
                return docName;
            },
            getSignatureInfo = function (data) {
                var getSignatureInfoUrl = GetSignatureInfoUrl || {};
                if (getSignatureInfoUrl != undefined && getSignatureInfoUrl.length > 0) {

                    var self = data;
                    var segment = self.doc().segment();
                    var xmlDocument = ko.toJSON({
                        "content": self._settings.xmlContent()
                    });
                    return $.ajax({
                        type: "POST",
                        url: gp.applicationRootURL() + getSignatureInfoUrl,
                        processData: false,
                        contentType: 'application/json; charset=utf-8',
                        data: xmlDocument
                    }).done(function (data) {
                        //var signData = data.signInfo;
                        var signature = "";
                        if (segment.electronicAdministrativeServiceFooter &&
                            segment.electronicAdministrativeServiceFooter() &&
                            segment.electronicAdministrativeServiceFooter().xmlDigitalSignature) {
                            signature = segment.electronicAdministrativeServiceFooter().xmlDigitalSignature();
                        }
                        if (segment.xmlDigitalSignature &&
                            segment.xmlDigitalSignature()) {
                            signature = segment.xmlDigitalSignature();
                        }
                        var signData = ko.utils.parseJson(data);
                        if (signData !== undefined) {
                            //signature(signData);

                            signature.issuarName(signData.issuarName);
                            signature.issuarAddress(signData.issuarAddress);
                            signature.issuarIdentifier(signData.issuarIdentifier);

                            signature.titularName(signData.titularName);
                            signature.titularAddress(signData.titularAddress);
                            signature.titularRegistration(signData.titularRegistration);
                            signature.authorQuality(signData.authorQuality);

                            signature.authorName(signData.authorName);
                            signature.authorAddress(signData.authorAddress);

                            signature.validFrom(signData.validFrom);
                            signature.validTo(signData.validTo);

                            signature.restriction(signData.restriction);
                            signature.serialNumber(signData.serialNumber);
                        } else if (data !== undefined && data.message !== undefined && data.message.length > 0) {
                            alert(data.message)
                            segment.electronicAdministrativeServiceFooter().xmlDigitalSignature(' ');
                        }
                    });
                }
            };
            setSignXpathParams = function (data) {
                var self = data;
                var segment = self.doc().segment();
                if (segment.electronicAdministrativeServiceFooter && segment.electronicAdministrativeServiceFooter() && segment.electronicAdministrativeServiceFooter().xmlDigitalSignature) {
                    var xPath = '/s1:' + self._settings.documentType() + '/s1:ElectronicAdministrativeServiceFooter/s2:XMLDigitalSignature';
                    self._settings.moveXpath(xPath);
                    var xmlns = "s1='" + self.doc()._settings.xmlns + "',s2='" + segment.electronicAdministrativeServiceFooter()._settings.xmlns + "'";
                    self._settings.moveNS(xmlns);

                } else if (segment.xmlDigitalSignature && segment.xmlDigitalSignature()) {
                    var xPath = '/s1:' + self._settings.documentType() + '/s1:XMLDigitalSignature';
                    self._settings.moveXpath(xPath);
                    var xmlns = "s1='" + self.doc()._settings.xmlns + "'";
                    self._settings.moveNS(xmlns);
                }
            };
            generateXML = function (data) {
                var self = data;
                self._settings.resultXML('');
                var tempJSON = ko.toJSON(self.doc);
                var tmpJSONJS = ko.utils.parseJson(tempJSON);
                var xmlDirective = "<?xml version='1.0' encoding='utf-8' ?>";
                var tempXML = xmlDirective + x2js.json2xml_str(tmpJSONJS);
                //return tempXML;
                self._settings.resultXML(tempXML);
                return true;
                //this._settings.resultXML(tempXML);
            },
            signXML = function () {
                this._settings.resultSignedXML('');
                var tempXML = '';
                this._settings.resultSignedXML(tempXML);
            },
            createSignElement = function (data) {
                var self = data;
                var segment = self.doc().segment();
                //ако съществува непразен footer елемент (документът е заявление)
                if (segment.electronicAdministrativeServiceFooter && segment.electronicAdministrativeServiceFooter() && segment.electronicAdministrativeServiceFooter().xmlDigitalSignature) {
                    segment.electronicAdministrativeServiceFooter().xmlDigitalSignature(new XMLDigitalSignature());
                    setSignXpathParams(self);
                }
                    //ако не съществува xmlDigitalSignature елемент (документът е удостоверение)
                else if (segment.xmlDigitalSignature) {
                    segment.xmlDigitalSignature(new XMLDigitalSignature());
                    setSignXpathParams(self);
                }
            },
            downloadXML = function () {
                var self = this;
                var docXMLName = self.doc().segment()._settings.sectionTitle;
                generateXML(self);
                Modernizr.load({
                    test: window.btoa && window.atob,
                    nope: '../../scripts/libs/base64.min.js',
                    complete: function () {
                        self._settings.fileBinaryData(window.btoa(unescape(encodeURIComponent(self._settings.resultXML()))));
                        self._settings.fileType("text/xml");
                        self._settings.fileName(docXMLName + ".xml");
                    }
                });
            },
             downloadErrXML = function (data) {
                 var self = data;
                 self._settings.resultErrXML.subscribe(function (data) {
                     if (self.errDoc !== undefined) {
                         var docXMLName = self.errDoc.segment._settings.sectionTitle;
                         Modernizr.load({
                             test: window.btoa && window.atob,
                             nope: '../../scripts/libs/base64.min.js',
                             complete: function () {
                                 self._settings.errFileBinaryData(window.btoa(unescape(encodeURIComponent(data))));
                                 self._settings.errFileType("text/xml");
                                 self._settings.errFileName(docXMLName + ".xml");
                             }
                         });
                     }
                 }, self);
                 generateErrXML(self);
             },

            generateErrXML = function (data) {
                var self = data || this;
                self._settings.resultErrXML('');
                self.errDoc = new RegisteredErrorsInDocumentContentDocument();
                var err;
                var docXML;
                if (self._settings.xmlContent != undefined && self._settings.xmlContent() !== undefined && self._settings.xmlContent().length > 0) {
                    docXML = self._settings.xmlContent();
                } else {
                    self.generateXML(self);
                    docXML = self._settings.resultXML();
                }
                ko.validation.group(self.doc);
                if (!self.doc.isValid()) {
                    for (var i in self.doc.errors()) {
                        if (ko.isObservable(self.doc.errors()[i]) && self.doc.errors()[i]() !== undefined && self.doc.errors()[i]() !== null) {
                            err = parseErrorMessage(self.doc.errors()[i]());
                            self.errDoc.segment.registeredErrors().errors.push(err);
                        }
                    }
                }
                //var self = this;
                self._settings.validartionErrors(ko.utils.arrayMap(self.doc.errors(), function (item) {
                    return item();
                }));
                validateXML(docXML, self.errDoc, self._settings.validartionErrors)
                .then(function () {
                    self._settings.showErrors(self._settings.validartionErrors() != undefined && self._settings.validartionErrors().length > 0);
                    var errResult = genErrXMLFromObj(self.errDoc);
                    self._settings.resultErrXML(errResult);
                    if (self.errDoc.segment.registeredErrors().errors.length > 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            },
            genErrXMLFromObj = function (errDoc) {
                var tempJSON = ko.toJSON(errDoc);
                var tmpJSONJS = ko.utils.parseJson(tempJSON);
                var tempXML = "<?xml version='1.0' encoding='utf-8' ?>" + x2js.json2xml_str(tmpJSONJS);

                return tempXML;
            },
            parseErrorMessage = function (msg) {
                var regIndex,
                    batchNumber,
                    errMessage;

                regIndex = msg.match(/^0*(\d*)-/)[1];
                batchNumber = msg.match(/-0*(\d*)/)[1];
                errMessage = msg.match(/:\s(.*)$/)[1];

                var err = new RegisteredErrorInDocumentContent();
                var termURI = new RegisterObjectURI();
                termURI.registerIndex(regIndex);
                termURI.batchNumber(batchNumber);
                err.termURI(termURI);
                err.errorDescription(errMessage);

                return err;
            },
            validateXML = function (docContent, errDoc, errors) {
                var xmlDocument = ko.toJSON({
                    "documentContent": docContent
                });
                return $.ajax({
                    type: "POST",
                    url: gp.applicationRootURL() + "odata/Documents/ValidateXML",
                    processData: false,
                    contentType: 'application/json; charset=utf-8',
                    data: xmlDocument
                }).done(function (errData) {
                    if (errData) {
                        var err = parseErrorMessage(errData["odata.error"].message.value);
                        errDoc.segment.registeredErrors().errors.push(err);
                        errors.push(errData["odata.error"].message.value);
                    }
                });
            },

            getView = function () {
                return 'templates/ViewModel';
            }

            return {
                downloadXML: downloadXML,
                downloadErrXML: downloadErrXML,
                editDocument: editDocument,
                viewDocument: viewDocument,
                loadDocument: loadDocument,
                createNewDocument: createNewDocument,
                loadDocumentContent: loadDocumentContent,
                getDocumentName: getDocumentName,
                generateXML: generateXML,
                signXML: signXML,
                generateErrXML: generateErrXML,
                genErrXMLFromObj: genErrXMLFromObj,
                getSignatureInfo: getSignatureInfo,
                validateXML: validateXML,
                getView: getView
            };
        }();

        return ViewModel;

    }
);