using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using System.IO;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class RealEstateAddressDataLandOrUrbanPropertyAddressMD
    {
        public object Items { get; set; }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0008_000125",
            DisplayNameResourceType = typeof(Resources.Fields))]
        public string BuildingNumber
        {
            get;
            set;
        }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0008_000126",            
            DisplayNameResourceType = typeof(Resources.Fields))]
        public string Entrance
        {
            get;
            set;
        }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0008_000127",
            DisplayNameResourceType = typeof(Resources.Fields))]
        public string Floor
        {
            get;
            set;
        }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0008_000269",
            DisplayNameResourceType = typeof(Resources.Fields))]
        public string LandPropertyArealName
        {
            get;
            set;
        }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0008_000226",
            DisplayNameResourceType = typeof(Resources.Fields))]
        public string ResidentialComplex
        {
            get;
            set;
        }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0008_000272",
            DisplayNameResourceType = typeof(Resources.Fields))]
        public string SeparateBuildingUnitFunctionalDesignationCode
        {
            get;
            set;
        }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0008_000273",
            DisplayNameResourceType = typeof(Resources.Fields))]
        public string SeparateBuildingUnitFunctionalDesignationName
        {
            get;
            set;
        }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName =  "_0008_000274",
            DisplayNameResourceType = typeof(Resources.Fields))]
        public string SeparateBuildingUnitNumber
        {
            get;
            set;
        }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0008_000227",
            DisplayNameResourceType = typeof(Resources.Fields))]
        public string StreetBoulevardSquare
        {
            get;
            set;
        }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0008_000228",
            DisplayNameResourceType = typeof(Resources.Fields))]
        public string StreetBoulevardSquareNumber
        {
            get;
            set;
        }
    }
}
