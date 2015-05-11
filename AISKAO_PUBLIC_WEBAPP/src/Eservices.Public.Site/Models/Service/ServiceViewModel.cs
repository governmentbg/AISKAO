using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TechnoLogica.Eservices.Public.Site.Models.Service
{
    public class ServiceViewModel
    {
        private decimal _serviceId;
        private string _serviceName;
        private string _uri;
        private string _xsdName;

        [Required(ErrorMessageResourceType = typeof(Resources.ErrorMessages), ErrorMessageResourceName = "ValidationRequiredField")]
        [HiddenInput(DisplayValue = false)]
        public decimal ServiceId
        {
            get { return _serviceId; }
            set { _serviceId = value; }
        }

        [Required(ErrorMessageResourceType = typeof(Resources.ErrorMessages), ErrorMessageResourceName = "ValidationRequiredField")]
        [HiddenInput(DisplayValue = false)]
        public string XSDName
        {
            get { return _xsdName; }
            set { _xsdName = value; }
        }
        [Display(ResourceType = typeof(Resources.Service), Name = "ServiceName")]
        public string ServiceName
        {
            get { return _serviceName; }
            set { _serviceName = value; }
        }
        [Display(ResourceType = typeof(Resources.Service), Name = "URI")]
        public string URI
        {
            get { return _uri; }
            set { _uri = value; }
        }
    }
}