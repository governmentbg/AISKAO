using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TechnoLogica.Eservices.Public.Core.IServices;
using TechnoLogica.Eservices.Public.DataAccess;
using TechnoLogica.Eservices.Public.Site.Models.Administration;
using TechnoLogica.Eservices.Public.Site.Resources;

namespace TechnoLogica.Eservices.Public.Site.Controllers
{
    public class AdministrationController : Controller
    {
        private IAdministrationService _administrationInfo;

        public AdministrationController(IAdministrationService administrationInfo)
        {
            this._administrationInfo = administrationInfo;
        }
        
        [HttpGet]
        public ActionResult GetAdministrationInfo()
        {
            GetAdministrationInfoViewModel viewModel = new GetAdministrationInfoViewModel();
            WEB_ADM_INFORMATIONS administration = _administrationInfo.GetAdministrationInfo();
            viewModel = Mapper.Map<WEB_ADM_INFORMATIONS, GetAdministrationInfoViewModel>(administration);

            return View(viewModel);
        }

        [ChildActionOnly]
        public ActionResult GetAdministrationName()
        {
            GetAdministrationInfoViewModel viewModel = new GetAdministrationInfoViewModel();
            WEB_ADM_INFORMATIONS administration = _administrationInfo.GetAdministrationInfo();
            viewModel = Mapper.Map<WEB_ADM_INFORMATIONS, GetAdministrationInfoViewModel>(administration);

            return PartialView("_LayoutHeader", viewModel);
        }

        [ChildActionOnly]
        public ActionResult GetDetailInfo()
        {
            GetAdministrationInfoViewModel viewModel = new GetAdministrationInfoViewModel();
            WEB_ADM_INFORMATIONS administration = _administrationInfo.GetAdministrationInfo();
            viewModel = Mapper.Map<WEB_ADM_INFORMATIONS, GetAdministrationInfoViewModel>(administration);

            return PartialView("_LayoutAdministrationInfo", viewModel);
        }

    
     
    }
}
