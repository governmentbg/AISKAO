using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects
{
    public class ElectronicDocumentXmlMD
    {
        [LocalizedDisplayName(
            DisplayNameResourceName ="_0009_000092_DocumentTypeName",
            DisplayNameResourceType = typeof(Resources.Visualisation))]
        [RequiredInSection(typeof(ElectronicDocumentXml),
            FieldNameResourceType = typeof(Resources.Visualisation),
            FieldNameResourceName = "_0009_000092_DocumentTypeName")]
        public object DocumentTypeName{get;set;}

        [ObjectValidator]
        [LocalizedDisplayName(
            DisplayNameResourceName = "_0009_000092_DocumentTypeURI",
            DisplayNameResourceType =typeof(Resources.Visualisation))]
        [RequiredInSection(typeof(ElectronicDocumentXml),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "R0033")]
        public object DocumentTypeURI { get; set; }

        //TODO: Да се десериализира съдържанието и да се валидира
        [RequiredInSection(typeof(ElectronicDocumentXml),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0009_000092_ElectronicDocumentXmlContent")]
        public object ElectronicDocumentXmlContent { get; set; }
    }
}
