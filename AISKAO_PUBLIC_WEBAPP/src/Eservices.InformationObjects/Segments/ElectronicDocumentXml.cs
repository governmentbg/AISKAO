using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.Resources;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ElectronicDocumentXmlMD))]
    public partial class ElectronicDocumentXml : IInformationObject
    {
        private bool documentTypeURISpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool DocumentTypeURISpecified
        {
            get
            {
                return this.documentTypeURISpecified;
            }
            set
            {
                if ((documentTypeURISpecified.Equals(value) != true))
                {
                    this.documentTypeURISpecified = value;
                    this.OnPropertyChanged("DocumentTypeURISpecified");
                }
            }
        }
    }
}
