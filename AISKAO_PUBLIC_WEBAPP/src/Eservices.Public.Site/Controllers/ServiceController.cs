using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using TechnoLogica.Eservices.Public.Core.IServices;
using TechnoLogica.Eservices.Public.DataAccess;
using TechnoLogica.Eservices.Public.Site.Models.Service;

namespace TechnoLogica.Eservices.Public.Site.Controllers
{
    public class ServiceController : Controller
    {
        private IServiceService _service;

        public ServiceController(IServiceService service)
        {
            this._service = service;
        }
        [HttpGet]
        public ActionResult ListServices()
        {
            ListServicesViewModel viewModel = new ListServicesViewModel();
            List<WEB_SERVICE_TYPES_V> allServices = _service.GetServices().OrderBy(x => x.NAME).ToList();
            List<ServiceViewModel> services = Mapper.Map<List<WEB_SERVICE_TYPES_V>, List<ServiceViewModel>>(allServices);
            viewModel.Service = services;

            TempData.Remove("XmlDocumentContent");
            TempData.Remove("URI");
            TempData.Remove("serviceIdentifier");

            return View(viewModel);
        }


        [HttpGet]
        public ActionResult GetServiceDetails(int serviceId)
        {
            GetServiceDetailsViewModel viewModel = new GetServiceDetailsViewModel();
            var serviceType = _service.ServiceTypeRepo.FindSingle(t => t.ID == serviceId);
            if (serviceType != null)
            {
                var serviceTypePublicInfo = _service.ServiceTypePublicInfoRepo.FindSingle(t => t.ID == serviceId);
                    viewModel = Mapper.Map<WEB_SRVC_TYPE_PUBLIC_INFO, GetServiceDetailsViewModel>(serviceTypePublicInfo);
                    viewModel.Name = serviceType.NAME;
                    //Цялата информация към дадена услуга
                    IEnumerable<WEB_SRVC_TYPE_INF_BITS> srvtypes = _service.GetServiceTypesInfo(serviceId).ToList();
                    IEnumerable<ServiceTypeInfoBitsViewModel> serviceTypes =
                        Mapper.Map<IEnumerable<WEB_SRVC_TYPE_INF_BITS>, IEnumerable<ServiceTypeInfoBitsViewModel>>(
                            srvtypes);

                    ////Информация за правно основание
                    IEnumerable<ServiceTypeInfoBitsViewModel> legalBasis =
                        Mapper.Map<IEnumerable<WEB_SRVC_TYPE_INF_BITS>, IEnumerable<ServiceTypeInfoBitsViewModel>>(
                            srvtypes.Where(a => a.SERVICE_INF_BIT_TYPE_CODE == "LegalBasis"));
                    viewModel.LegalBasis = legalBasis;

                    ////Информация за необходими документи
                    IEnumerable<ServiceTypeInfoBitsViewModel> requiredDocuments =
                        Mapper.Map<IEnumerable<WEB_SRVC_TYPE_INF_BITS>, IEnumerable<ServiceTypeInfoBitsViewModel>>(
                            srvtypes.Where(a => a.SERVICE_INF_BIT_TYPE_CODE == "RequiredDocument"));
                    viewModel.RequiredDocument = requiredDocuments;

                    ////Информация за изискване към документи
                    IEnumerable<ServiceTypeInfoBitsViewModel> documentRequirements =
                        Mapper.Map<IEnumerable<WEB_SRVC_TYPE_INF_BITS>, IEnumerable<ServiceTypeInfoBitsViewModel>>(
                            srvtypes.Where(a => a.SERVICE_INF_BIT_TYPE_CODE == "DocumentRequirement"));
                    viewModel.DocumentRequirement = documentRequirements;

                    ////Информация за плащане
                    IEnumerable<ServiceTypeInfoBitsViewModel> paymentInformations =
                        Mapper.Map<IEnumerable<WEB_SRVC_TYPE_INF_BITS>, IEnumerable<ServiceTypeInfoBitsViewModel>>(
                            srvtypes.Where(a => a.SERVICE_INF_BIT_TYPE_CODE == "PaymentInformation"));
                    viewModel.PaymentInformation = paymentInformations;

                    ////Информация за начин за подаване на ел.документи
                    IEnumerable<ServiceTypeInfoBitsViewModel> requestMethods =
                        Mapper.Map<IEnumerable<WEB_SRVC_TYPE_INF_BITS>, IEnumerable<ServiceTypeInfoBitsViewModel>>(
                            srvtypes.Where(a => a.SERVICE_INF_BIT_TYPE_CODE == "RequestMethod"));
                    viewModel.RequestMethod = requestMethods;

                    ////Информация за вътрешен ход на административната услуга
                    IEnumerable<ServiceTypeInfoBitsViewModel> internalSteps =
                        Mapper.Map<IEnumerable<WEB_SRVC_TYPE_INF_BITS>, IEnumerable<ServiceTypeInfoBitsViewModel>>(
                            srvtypes.Where(a => a.SERVICE_INF_BIT_TYPE_CODE == "InternalStep"));
                    viewModel.InternalStep = internalSteps;

                    viewModel.ServiceTypeBits = serviceTypes.AsQueryable();
                    return View(viewModel);
                }
                else{
                
                    return RedirectToAction("ListServices");
                }
            

        }


    }
}
