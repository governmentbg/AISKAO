using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using TechnoLogica.Eservices.InformationObjects.Nomenclatures;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System.ComponentModel;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class ElectronicAdministrativeServiceHeaderMD
    {
        [RequiredInSection(typeof(ElectronicAdministrativeServiceHeader),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0260")]
        public object SUNAUServiceURI { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(ElectronicAdministrativeServiceHeader), 
            FieldType = typeof(DocumentTypeURI))]
        [DisplayName("")]
        public object DocumentTypeURI { get; set; }

        [RequiredInSection(typeof(ElectronicAdministrativeServiceHeader), 
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName =  "R0031")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000152_DocumentTypeName",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        [ReadOnly(true)]
        public object DocumentTypeName { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(ElectronicAdministrativeServiceHeader),
            FieldType = typeof(ElectronicServiceProviderBasicData))]
        public object ElectronicServiceProviderBasicData { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(ElectronicAdministrativeServiceHeader),
            FieldType = typeof(ElectronicServiceApplicant))]
        public object ElectronicServiceApplicant { get; set; }

        [ObjectValidator]
        [RequiredInSection(typeof(ElectronicAdministrativeServiceHeader),
            FieldType = typeof(ElectronicServiceApplicantContactData))]
        public object ElectronicServiceApplicantContactData { get; set; }

        [NomenclatureRestricted(typeof(ApplicationType),
            FieldNameResourceType = typeof(Resources.Nomenclatures),
            FieldNameResourceName = "_0007_000015")]
        [RequiredInSection(typeof(ElectronicAdministrativeServiceHeader),
            FieldType = typeof(ApplicationType))]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000152_ApplicationType",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public object ApplicationType { get; set; }

        [RequiredInSection(typeof(ElectronicAdministrativeServiceHeader),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000131")]
        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000152_SUNAUServiceName",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        [ReadOnly(true)]
        public object SUNAUServiceName { get; set; }

        //[ObjectValidator]
        public object DocumentURI { get; set; }

        [LocalizedDisplayNameAttribute(
            DisplayNameResourceName = "_0009_000152_SendApplicationWithReceiptAcknowledgedMessage",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        public bool SendApplicationWithReceiptAcknowledgedMessage { get; set; }
    }
}
