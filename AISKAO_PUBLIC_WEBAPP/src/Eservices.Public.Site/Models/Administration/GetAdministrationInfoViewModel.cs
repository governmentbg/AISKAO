using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TechnoLogica.Eservices.Public.Site.Models.Administration
{
    public class GetAdministrationInfoViewModel
    {
        //public Guid ID { get; set; }
        [Display(ResourceType = typeof(Resources.Administration), Name = "Name")]
        public string Name { get; set; }
        [Display(ResourceType = typeof(Resources.Administration), Name = "Bulstat")]
        public string Bulstat { get; set; }

        [Display(ResourceType = typeof(Resources.Administration), Name = "Address")]
        public string Address { get; set; }
        [Display(ResourceType = typeof(Resources.Administration), Name = "Email")]
        public string Email { get; set; }
        [Display(ResourceType = typeof(Resources.Administration), Name = "WebSiteAddress")]
        public string WebSiteAddress { get; set; }
        [Display(ResourceType = typeof(Resources.Administration), Name = "Phone")]
        public string Phone { get; set; }
        [Display(ResourceType = typeof(Resources.Administration), Name = "Mobile")]
        public string Mobile { get; set; }
        [Display(ResourceType = typeof(Resources.Administration), Name = "Fax")]
        public string Fax { get; set; }

        //public string ContentType { get; set; }
        //public byte[] Content { get; set; }
    }
}