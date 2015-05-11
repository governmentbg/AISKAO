using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class StatePropertyActIdentifierMD
    {
        [RequiredInSection(typeof(StatePropertyActIdentifier),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000284")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000199_Number",
            DisplayNameResourceType=typeof(Resources.Visualisation))]
        public object Number { get; set; }

        [DateFormat]
        [RequiredInSection(typeof(StatePropertyActIdentifier),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000285")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000199_IssueDate",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object IssueDate { get; set; }
    }
}
