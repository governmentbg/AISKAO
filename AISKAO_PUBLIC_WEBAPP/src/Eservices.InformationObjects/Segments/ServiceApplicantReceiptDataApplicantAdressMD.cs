using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects
{
    public class ServiceApplicantReceiptDataApplicantAdressMD
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

        [ExactStringLength(5,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1282")]
        [CharsAllowed("^[0-9]*$", "само цифри",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1282")]
        [RequiredInSection(typeof(ServiceApplicantReceiptData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1282")]
        [EKATTELocations("Settlement", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1282")]
        public object SettlementCode { get; set; }

        [MaxStringLength(25,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1284")]
        [RequiredInSection(typeof(ServiceApplicantReceiptData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1284")]
        [EKATTELocations("Settlement", "Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1284")]
        public object SettlementName { get; set; }

        [ExactStringLength(4,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1144")]
        [CharsAllowed("^[0-9]*$", "само цифри",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1144")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000141_PostCode",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object PostCode { get; set; }

        [CharsAllowed("^[A-Za-zА-Яа-я0-9 ,.\"-]*$",
            "букви на кирилица, латиница, цифри и символите интервал, , – (тире) , запетая, . (точка), \" (кавички)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1146")]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000141_AddressDescription",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object AddressDescription { get; set; }
    }
}
