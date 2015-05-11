using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class ForeignEntityBasicDataMD
    {
        [RequiredInSection(typeof(ForeignEntityBasicData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0154")]        
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000014_ForeignEntityName",
            DisplayNameResourceType=typeof(Resources.Visualisation))]
        public object ForeignEntityName { get; set; }

        [RequiredInSection(typeof(ForeignEntityBasicData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0152")]
        [Country("Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0152")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000014_CountryNameCyrillic",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object CountryNameCyrillic { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000014_Register",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object Register { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000014_Identifier",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object Identifier { get; set; }

        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000014_OtherData",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object OtherData { get; set; }

        [Country("Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0150")]
        public object CountryISO3166TwoLetterCode { get; set; }
    }
}
