using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects
{
    public class RegisteredErrorInDocumentContentMD
    {
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000024_TermURI",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public string TermURI { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000024_ErrorDescription",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public string ErrorDescription { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000024_DocumentElementReference",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public string DocumentElementReference { get; set; }
    }
}
