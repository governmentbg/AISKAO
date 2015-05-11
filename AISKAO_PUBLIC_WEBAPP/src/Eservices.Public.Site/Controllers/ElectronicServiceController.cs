using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.UI.WebControls;
using Antlr.Runtime;
using AutoMapper;
using Microsoft.SqlServer.Server;
using TechnoLogica.Eservices.Common.ExceptionManagement;
using TechnoLogica.Eservices.Public.Core.IServices;
using TechnoLogica.Eservices.Public.DataAccess;
using TechnoLogica.Eservices.Public.Site.Models.ElectronicService;
using TechnoLogica.Eservices.Public.Site.Models.Service;
using TechnoLogica.Eservices.Public.Core.DTOs;
using TechnoLogica.Eservices.Public.Infrastructure.Site;
using Eservices.AISClient;

namespace TechnoLogica.Eservices.Public.Site.Controllers
{

    public class ElectronicServiceController : Controller
    {
        private IServiceService _service;
        private IElectronicServiceService _eService;

        public ElectronicServiceController(IServiceService service, IElectronicServiceService eService)
        {
            this._service = service;
            this._eService = eService;
        }

        [HttpGet]
        public ActionResult SearchElectronicService()
        {
            //throw new BusinessException("Test");
            TempData.Remove("URI");
            TempData.Remove("serviceIdentifier");

            return View();
        }

        [CaptchaValidator] 
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SearchElectronicService(GetEServiceAccessViewModel viewModel, bool captchaValid)
        {
            
            if (ModelState.IsValid)
            {
                if (captchaValid)
                {
                    try
                    {
                        TempData["URI"] = viewModel.URI;
                        TempData["serviceIdentifier"] = viewModel.Identifier;
                        return RedirectToAction("GetEServiceDetails", "ElectronicService");
                    }
                    catch (Exception)
                    {
                        return View(viewModel);
                    }
                }
                else
                {
                    ModelState.AddModelError("ReCaptcha", "Кодът от картинката е невалиден.");
                    return View(viewModel);
                }
                
            }
            else
            {
                return View(viewModel);
            }

        }

        [HttpGet]
        public ActionResult GetEServiceDetails()
        {
            if (TempData["URI"] != null && TempData["serviceIdentifier"] != null)
            {
                GetEServiceDetailsViewModel viewModel = new GetEServiceDetailsViewModel();

                TempData.Keep("URI");
                TempData.Keep("serviceIdentifier");

                string uri = TempData["URI"].ToString();
                string serviceIdentifier = TempData["serviceIdentifier"].ToString();

                var initialDocument = _eService.RegisteredDocumentsRepo.FindSingle(s => s.URI == uri && s.ACCESS_IDENTIFIER == serviceIdentifier);
                //var test = _eService.GetDocumentContent(initialDocument.CONTENT_ID);

                if (initialDocument != null)
                {
                    viewModel.InitialDocumentName = initialDocument.NAME;
                    viewModel.InitialDocumentURI = initialDocument.URI;
                    viewModel.AccessIdentifier = serviceIdentifier;

                    var currService = _service.ServiceTypeRepo.FindSingle(s => s.ID == initialDocument.SERVICE_TYPE_ID);

                    viewModel.ServiceTypeName = currService.NAME;
                    viewModel.ServiceTypeDescription = currService.DESCRIPTION;


                    IEnumerable<WEB_E_SERVICE_STATUS_V> serviceStages = _eService.GetServiceStages(initialDocument.ID);
                    viewModel.Stages = Mapper.Map<IEnumerable<WEB_E_SERVICE_STATUS_V>, IEnumerable<ElectronicServiceStageViewModel>>(serviceStages);

                    IEnumerable<OfficialDocumentsDTO> officialDocs = _eService.GetOfficialDocuments(initialDocument.ID);
                    viewModel.OfficialDocuments =
                        Mapper.Map<IEnumerable<OfficialDocumentsDTO>, IEnumerable<OfficialDocumentViewModel>>(officialDocs);

                    return View(viewModel);
                }
                else
                {
                    TempData["ErrorMessage"] = Resources.ErrorMessages.NoInfoForSuchElectronicService;

                    return RedirectToAction("SearchElectronicService");
                }
            }

            return RedirectToAction("ListServices", "Service");

        }

