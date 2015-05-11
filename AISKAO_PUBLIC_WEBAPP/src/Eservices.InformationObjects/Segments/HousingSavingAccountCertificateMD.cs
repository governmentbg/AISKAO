using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using TechnoLogica.Eservices.InformationObjects.Nomenclatures;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class HousingSavingAccountCertificateMD
    {
        [ObjectValidator]
        [RequiredInSection(typeof(HousingSavingsAccountAvailabilityReportApplication),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "R1234")]
        public object ElectronicAdministrativeServiceHeader { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(HousingSavingsAccountAvailabilityReportApplication),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000143")]
        [NomenclatureRestricted(typeof(ServiceTermType),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000143")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000204_ServiceTermType",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object ServiceTermType { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(HousingSavingsAccountAvailabilityReportApplication),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "_0009_000141")]
        public object ServiceApplicantReceiptData { get; set; }

        [ObjectCollectionValidator]
        public object AttachedDocuments { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(HousingSavingsAccountAvailabilityReportApplication),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "_0009_000153")]
        public object ElectronicAdministrativeServiceFooter { get; set; }
    }
}
