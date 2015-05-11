using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TechnoLogica.Eservices.Public.Site.Models.ElectronicService
{
    public class GetEServiceAccessViewModel
    {
        [Required(ErrorMessageResourceType = typeof(Resources.ErrorMessages), ErrorMessageResourceName = "ValidationRequiredField")]
        [Display(ResourceType = typeof(Resources.ElectronicService), Name = "URI")]
        public string URI { get; set; }

        //[GuidFormat]
        [Required(ErrorMessageResourceType = typeof(Resources.ErrorMessages), ErrorMessageResourceName = "ValidationRequiredField")]
        [Display(ResourceType = typeof(Resources.ElectronicService), Name = "Identifier")]
        public string Identifier { get; set; }
    }
}