        public ActionResult GetDocumentContent(int contentId)
        {
            //Само ако в сесията се пазят стойностите на URI и serviceIdentifier, се пристъпва до изпълнение на действието на контролера
            //В противен случай се пренасочваме към началната страница
            //По този начин тази страница ще е достъпна, само ако сме дошли на нея от предишната страница, в която е въведена информацията за достъп до инф. за услугата
            if (TempData["URI"] != null && TempData["serviceIdentifier"] != null)
            {
                string uri = TempData["URI"].ToString();
                string serviceIdentifier = TempData["serviceIdentifier"].ToString();


                //Id на документа, който ще се показва се подава по url. 
                //За да се избегне достъп на потребителя до съдържание, което не е част от неговата преписка, се прави проверка за подаденото по url id
                //Само ако то е част от преписката, идентифицирана чрез данните от сесията: URI и serviceIdentifier, ще се покаже съдържанието на документа.
                //В противен случай се пренасочваме към началната страница.
                if (HasAccessToDocument(uri, serviceIdentifier, contentId))
                {

                    string xmlDocumentContent = _eService.GetDocumentContent(contentId);
                    Service _eservice = new Service();

                    xmlDocumentContent = _eservice.RemoveFooterElementWithEmptySignature(xmlDocumentContent);
                    TempData["XmlDocumentContent"] = xmlDocumentContent;

                    TempData.Keep("XmlDocumentContent");
                    TempData.Keep("URI");
                    TempData.Keep("serviceIdentifier");
                }
                else
                {
                    TempData.Remove("XmlDocumentContent");
                    return RedirectToAction("ListServices", "Service");
                }
            }
            else
            {
                TempData.Remove("XmlDocumentContent");
                return RedirectToAction("ListServices", "Service");
            }

            return View("ShowDocumentContent");
        }

        public ActionResult DownloadDocument(int contentId, string docName, string mimeType, int isXml)
        {
            if (TempData["URI"] != null && TempData["serviceIdentifier"] != null)
            {
                TempData.Keep("URI");
                TempData.Keep("serviceIdentifier");

                string uri = TempData["URI"].ToString();
                string serviceIdentifier = TempData["serviceIdentifier"].ToString();

                if(HasAccessToDocument(uri, serviceIdentifier, contentId))
                {
                    string fileType;
                    string encodedFileName;

                    try
                    {
                        byte[] file = _eService.GetDocumentDownloadContent(contentId, docName, mimeType, isXml, out fileType, out encodedFileName);

                        return File(file, fileType, encodedFileName);
                    }
                    catch
                    {
                        return new EmptyResult();
                    }
                }
                else
                {
                    TempData.Remove("XmlDocumentContent");
                    return RedirectToAction("ListServices", "Service");
                }

            }
            else
            {
                TempData.Remove("XmlDocumentContent");
                return RedirectToAction("ListServices", "Service");
            }
        }

        private bool HasAccessToDocument(string uri, string serviceIdentifier, int contentId)
        {
            var initialDocument = _eService.RegisteredDocumentsRepo.FindSingle(s => s.URI == uri && s.ACCESS_IDENTIFIER == serviceIdentifier);
            if (initialDocument == null)
                return false;

            IEnumerable<OfficialDocumentsDTO> officialDocs = _eService.GetOfficialDocuments(initialDocument.ID);

            var officialDocumentsList =
                Mapper.Map<IEnumerable<OfficialDocumentsDTO>, IEnumerable<OfficialDocumentViewModel>>(officialDocs);

            if (officialDocumentsList.Select(d => d.ContentId).Contains(contentId))
                return true;
            else
                return false;
        }
    }
}


