using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Eservices.AISClient;
using System.Xml;
using TechnoLogica.Eservices.Public.Core.IServices;
using System.Xml.Linq;

namespace TechnoLogica.Eservices.Public.Site.Controllers
{
    public class RequestController : Controller
    {

        private IDocumentsReceptionService _documentsReceptionService;

        public RequestController(IDocumentsReceptionService docReceptionService)
        {
            this._documentsReceptionService = docReceptionService;
        }


        #region Иницииране на услуга

        [HttpGet]
        public ActionResult ManageInitiatingDocument(string DocumentTypeName = "")
        {
            TempData.Keep("XmlDocumentContent");

            if (DocumentTypeName != null && !DocumentTypeName.Equals(String.Empty))
            {
                ViewBag.DocumentTypeName = DocumentTypeName;
                TempData.Remove("XmlDocumentContent");
                TempData["Caller"] = "Start";
            }
            return View("ManageInitiatingDocument");
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ManageInitiatingDocument(FormCollection fc)
        {
            TempData["XmlDocumentContent"] = fc["content"];

            return RedirectToAction("ManageInitiatingDocument", "Request");
        }


        [HttpGet]
        public ActionResult SignInitiatingDocument(string documentType)
        {
            ViewBag.DocumentTypeName = documentType;

            TempData.Keep("XmlDocumentContent");
            TempData.Keep("MoveXpath");
            TempData.Keep("MoveNS");

            return View("SignInitiatingDocument");
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult SignInitiatingDocument(string content, string moveXpath, string moveNS, string DocumentTypeName)
        {
            TempData["XmlDocumentContent"] = content;
            TempData["MoveXpath"] = moveXpath;
            TempData["MoveNS"] = moveNS;

            //ViewBag.serviceId = serviceId;
            //ViewBag.DocumentTypeName = DocumentTypeName;

            return RedirectToAction("SignInitiatingDocument", new { documentType = DocumentTypeName });
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult SubmitInitiatingDocument(string xmlContent)
        {
            TempData.Remove("XmlDocumentContent"); //is needed?

            Service _eservice = new Service();
            string resultDocument = _eservice.Initiate(xmlContent);

            TempData["XmlDocumentContent"] = resultDocument;

            return RedirectToAction("ResultDocument", "Request");
        }
        
        #endregion


        #region Добавяне на допълнителен документ към услуга
        [HttpGet]
        public ActionResult ManageAdditionalDocument(int? serviceId)
        {
            Service _eservice = new Service();

            //if (TempData["XmlDocumentContent"] == null)
            if (serviceId == null)
            {
                string uri = TempData["URI"].ToString();
                string serviceIdentifier = TempData["serviceIdentifier"].ToString();

                string xmlContent = _documentsReceptionService.LastRecievedDocumentXMLContent(uri);

                //намиране на Initiating document root element name
                ViewBag.DocumentTypeName = _documentsReceptionService.GetXsdRootElementName(uri);

                int electronicServiceId = _documentsReceptionService.GetServiceId(uri);
                ViewBag.serviceId = electronicServiceId;

                //Премахване на footer елемента на xml съдърържанието.
                xmlContent = _eservice.RemoveFooterElement(xmlContent);

                //Променяне на Application Type и добавяне на DocumentUri елемент
                xmlContent = _eservice.ChangeApplicationType(xmlContent);
                if (!_eservice.ContainsDocumentURIElement(xmlContent))
                {
                    xmlContent = _eservice.WriteUriInDocContent(xmlContent, electronicServiceId);
                }

                TempData["XmlDocumentContent"] = xmlContent;
                TempData.Keep("URI");
                TempData.Keep("serviceIdentifier");
            }
            else
            {
                ViewBag.serviceId = serviceId;
            }
            return View("ManageAdditionalDocument");
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult ManageAdditionalDocument(string content, int serviceId)
        {
            TempData["XmlDocumentContent"] = content;

            return RedirectToAction("ManageAdditionalDocument", "Request", new { serviceId = serviceId });
        }


        [HttpGet]
        public ActionResult SignAdditionalDocument(string documentType, int serviceId)
        {

            //ViewBag.serviceId = TempData["ServiceId"];
            ViewBag.serviceId = serviceId;
            ViewBag.DocumentTypeName = documentType;

            TempData.Keep("XmlDocumentContent");
            TempData.Keep("MoveXpath");
            TempData.Keep("MoveNS");

            return View("SignAdditionalDocument");
        }

        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult SignAdditionalDocument(string content, string moveXpath, string moveNS, string DocumentTypeName, string serviceId)
        {
            TempData["XmlDocumentContent"] = content;
            TempData["MoveXpath"] = moveXpath;
            TempData["MoveNS"] = moveNS;

            //ViewBag.serviceId = serviceId;
            //ViewBag.DocumentTypeName = DocumentTypeName;

            return RedirectToAction("SignAdditionalDocument", new { documentType = DocumentTypeName, serviceId = serviceId });
        }


        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult SubmitAdditionalDocument(string xmlContent, int serviceId)
        {
            Service _eservice = new Service();
            string resultDocument = _eservice.SubmitAdditionalDocument(xmlContent, serviceId);

            TempData["XmlDocumentContent"] = resultDocument;

            return RedirectToAction("ResultDocument", "Request");
        } 
        #endregion


        [HttpGet]
        public ActionResult ResultDocument()
        {
            TempData.Keep("XmlDocumentContent");
            return View("ResultDocument");
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult ValidateSignature(string content)
        {
            var message = "";

            //byte[] data = Convert.FromBase64String(content);
            //string xml = Encoding.UTF8.GetString(data);
            //var utils = _signService.GetXMLDigitalSignatureInfo(xml);

            SignService _signService = new SignService();
            bool signInfo = _signService.Verify(content);//, out exceptionsList);
            if (signInfo)
            {
                message = "Подписът е валиден!";
            }
            else
            {
                message = "Подписът НЕ е валиден!";
            }
            return Json(new { message = message });
        }

        [HttpPost]
        [ValidateInput(false)]
        public JsonResult GetSignatureInfo(string content)
        {
            TempData["XmlDocumentContent"] = content;
            SignService _signService = new SignService();
            var signInfo = _signService.GetXMLDigitalSignatureInfo(content);
            if (signInfo != null)
            {
                var resultObject = new
                {
                    issuarName = signInfo.IssuerNameCommonName,
                    issuarAddress = signInfo.IssuerAddress,
                    issuarIdentifier = signInfo.IssuerBulstat,

                    titularName = signInfo.TitularName,
                    titularAddress = signInfo.TitularAddres,
                    titularRegistration = signInfo.TitularOrgCourtRegistration,
                    authorQuality = signInfo.AuthorQuality,

                    authorName = signInfo.SubjectCommonName,
                    authorAddress = signInfo.SubjectAddress,


                    validFrom = signInfo.NotBefore.ToString("dd.MM.yyyy hh:mm:ss"),
                    validTo = signInfo.NotAfter.ToString("dd.MM.yyyy hh:mm:ss"),

                    restriction = signInfo.CretificateUsageRestrictions,
                    serialNumber = signInfo.SerialNumber
                };
                var result = new JavaScriptSerializer().Serialize(resultObject);
                return Json(result);
            }
            else
            {
                return Json(new { message = "Не са намерени данни за подпис" });
            }
        }

    }
}
