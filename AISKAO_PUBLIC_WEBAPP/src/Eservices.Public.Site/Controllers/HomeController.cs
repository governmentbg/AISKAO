using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TechnoLogica.Eservices.Public.Core.IServices;
using TechnoLogica.Eservices.Public.DataAccess;
using TechnoLogica.Eservices.Public.Site.Models.Administration;

namespace TechnoLogica.Eservices.Public.Site.Controllers
{
    public class HomeController : Controller
    {
        private IAdministrationService _administrationInfo;

        public HomeController(IAdministrationService administrationInfo)
        {
            this._administrationInfo = administrationInfo;
        }

        [HttpGet]
        public ActionResult About()
        {
            GetAdministrationInfoViewModel viewModel = new GetAdministrationInfoViewModel();
            WEB_ADM_INFORMATIONS administration = _administrationInfo.GetAdministrationInfo();
            viewModel = Mapper.Map<WEB_ADM_INFORMATIONS, GetAdministrationInfoViewModel>(administration);
            return View(viewModel);
        }

        [HttpGet]
        public ActionResult AccessibilityPolicy()
        {
            return View();
        }


        [HttpGet]
        public ActionResult SiteMap()
        {
            return View();
        }

        public ActionResult Help()
        {
            return View();
        }

    }
}
