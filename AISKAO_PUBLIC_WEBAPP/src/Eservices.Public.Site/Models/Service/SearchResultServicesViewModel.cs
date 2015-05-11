using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TechnoLogica.Eservices.Public.Site.Models.Service
{
    public class SearchResultServicesViewModel
    {
        private string _searchServiceName;
        private IQueryable<ServiceViewModel> _searchResult;

        [Required(ErrorMessageResourceType = typeof(Resources.ErrorMessages), ErrorMessageResourceName = "ValidationRequiredField")]
        [Display(ResourceType = typeof(Resources.Service), Name = "ServiceName")]
        public string ServiceName
        {
            get { return _searchServiceName; }
            set { _searchServiceName = value; }
        }

        public IQueryable<ServiceViewModel> SearchResult
        {
            get { return _searchResult; }
            set { _searchResult = value; }
        }
    }
}