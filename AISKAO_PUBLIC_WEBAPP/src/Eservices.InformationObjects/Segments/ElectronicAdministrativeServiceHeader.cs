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
    [MetadataType(typeof(ElectronicAdministrativeServiceHeaderMD))]
    public partial class ElectronicAdministrativeServiceHeader:IInformationObject
    {
        private bool documentTypeURIFieldSpecified;
        private bool electronicServiceProviderBasicDataFieldSpecified;
        private bool electronicServiceApplicantFieldSpecified;
        private bool electronicServiceApplicantContactDataFieldSpecified;
        private bool documentURISpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool DocumentTypeURISpecified
        {
            get
            {
                return this.documentTypeURIFieldSpecified;
            }
            set
            {
                if ((documentTypeURIFieldSpecified.Equals(value) != true))
                {
                    this.documentTypeURIFieldSpecified = value;
                    this.OnPropertyChanged("DocumentTypeURISpecified");
                }
            }
        }

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ElectronicServiceProviderBasicDataSpecified
        {
            get
            {
                return this.electronicServiceProviderBasicDataFieldSpecified;
            }
            set
            {
                if ((electronicServiceProviderBasicDataFieldSpecified.Equals(value) != true))
                {
                    this.electronicServiceProviderBasicDataFieldSpecified = value;
                    this.OnPropertyChanged("ElectronicServiceProviderBasicDataSpecified");
                }
            }
        }

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ElectronicServiceApplicantSpecified
        {
            get
            {
                return this.electronicServiceApplicantFieldSpecified;
            }
            set
            {
                if ((electronicServiceApplicantFieldSpecified.Equals(value) != true))
                {
                    this.electronicServiceApplicantFieldSpecified = value;
                    this.OnPropertyChanged("ElectronicServiceApplicantSpecified");
                }
            }
        }

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ElectronicServiceApplicantContactDataSpecified
        {
            get
            {
                return this.electronicServiceApplicantContactDataFieldSpecified;
            }
            set
            {
                if ((electronicServiceApplicantContactDataFieldSpecified.Equals(value) != true))
                {
                    this.electronicServiceApplicantContactDataFieldSpecified = value;
                    this.OnPropertyChanged("ElectronicServiceApplicantContactDataSpecified");
                }
            }
        }

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool DocumentURISpecified
        {
            get
            {
                return this.documentURISpecified;
            }
            set
            {
                if ((documentURISpecified.Equals(value) != true))
                {
                    this.documentURISpecified = value;
                    this.OnPropertyChanged("DocumentURISpecified");
                }
            }
        }

        [SelfValidation]
        public void HeaderValidation(ValidationResults results)
        {
            string msg;

            if (DocumentURISpecified)
            {
                var documentURIValidator = ValidationFactory.CreateValidator<DocumentURI>();
                results.AddAllResults(documentURIValidator.Validate(this.DocumentURI));
            }

            if (!this.DocumentTypeURISpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections.R0033, Resources.Sections.R1234);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.ElectronicServiceProviderBasicDataSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections.R0021, Resources.Sections.R1234);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.ElectronicServiceApplicantSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections.R0087, Resources.Sections.R1234);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.ElectronicServiceApplicantContactDataSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections.R1164, Resources.Sections.R1234);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.SendApplicationWithReceiptAcknowledgedMessageSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Fields._0008_000198, Resources.Sections.R1234);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.ApplicationTypeSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Fields.R1295, Resources.Sections.R1234);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }
        }
        
        public override string ToString()
        {
            string result = string.Empty;
            
            result +=
                Environment.NewLine + "Вид заявление:" + Environment.NewLine + //TODO change
                this.ApplicationType.GetDisplay(ApplicationType.ToString());//
            result += Environment.NewLine + this.SUNAUServiceName.ToString()+":.";

            result += Environment.NewLine + "Администрация - доставчик на услугата:." + Environment.NewLine 
                + this.ElectronicServiceProviderBasicData.ToString();
            result += Environment.NewLine + "Данни за заявител:." + Environment.NewLine 
                + this.ElectronicServiceApplicant.ToString();
            result += Environment.NewLine + "Данни за контакт с заявителя:." + Environment.NewLine 
                + this.ElectronicServiceApplicantContactData.ToString();
            
            
            return result;
        }
    
    
    }
}