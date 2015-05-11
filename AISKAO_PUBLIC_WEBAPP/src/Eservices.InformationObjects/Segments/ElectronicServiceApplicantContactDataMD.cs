using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System.ComponentModel;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class ElectronicServiceApplicantContactDataMD
    {
        [ExactStringLength(3,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        [CharsAllowed("^[A-Z]+$", "главни букви на латиница",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        [RequiredInSection(typeof(ElectronicServiceApplicantContactData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        [EKATTELocations("District", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1270")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000137_DistrictCode", 
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object DistrictCode { get; set; }
        
        [MaxStringLength(25,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1272")]
        [RequiredInSection(typeof(ElectronicServiceApplicantContactData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1272")]
        [EKATTELocations("District", "Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1272")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000137_DistrictName",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object DistrictName { get; set; }

        [ExactStringLength(5,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1274")]
        [CharsAllowed("^[A-Z0-9]*$", "главни букви на латиница и цифри",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1274")]
        [RequiredInSection(typeof(ElectronicServiceApplicantContactData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1274")]
        [EKATTELocations("Municipality", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1274")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000137_MunicipalityCode",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object MunicipalityCode { get; set; }

        [MaxStringLength(25,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1276")]
        [RequiredInSection(typeof(ElectronicServiceApplicantContactData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1276")]
        [EKATTELocations("Municipality", "Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1276")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000137_MunicipalityName", 
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object MunicipalityName { get; set; }

        [ExactStringLength(5,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1282")]
        [CharsAllowed("^[0-9]*$", "само цифри",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1282")]
        [RequiredInSection(typeof(ElectronicServiceApplicantContactData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1282")]
        [EKATTELocations("Settlement", "Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1282")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000137_SettlementCode", 
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object SettlementCode { get; set; }

        [MaxStringLength(25,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1284")]
        [RequiredInSection(typeof(ElectronicServiceApplicantContactData),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1284")]
        [EKATTELocations("Settlement", "Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1284")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000137_SettlementName", 
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object SettlementName { get; set; }

        [MaxStringLength(4,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1144")]
        [CharsAllowed("^[0-9]*$", "само цифри",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R1144")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000137_PostCode", 
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object PostCode { get; set; }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000137_PostOfficeBox", 
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public string PostOfficeBox { get; set; }

        [CharsAllowed("^[A-Za-zА-Яа-я0-9 ,.\"-]*$", 
            "букви на кирилица, латиница, цифри и символите интервал, , – (тире) , запетая, . (точка), \" (кавички)",
            FieldNameResourceType = typeof(Resources.Fields), 
            FieldNameResourceName = "R1146")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000137_AddressDescription", 
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object AddressDescription { get; set; }

        [ObjectCollectionValidator]
        public object PhoneNumbers { get; set; }

        [ObjectCollectionValidator]
        public object FaxNumbers { get; set; }
    }
}
