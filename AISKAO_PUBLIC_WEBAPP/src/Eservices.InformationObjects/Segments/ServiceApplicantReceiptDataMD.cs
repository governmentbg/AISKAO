using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using TechnoLogica.Eservices.InformationObjects.Nomenclatures;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class ServiceApplicantReceiptDataMD
    {
        [NomenclatureRestricted(typeof(ServiceResultReceiptMethod))]
        [RequiredInSection(typeof(ServiceApplicantReceiptData),
                FieldNameResourceType = typeof(Resources.Fields),
                FieldNameResourceName = "_0008_000197")]
        [LocalizedDisplayName(
              DisplayNameResourceType = typeof(Resources.Visualisation),
              DisplayNameResourceName = "_0009_000141_ServiceResultReceiptMethod")]
        public ServiceResultReceiptMethod ServiceResultReceiptMethod { get; set; }

        [LocalizedDisplayName(
              DisplayNameResourceType = typeof(Resources.Visualisation),
              DisplayNameResourceName = "_0009_000141_PostOfficeBox")]
        public string PostOfficeBox { get; set; }
        

        public object Item { get; set; }
    }
}
