using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.Segments;
using System.ComponentModel.DataAnnotations;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ElectronicAdministrativeServiceFooterMD))]
    public partial class ElectronicAdministrativeServiceFooter:IInformationObject
    {
        private bool xMLDigitalSignatureFieldSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool XMLDigitalSignatureSpecified
        {
            get
            {
                return this.xMLDigitalSignatureFieldSpecified;
            }
            set
            {
                if ((xMLDigitalSignatureFieldSpecified.Equals(value) != true))
                {
                    this.xMLDigitalSignatureFieldSpecified = value;
                    this.OnPropertyChanged("XMLDigitalSignatureSpecified");
                }
            }
        }

        [SelfValidation]
        public void FooterValidation(ValidationResults results)
        {
            string msg;

            if (!this.ApplicationSigningTimeSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Fields._0008_000199, Resources.Sections._0009_000153);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.XMLDigitalSignatureSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections.R0035, Resources.Sections._0009_000153);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }
        }

        public override string ToString()
        {
            string result = Environment.NewLine +this.ApplicationSigningTime.ToString();
                          

            return result;
        }

    }
}
