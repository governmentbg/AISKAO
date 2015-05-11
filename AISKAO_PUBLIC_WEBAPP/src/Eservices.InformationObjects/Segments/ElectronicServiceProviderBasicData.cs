using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using TechnoLogica.Eservices.InformationObjects;
using System;
using System.Collections.Generic;
using System.Reflection;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ElectronicServiceProviderBasicDataMD))]
    public partial class ElectronicServiceProviderBasicData : IInformationObject
    {
        private bool electronicServiceProviderTypeSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ElectronicServiceProviderTypeSpecified
        {
            get
            {
                return this.electronicServiceProviderTypeSpecified;
            }
            set
            {
                if ((electronicServiceProviderTypeSpecified.Equals(value) != true))
                {
                    this.electronicServiceProviderTypeSpecified = value;
                    this.OnPropertyChanged("ElectronicServiceProviderTypeSpecified");
                }
            }
        }

        public override string ToString()
        {
            return string.Format("{0} - {1}",this.EntityBasicData.ToString(), ElectronicServiceProviderType.GetDisplay(ElectronicServiceProviderType.ToString()));
        }

        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion
    }   
}
