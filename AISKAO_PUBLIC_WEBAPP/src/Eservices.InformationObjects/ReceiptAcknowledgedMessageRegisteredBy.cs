using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ReceiptAcknowledgedMessageRegisteredByMD))]
    public partial class ReceiptAcknowledgedMessageRegisteredBy
    {
        public class ReceiptAcknowledgedMessageRegisteredByMD
        {
        }

        public string AISURI
        {
            get
            {
                return Item as string;
            }
        }

        public ReceiptAcknowledgedMessageRegisteredByOfficer Officer
        {
            get
            {
                return Item as ReceiptAcknowledgedMessageRegisteredByOfficer;
            }
        }

        public override string ToString()
        {
            if (Officer != null)
            {
                string result = Resources.Visualisation.ReceiptAcknowledgedMessageRegisteredByOfficer.Replace(":PersonNames:", Officer.PersonNames.ToString());
                result = result.Replace(":AISUserIdentifier:", Officer.AISUserIdentifier);
                return result;
            }
            else if (AISURI != null)
            {
                return Resources.Visualisation.ReceiptAcknowledgedMessageRegisteredByAISURI.Replace("AISURI:", AISURI);
            }
            else
            {
                return "";
            }
        }
    }
}
