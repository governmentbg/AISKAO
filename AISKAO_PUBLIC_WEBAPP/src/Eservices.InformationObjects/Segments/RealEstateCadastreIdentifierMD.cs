using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class RealEstateCadastreIdentifierMD
    {
        [RequiredInSection(typeof(RealEstateCadastreIdentifier),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000270")]
        [ExactStringLength(5,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000270")]
        [CharsAllowed("^[0-9]*$", "цифри",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000270")]
        [EKATTELocationsOrSettlements("Settlement", "Code", "SettlementFormation", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000270")]
        public object TerritorialUnitEKATTECode { get; set; }

        [Integer(FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000280")]
        [MaxStringLength(4,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000280")]
        public object CadastralAreaNumber { get; set; }

        [Integer(FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000281")]
        [MaxStringLength(4,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000281")]
        public object LandPropertyCadastralNumber { get; set; }

        [Integer(FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000282")]
        [MaxStringLength(3,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000282")]
        public object LandPropertyBuildingCadastralNumber { get; set; }

        [Integer(FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000283")]
        [MaxStringLength(3,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000283")]
        public object SeparateBuildingUnitCadastralNumber { get; set; }
    }
}
