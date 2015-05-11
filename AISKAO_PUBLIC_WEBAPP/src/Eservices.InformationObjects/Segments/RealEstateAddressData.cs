using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(RealEstateAddressDataMD))]
    public partial class RealEstateAddressData : IInformationObject
    {        
        /// <summary>
        /// PersonBasicData class constructor
        /// </summary>
        public RealEstateAddressData()
        {
            this.landOrUrbanPropertyAddressField = new RealEstateAddressDataLandOrUrbanPropertyAddress();
        }

        private bool landOrUrbanPropertyAddressFieldSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool LandOrUrbanPropertyAddressFieldSpecified
        {
            get
            {
                return this.landOrUrbanPropertyAddressFieldSpecified;
            }
            set
            {
                if ((landOrUrbanPropertyAddressFieldSpecified.Equals(value) != true))
                {
                    this.landOrUrbanPropertyAddressFieldSpecified = value;
                    this.OnPropertyChanged("NamesSpecified");
                }
            }
        }
    }
}
