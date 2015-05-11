using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using System.ComponentModel;

namespace TechnoLogica.Eservices.InformationObjects
{
    public class RegisteredErrorsInDocumentContentMD
    {
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000025_DocumentTypeURI",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        [ReadOnly(true)]
        public string DocumentTypeURI { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000025_DocumentTypeName",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        [ReadOnly(true)]
        public string DocumentTypeName { get; set; }
    }
}
