using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.Nomenclatures;

namespace TechnoLogica.Eservices.ESOED.Common
{
    public partial class Esoed
    {
        [System.Xml.Serialization.XmlElementAttribute("Body", typeof(EsoedBody), Order = 3)]
        public EsoedBody Body
        {
            get;
            set;
        }

        [System.Xml.Serialization.XmlElementAttribute("EsoedDetails", typeof(EsoedEsoedDetails), Order = 2)]
        public EsoedEsoedDetails EsoedDetails
        {
            get;
            set;
        }
        
        [System.Xml.Serialization.XmlElementAttribute("SenderDetails", typeof(EsoedSenderDetails), Order=1)]
        public EsoedSenderDetails SenderDetails
        {
            get;
            set;
        }

        [System.Xml.Serialization.XmlElementAttribute("EncryptedData", typeof(EncryptedDataType), Namespace = "http://www.w3.org/2001/04/xmlenc#", Order = 4)]
        public EncryptedDataType EncryptedData
        {
            get;
            set;
        }     

    }        

    public partial class EsoedBody
    {
        public override string ToString()
        {
            if (this.Any != null &&
                this.Any.Length > 0)
            {
                return Any[0].OuterXml;
            }
            else
            {
                return "";
            }
        }
    }
}
