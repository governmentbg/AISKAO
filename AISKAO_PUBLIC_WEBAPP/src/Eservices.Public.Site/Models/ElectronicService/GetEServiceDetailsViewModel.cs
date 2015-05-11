using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.AccessControl;
using System.Web;

namespace TechnoLogica.Eservices.Public.Site.Models.ElectronicService
{
    public class GetEServiceDetailsViewModel
    {
        [Display(ResourceType = typeof(Resources.ElectronicService), Name = "InitialDocumentName")]
        public string InitialDocumentName { get; set; }

        [Display(ResourceType = typeof(Resources.ElectronicService), Name = "InitialDocumentURI")]
        public string InitialDocumentURI { get; set; }

        [Display(ResourceType = typeof(Resources.ElectronicService), Name = "ServiceTypeName")]
        public string ServiceTypeName { get; set; }

        [Display(ResourceType = typeof(Resources.ElectronicService), Name = "ServiceTypeDescription")]
        public string ServiceTypeDescription { get; set; }

        public IEnumerable<OfficialDocumentViewModel> OfficialDocuments { get; set; }

        public IEnumerable<ElectronicServiceStageViewModel> Stages { get; set; }

        public string AccessIdentifier { get; set; }
    }
}