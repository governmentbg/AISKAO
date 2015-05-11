using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class MunicipalPropertyActIdentifierMD
    {
        [RequiredInSection(typeof(MunicipalPropertyActIdentifier),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000286")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000200_Number",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object Number { get; set; }

        [DateFormat]
        [RequiredInSection(typeof(MunicipalPropertyActIdentifier),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000287")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000200_IssueDate",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object IssueDate { get; set; }
    }
}
