using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class RealEstateAddressDataMD
    {
        [ExactStringLength(3,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        [CharsAllowed("^[A-Z]+$", "главни букви на латиница",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        [RequiredInSection(typeof(RealEstateAddressData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        [EKATTELocations("District", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        public object DistrictCode { get; set; }

        [MaxStringLength(25,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1272")]
        [RequiredInSection(typeof(RealEstateAddressData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1272")]
        [EKATTELocations("District", "Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1272")]
        public object DistrictName { get; set; }

        [ExactStringLength(5,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1274")]
        [CharsAllowed("^[A-Z0-9]*$", "главни букви на латиница и цифри",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1274")]
        [RequiredInSection(typeof(RealEstateAddressData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1274")]
        [EKATTELocations("Municipality", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1274")]
        public object MunicipalityCode { get; set; }

        [MaxStringLength(25,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1276")]
        [RequiredInSection(typeof(RealEstateAddressData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1276")]
        [EKATTELocations("Municipality", "Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1276")]
        public object MunicipalityName { get; set; }

        [ExactStringLength(5,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000270")]
        [CharsAllowed("^[0-9]*$", "цифри",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000270")]
        [EKATTELocationsOrSettlements("Settlement", "Code", "SettlementFormation", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000270")]
        [RequiredInSection(typeof(RealEstateAddressData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000270")]
        public object TerritorialUnitEKATTECode { get; set; }

        [EKATTELocationsOrSettlements("Settlement", "Name", "SettlementFormation", "Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000271")]
        [RequiredInSection(typeof(RealEstateAddressData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000271")]
        public object TerritorialUnitEKATTEName { get; set; }

        [ObjectValidator]
        public object LandOrUrbanPropertyAddress { get; set; }
    }
}
