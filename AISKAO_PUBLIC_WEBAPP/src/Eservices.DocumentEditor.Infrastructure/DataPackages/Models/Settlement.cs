using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models
{
    public class Settlement
    {
        public string Code { get; set; }
        public string TypeName { get; set; }
        public string Name { get; set; }
        public string DistrictCode { get; set; }

        //public Municipality Municipality { get; set; }
        public string DisplayName { get; set; }
        public string MainSettlement { get; set; }

        public string MunicipalityCode { get; set; }
        public string MayoraltyCode { get; set; }
        public int TypeCode { get; set; }
        public string Category { get; set; }
        public string Altitude { get; set; }
    }
}