using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.Documents;
using System.ComponentModel.DataAnnotations;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(CertificateIssuanceOnCircumstantialVerificationMD))]
    public partial class CertificateIssuanceOnCircumstantialVerification : IInformationObject, IPropertyElectronicApplicationDocument
    {
        private bool electronicAdministrativeServiceHeaderFieldSpecified;
        private bool serviceApplicantReceiptDataFieldSpecified;
        private bool electronicAdministrativeServiceFooterFieldSpecified;
        private bool stateAndMunicipalPropertyIdentifyingDataSpecified;
        private bool attachedDocumentsSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ElectronicAdministrativeServiceHeaderSpecified
        {
            get
            {
                return this.electronicAdministrativeServiceHeaderFieldSpecified;
            }
            set
            {
                if ((electronicAdministrativeServiceHeaderFieldSpecified.Equals(value) != true))
                {
                    this.electronicAdministrativeServiceHeaderFieldSpecified = value;
                    this.OnPropertyChanged("ElectronicAdministrativeServiceHeaderSpecified");
                }
            }
        }

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ServiceApplicantReceiptDataSpecified
        {
            get
            {
                return this.serviceApplicantReceiptDataFieldSpecified;
            }
            set
            {
                if ((serviceApplicantReceiptDataFieldSpecified.Equals(value) != true))
                {
                    this.serviceApplicantReceiptDataFieldSpecified = value;
                    this.OnPropertyChanged("ServiceApplicantReceiptDataSpecified");
                }
            }
        }

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool ElectronicAdministrativeServiceFooterSpecified
        {
            get
            {
                return this.electronicAdministrativeServiceFooterFieldSpecified;
            }
            set
            {
                if ((electronicAdministrativeServiceFooterFieldSpecified.Equals(value) != true))
                {
                    this.electronicAdministrativeServiceFooterFieldSpecified = value;
                    this.OnPropertyChanged("ElectronicAdministrativeServiceFooterSpecified");
                }
            }
        }

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool StateAndMunicipalPropertyIdentifyingDataSpecified
        {
            get
            {
                return this.stateAndMunicipalPropertyIdentifyingDataSpecified;
            }
            set
            {
                if ((stateAndMunicipalPropertyIdentifyingDataSpecified.Equals(value) != true))
                {
                    this.stateAndMunicipalPropertyIdentifyingDataSpecified = value;
                    this.OnPropertyChanged("StateAndMunicipalPropertyIdentifyingDataSpecified");
                }
            }
        }

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool AttachedDocumentsSpecified
        {
            get
            {
                return this.attachedDocumentsSpecified;
            }
            set
            {
                if ((attachedDocumentsSpecified.Equals(value) != true))
                {
                    this.attachedDocumentsSpecified = value;
                    this.OnPropertyChanged("AttachedDocumentsSpecified");
                }
            }
        }
        public override string ToString()
        {
            string result = string.Empty;

            result +=  this.ElectronicAdministrativeServiceHeader.ToString();
            result += Environment.NewLine + "Вид услуга, според скороста за изпълнение:" + Environment.NewLine + ServiceTermType.GetDisplay(ServiceTermType.ToString());
            result += Environment.NewLine + "Данни за получаване на резултата от услугата:.";
            result += Environment.NewLine + this.ServiceApplicantReceiptData.ToString();
            
            if( !string.IsNullOrEmpty(StateAndMunicipalPropertyIdentifyingData.RealEstateAddress.DistrictCode))
            {
                result += Environment.NewLine + "Данни за имот:.";
                result += Environment.NewLine + this.StateAndMunicipalPropertyIdentifyingData.ToString();
            }

            if (AttachedDocuments.Count>0)
            {
                result += Environment.NewLine + "Прикачени документи:.";
                foreach (var item in AttachedDocuments)
                {
                    var att = item as AttachedDocument;
                    result += Environment.NewLine + att.ToString();
                }
            }

            result += this.ElectronicAdministrativeServiceFooter != null ? Environment.NewLine + this.ElectronicAdministrativeServiceFooter.ToString() : string.Empty;

            return result;
        }

        [SelfValidation]
        public void CertificateIssuanceOnCircumstantialVerificationValidation(Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults results)
        {
            string msg;

            if (!this.ServiceApplicantReceiptDataSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections._0009_000141, Resources.Sections.R9101);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.ElectronicAdministrativeServiceHeaderSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections.R1234, Resources.Sections.R9101);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.ElectronicAdministrativeServiceFooterSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections._0009_000153, Resources.Sections.R9101);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.ServiceTermTypeSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Fields._0008_000143, Resources.Sections.R9101);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.StateAndMunicipalPropertyIdentifyingDataSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections._0009_000202, Resources.Sections.R9101);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }
        }


        [SelfValidation]
        public void XSDValidation(ValidationResults results)
        {
            //string result = Validate();
            //if (!string.IsNullOrEmpty(result))
            //{
            //    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(result, this, "", "", null));
            //}
        }
    }
}
