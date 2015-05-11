using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Documents
{
    [HasSelfValidation]
    public class DocumentProcessingForThePurchaseOwnershipOfNaturalAndLegalPersonsOfLandWithEstablishedConstructionRightMD
    {
        [ObjectValidator]
        [RequiredInSection(typeof(MunicipalPropertyEvaluationApplication),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "R1234")]
        public object ElectronicAdministrativeServiceHeader { get; set; }

        [RequiredInSection(typeof(MunicipalPropertyEvaluationApplication),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000143")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000204_ServiceTermType",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object ServiceTermType { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(MunicipalPropertyEvaluationApplication),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "_0009_000141")]
        public object ServiceApplicantReceiptData { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(MunicipalPropertyEvaluationApplication),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "_0009_000202")]
        public object StateAndMunicipalPropertyIdentifyingData { get; set; }

        [ObjectCollectionValidator]
        public object AttachedDocuments { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(MunicipalPropertyEvaluationApplication),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "_0009_000153")]
        public object ElectronicAdministrativeServiceFooter { get; set; }
    }
}
