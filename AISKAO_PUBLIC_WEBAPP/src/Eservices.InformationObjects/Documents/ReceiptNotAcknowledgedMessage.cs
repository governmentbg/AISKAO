using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.Resources;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ReceiptNotAcknowledgedMessageMD))]
    public partial class ReceiptNotAcknowledgedMessage
    {
        public class ReceiptNotAcknowledgedMessageMD
        {
        }
        public override string ToString()
        {
            string result = Visualisation.ReceiptNotAcknowledgedMessage;
            result = result.Replace(
                ":ElectronicServiceProvider:", 
                (ElectronicServiceProvider == null) ? string.Empty : ElectronicServiceProvider.ToString());
            result += "\n";
            result = result.Replace(
                ":DocumentURI:",  
                (MessageURI== null) ? string.Empty : MessageURI.ToString());
            result += "\n";
            result = result.Replace(
                ":TransportType:",  
                (TransportType== null) ? string.Empty : TransportType.GetDisplay(TransportType.ToString()));
            result += "\n";
            result = result.Replace(
                ":Discrepancies:",
                (Discrepancies == null) ? string.Empty :  Discrepancies.GetDisplayList());
            result += "\n";
            result = result.Replace(
                ":Applicant:",  
                (Applicant== null) ? string.Empty : Applicant.ToString());
            result += "\n";
            result = result.Replace(
                ":DocumentTypeURI:",  
                (DocumentTypeURI== null) ? string.Empty : DocumentTypeURI.ToString());
            result += "\n";
            result = result.Replace(
                ":DocumentTypeName:",  
                (DocumentTypeName== null) ? string.Empty : DocumentTypeName.ToString());
            result += "\n";
            result = result.Replace(
                ":ReceiptTime:",  
                (MessageCreationTime== null) ? string.Empty : MessageCreationTime.ToString("dd.MM.yyyy hh:mm:ss"));
            result += "\n";
            //result = result.Replace(
            //    ":Signature:", 
            //    (Signature == null) ? string.Empty : Signature.ToString());
            return result;
        }

        public override string ToHtml()
        {
            string result = Visualisation.HtmlReceiptNotAcknowledgedMessage;
            result = result.Replace(
                ":ElectronicServiceProvider:",
                (ElectronicServiceProvider == null) ? string.Empty : ElectronicServiceProvider.ToHtml());
            result += "\n";
            result = result.Replace(
                ":DocumentURI:",
                (MessageURI == null) ? string.Empty : MessageURI.ToHtml());
            result += "\n";
            result = result.Replace(
                ":TransportType:",
                (TransportType == null) ? string.Empty : TransportType.GetDisplay(TransportType.ToString()));
            result += "\n";
            result = result.Replace(
                ":Discrepancies:",
                (Discrepancies == null) ? string.Empty : Discrepancies.GetDisplayList());
            result += "\n";
            result = result.Replace(
                ":Applicant:",
                (Applicant == null) ? string.Empty : Applicant.ToHtml());
            result += "\n";
            result = result.Replace(
                ":DocumentTypeURI:",
                (DocumentTypeURI == null) ? string.Empty : DocumentTypeURI.ToHtml());
            result += "\n";
            result = result.Replace(
                ":DocumentTypeName:",
                (DocumentTypeName == null) ? string.Empty : DocumentTypeName.ToString());
            result += "\n";
            result = result.Replace(
                ":ReceiptTime:",
                (MessageCreationTime == null) ? string.Empty : MessageCreationTime.ToString("dd.MM.yyyy hh:mm:ss"));
            result += "\n";
            //result = result.Replace(
            //    ":Signature:",
            //    (Signature == null) ? string.Empty : Signature.ToHtml());
            return result;
        }
    }
}
