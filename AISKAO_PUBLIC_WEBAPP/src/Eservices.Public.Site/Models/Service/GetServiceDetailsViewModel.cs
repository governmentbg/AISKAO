using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TechnoLogica.Eservices.Public.Site.Models.Service
{
    public class GetServiceDetailsViewModel
    {
         [Required(ErrorMessageResourceType = typeof(Resources.ErrorMessages), ErrorMessageResourceName = "ValidationRequiredField")]
        [HiddenInput(DisplayValue = false)]
        public int ServiceId { get; set; }

        [Display(ResourceType = typeof(Resources.Service), Name = "ServiceName")]
        public string Name { get; set; }

        [Display(ResourceType = typeof(Resources.Service), Name = "ServiceDescription")]
        public string PublicInformationDescription { get; set; }

        [Display(ResourceType = typeof(Resources.Service), Name = "CompetentAuthority")]
        public string PublicInformationCompetentAuthority { get; set; }

        [Display(ResourceType = typeof(Resources.Service), Name = "Applicant")]
        public string PublicInformationApplicant { get; set; }

        [Display(ResourceType = typeof(Resources.Service), Name = "PaymentAndTermDescription")]
        public string PublicInformationPaymentAndTermDescription { get; set; }

        [Display(ResourceType = typeof(Resources.Service), Name = "ServiceResponsible")]
        public string PublicInformationServiceResponsible { get; set; }

        [Display(ResourceType = typeof(Resources.Service), Name = "RefusalAppealProcedureDescription")]
        public string PublicInformationRefusalAppealProcedureDescription { get; set; }

        [Display(ResourceType = typeof(Resources.Service), Name = "ResultDesription")]
        public string PublicInformationResultDesription { get; set; }


        public IQueryable<ServiceTypeInfoBitsViewModel> ServiceTypeBits { get; set; }

        //Правно основание
        [Display(ResourceType = typeof(Resources.Service), Name = "LegalBasis")]
        public IEnumerable<ServiceTypeInfoBitsViewModel> LegalBasis { get; set; }

        //Необходим документ
        [Display(ResourceType = typeof(Resources.Service), Name = "RequiredDocument")]
        public IEnumerable<ServiceTypeInfoBitsViewModel> RequiredDocument { get; set; }

        //Изискване към документите
        [Display(ResourceType = typeof(Resources.Service), Name = "DocumentRequirement")]
        public IEnumerable<ServiceTypeInfoBitsViewModel> DocumentRequirement { get; set; }

        //Информация за плащане
        [Display(ResourceType = typeof(Resources.Service), Name = "PaymentInformation")]
        public IEnumerable<ServiceTypeInfoBitsViewModel> PaymentInformation { get; set; }

        //Начини за подаване на електронни документи
        [Display(ResourceType = typeof(Resources.Service), Name = "RequestMethod")]
        public IEnumerable<ServiceTypeInfoBitsViewModel> RequestMethod { get; set; }

        //Вътрешен ход на административната услуга
        [Display(ResourceType = typeof(Resources.Service), Name = "InternalStep")]
        public IEnumerable<ServiceTypeInfoBitsViewModel> InternalStep { get; set; }

        //public IEnumerable<SupportedServiceTermTypeViewModel> SupportedServiceTerm { get; set; }

        //public IEnumerable<SupportedServiceResultReceiptMethodsViewModel> SupportedServiceResultReceipt { get; set; }

        ////public IEnumerable<ISupportedServiceTermType> SupportedServiceTermTypes { get; set; }

        ////public IEnumerable<ISupportedServiceResultReceiptMethod> SupportedServiceResultReceiptMethods { get; set; }

    }
}