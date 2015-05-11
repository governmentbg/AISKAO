using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.Segments;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using TechnoLogica.Eservices.InformationObjects.Nomenclatures;
using System.Xml.Serialization;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ServiceApplicantReceiptDataMD))]
    public partial class ServiceApplicantReceiptData : IInformationObject
    {
        [SelfValidation]
        public void ServiceApplicantReceiptDataValidation(Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults results)
        {
            string message;
            ValidationResults valResults = null;
            Microsoft.Practices.EnterpriseLibrary.Validation.Validator validator = null;

            if (!this.ServiceResultReceiptMethodSpecified)
            {
                message = string.Format(Resources.Terms._0006_000015, Resources.Fields._0008_000197, Resources.Sections._0009_000141);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(message, this, "", "0006-000015", null));
            }

            //Задължителни полета, ако получаването е на гише в администрация
            if (this.ServiceResultReceiptMethod.Equals(ServiceResultReceiptMethod.PerCounterInMunicipality))
            {
                if (MunicipalityAdministrationAddress != null)
                {
                    validator = ValidationFactory.CreateValidator<ServiceApplicantReceiptDataMunicipalityAdministrationAdress>();
                }
            }
            //Задължителни полета, ако получаването е по поща
            else if (this.ServiceResultReceiptMethod.Equals(ServiceResultReceiptMethod.PerPostOfficeBox))
            {
                if (string.IsNullOrEmpty(PostOfficeBox))
                {
                    message = string.Format(Resources.Terms._0006_000015, Resources.Fields._0008_000136, Resources.Sections._0009_000141);
                    results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(message, this, "", "0006-000015", null));
                }
            }
            //Задължителни полета, ако получаването е на друг адрес
            else if (this.ServiceResultReceiptMethod.Equals(ServiceResultReceiptMethod.PerCourierOthers))
            {
                if(ApplicantAddress != null)
                {
                    validator = ValidationFactory.CreateValidator<ServiceApplicantReceiptDataApplicantAdress>();
                }
            }

            if (validator != null)
            {
                valResults = validator.Validate(Item);
                results.AddAllResults(valResults);
            }
        }

        [XmlIgnore]
        public ServiceApplicantReceiptDataMunicipalityAdministrationAdress MunicipalityAdministrationAddress
        {
            get { return Item as ServiceApplicantReceiptDataMunicipalityAdministrationAdress; }
            set { Item = value; }
        }

        [XmlIgnore]
        public ServiceApplicantReceiptDataApplicantAdress ApplicantAddress
        {
            get { return Item as ServiceApplicantReceiptDataApplicantAdress; }
            set { Item = value; }
        }

        [XmlIgnore]
        public string PostOfficeBox
        {
            get { return Item as string; }
            set { Item = value; }
        }

        public void ResetItem()
        {
            OnPropertyChanged("PostOfficeBox");
            OnPropertyChanged("ApplicantAddress");
            OnPropertyChanged("MunicipalityAdministrationAddress");
        }
        
        public override string ToString()
        {
            string result = System.Environment.NewLine;
            result += "Начин на получаване на резултата:" + Environment.NewLine + this.ServiceResultReceiptMethod.GetDisplay(ServiceResultReceiptMethod.ToString());
            if (ServiceResultReceiptMethod == ServiceResultReceiptMethod.PerCounterInMunicipality)
            {
                result += Environment.NewLine + "Адрес на администрация:";
                result += Item.ToString();
            }
            else if (ServiceResultReceiptMethod == ServiceResultReceiptMethod.PerCourierOthers)
            {
                result += Environment.NewLine + "Друг адрес:";
                result += Item.ToString();
            }
            return result;
        }
    }
}
