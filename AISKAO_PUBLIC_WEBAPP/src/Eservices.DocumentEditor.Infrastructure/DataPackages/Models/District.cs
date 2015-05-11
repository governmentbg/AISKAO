using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models
{
    public class District
    {
        public string Code { get; set; }
        public string MainSettlement { get; set; }
        public string Name { get; set; }
        public string SecondLevelRegionCode { get; set; }
    }
}