using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class ServiceApplicantReceiptDataMunicipalityAdministrationAdressMD
    {
        [ExactStringLength(3,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        [CharsAllowed("^[A-Z]+$", "главни букви на латиница",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        [RequiredInSection(typeof(ServiceApplicantReceiptData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        [EKATTELocations("District", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        public object DistrictCode { get; set; }

        [MaxStringLength(25,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1272")]
        [RequiredInSection(typeof(ServiceApplicantReceiptData),
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
        [RequiredInSection(typeof(ServiceApplicantReceiptData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1274")]
        [EKATTELocations("Municipality", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1274")]
        public object MunicipalityCode { get; set; }

        [MaxStringLength(25,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1276")]
        [RequiredInSection(typeof(ServiceApplicantReceiptData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1276")]
        [EKATTELocations("Municipality", "Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1276")]
        public object MunicipalityName { get; set; }

        [EKATTELocations("Mayoralty", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000203")]
        [ExactStringLength(8,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000203")]
        [CharsAllowed("^[A-Z0-9-]*$", "главни букви на латиница, цифри и знак - (тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000203")]
        public object MayoraltyCode { get; set; }

        [EKATTELocations("Mayoralty", "Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000204")]
        [MaxStringLength(25,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000204")]
        public object Mayoralty { get; set; }

        [EKATTEAreas("Area", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000191")]
        [ExactStringLength(8,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000191")]
        [CharsAllowed("^[0-9-]*$", "цифри и знак - (тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000191")]
        public object AreaCode { get; set; }

        [EKATTEAreas("Area", "Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000192")]
        [MaxStringLength(25,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000192")]
        public object AreaName { get; set; }
    }
}
