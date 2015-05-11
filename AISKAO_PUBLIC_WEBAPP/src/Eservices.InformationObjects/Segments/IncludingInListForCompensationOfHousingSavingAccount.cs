using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.Segments;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using System.ComponentModel.DataAnnotations;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using TechnoLogica.Eservices.InformationObjects.Documents;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(IncludingInListForCompensationOfHousingSavingAccountMD))]
    public partial class IncludingInListForCompensationOfHousingSavingAccount : IInformationObject, IElectronicApplicationDocument
    {
        private bool electronicAdministrativeServiceHeaderFieldSpecified;
        private bool serviceApplicantReceiptDataFieldSpecified;
        private bool electronicAdministrativeServiceFooterFieldSpecified;
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

        [SelfValidation]
        public void IncludingInListForCompensationOfHousingSavingAccountValidation(Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults results)
        {
            string msg;

            if (!this.ServiceApplicantReceiptDataSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections._0009_000141, Resources.Sections.R9097);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.ElectronicAdministrativeServiceHeaderSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections.R1234, Resources.Sections.R9097);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.ElectronicAdministrativeServiceFooterSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections._0009_000153, Resources.Sections.R9097);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.ServiceTermTypeSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Fields._0008_000143, Resources.Sections.R9097);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }
        }
    }
}
