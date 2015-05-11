using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TechnoLogica.Eservices.Public.Site.Models.Service
{
    public class ListServicesViewModel
    {
        private List<ServiceViewModel> _service;
        private string _searchServiceName;
        private IQueryable<ServiceViewModel> _searchResult;


        public List<ServiceViewModel> Service
        {
            get { return _service; }
            set { _service = value; }
        }
        
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