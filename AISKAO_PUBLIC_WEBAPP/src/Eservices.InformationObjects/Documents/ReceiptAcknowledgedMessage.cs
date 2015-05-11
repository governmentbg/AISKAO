using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using TechnoLogica.Eservices.InformationObjects.Nomenclatures;
using TechnoLogica.Eservices.InformationObjects.Resources;


namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ReceiptAcknowledgedMessageMD))]
    public partial class ReceiptAcknowledgedMessage
    {
        public class ReceiptAcknowledgedMessageMD
        {
            [Display(ResourceType = typeof(Resources.Sections), Name = "R0021")]
            public ElectronicServiceProviderBasicData ElectronicServiceProvider { get; set; }

            [NomenclatureRestricted(typeof(DocumentElectronicTransportType),
                FieldNameResourceType = typeof(Resources.Fields),
                FieldNameResourceName = "R0025")]
            [Display(ResourceType = typeof(Resources.Nomenclatures), Name = "_0007_000001")]
            public string TransportType { get; set; }

            [RequiredInSection(typeof(ReceiptAcknowledgedMessageMD))]
            [Display(ResourceType = typeof(Resources.Sections), Name = "R0019")]
            [EditableAttribute(false)]
            public DocumentURI DocumentURI { get; set; }

            public System.DateTime ReceiptTime { get; set; }

            public bool ReceiptTimeSpecified { get; set; }

            public ReceiptAcknowledgedMessageRegisteredBy RegisteredBy { get; set; }

            public string CaseAccessIdentifier { get; set; }
            
            public ElectronicServiceApplicant Applicant { get; set; }

            public string DocumentTypeURI { get; set; }

            public string DocumentTypeName { get; set; }

            [Display(ResourceType = typeof(Resources.Sections), Name = "R0035")]
            public XMLDigitalSignature Signature { get; set; }

        }
        
        public override string ToString()
        {
            string result = Visualisation.ReceiptAcknowledgedMessage;
            result = result.Replace(
                ":ElectronicServiceProvider:", 
                ( ElectronicServiceProvider== null) ? string.Empty : ElectronicServiceProvider.ToString());
            result = result.Replace(
                ":DocumentURI:", 
                ( DocumentURI== null) ? string.Empty : DocumentURI.ToString());
            result = result.Replace(
                ":TransportType:", 
                (TransportType == null) ? string.Empty : TransportType.GetDisplay(TransportType.ToString()));
            result = result.Replace(
                ":Applicant:",  
                (Applicant== null) ? string.Empty : Applicant.ToString());
            result = result.Replace(
                ":DocumentTypeURI:", 
                (DocumentTypeURI == null) ? string.Empty : DocumentTypeURI.ToString());
            result = result.Replace(
                ":DocumentTypeName:",  
                (DocumentTypeName== null) ? string.Empty : DocumentTypeName.ToString());
            result = result.Replace(
                ":CaseAccessIdentifier:",  
                (CaseAccessIdentifier== null) ? string.Empty : CaseAccessIdentifier.ToString());
            result = result.Replace(
                ":ReceiptTime:",  
                (ReceiptTime== null) ? string.Empty : ReceiptTime.ToString("dd.MM.yyyy hh:mm:ss"));
            result = result.Replace(
                ":RegisteredBy:", 
                (RegisteredBy== null) ? string.Empty : RegisteredBy.ToString());
            //result = result.Replace(
            //    ":Signature:", 
            //    (Signature== null) ? string.Empty : Signature.ToString());
            return result;
        }

        public override string ToHtml()
        {
            string result = Visualisation.HtmlReceiptAcknowledgedMessage;
            result = result.Replace(
                ":ElectronicServiceProvider:",
                (ElectronicServiceProvider == null) ? string.Empty : ElectronicServiceProvider.ToHtml());
            result = result.Replace(
                ":DocumentURI:",
                (DocumentURI == null) ? string.Empty : DocumentURI.ToHtml());
            result = result.Replace(
                ":TransportType:",
                (TransportType == null) ? string.Empty : TransportType.GetDisplay(TransportType.ToString()));
            result = result.Replace(
                ":Applicant:",
                (Applicant == null) ? string.Empty : Applicant.ToHtml());
            result = result.Replace(
                ":DocumentTypeURI:",
                (DocumentTypeURI == null) ? string.Empty : DocumentTypeURI.ToHtml());
            result = result.Replace(
                ":DocumentTypeName:",
                (DocumentTypeName == null) ? string.Empty : DocumentTypeName.ToString());
            result = result.Replace(
                ":CaseAccessIdentifier:",
                (CaseAccessIdentifier == null) ? string.Empty : CaseAccessIdentifier.ToString());
            result = result.Replace(
                ":ReceiptTime:",
                (ReceiptTime == null) ? string.Empty : ReceiptTime.ToString("dd.MM.yyyy hh:mm:ss"));
            result = result.Replace(
                ":RegisteredBy:",
                (RegisteredBy == null) ? string.Empty : RegisteredBy.ToHtml());
            //result = result.Replace(
            //    ":Signature:",
            //    (Signature == null) ? string.Empty : Signature.ToHtml());
            return result;
            
        }
    }
}
