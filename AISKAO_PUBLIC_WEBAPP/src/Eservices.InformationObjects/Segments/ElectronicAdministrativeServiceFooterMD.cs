using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using System.ComponentModel;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class ElectronicAdministrativeServiceFooterMD
    {
        [DateFormat]
        [RequiredInSection(typeof(ElectronicAdministrativeServiceFooter),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000199")]
        [LocalizedDisplayName(
            DisplayNameResourceType = typeof(Resources.Visualisation),
            DisplayNameResourceName = "_0009_000153_ApplicationSigningTime")]
        [ReadOnly(true)]
        public object ApplicationSigningTime { get; set; }

         [RequiredInSection(typeof(ElectronicAdministrativeServiceFooter),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "R0035")]
        public object XMLDigitalSignature { get; set; }
    }
}
