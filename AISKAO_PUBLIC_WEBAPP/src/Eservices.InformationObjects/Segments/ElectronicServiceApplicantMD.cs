using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class ElectronicServiceApplicantMD
    {
        [ObjectCollectionValidator]
        public object RecipientGroup { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000016_EmailAddress",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        [Email(
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0085")]
        public object EmailAddress { get; set; }
    }
}
