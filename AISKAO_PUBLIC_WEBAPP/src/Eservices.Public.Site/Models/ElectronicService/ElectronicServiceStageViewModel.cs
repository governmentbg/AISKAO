using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TechnoLogica.Eservices.Public.Site.Models.ElectronicService
{
    public class ElectronicServiceStageViewModel
    {
        //public int ServiceId { get; set; }

        public int ServiceStageType { get; set; }

        public string ServiceStageTypeName { get; set; }

        //public string ServiceStageTypeExecutor { get; set; }

        //public string ServiceStageTypeDescription { get; set; }

        public int? SequenceNumber { get; set; }
        //public DateTime IncludedOn { get; set; }
        public DateTime? CompletedOn { get; set; }
    }
}