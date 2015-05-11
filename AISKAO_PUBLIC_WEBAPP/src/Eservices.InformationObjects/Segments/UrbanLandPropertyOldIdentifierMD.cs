using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [RequiredOneOfGroupInSectionAttribute(
        "CadastreNumber", 
        "Parcel", 
        "Quarter", 
        FieldNameResourceType = typeof(Resources.Sections), 
        FieldNameResourceName = "_0009_000196")]
    public class UrbanLandPropertyOldIdentifierMD
    {
        public object CadastreNumber { get; set; }

        public object Parcel { get; set; }

        public object Quarter { get; set; }
    }
}
