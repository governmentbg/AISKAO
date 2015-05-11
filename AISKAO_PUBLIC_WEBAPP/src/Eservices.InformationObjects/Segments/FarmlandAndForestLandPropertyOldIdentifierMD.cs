using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [RequiredOneOfGroupInSectionAttribute(
        "Parcel", 
        "Array",
        FieldNameResourceType = typeof(Resources.Sections),
        FieldNameResourceName = "_0009_000197")]
    public class FarmlandAndForestLandPropertyOldIdentifierMD
    {
        public object Parcel { get; set; }

        public object Array { get; set; }
    }
}
