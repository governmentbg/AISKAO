using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.Segments;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ElectronicServiceApplicantContactDataMD))]
    public partial class ElectronicServiceApplicantContactData:IInformationObject
    {
        private bool phoneNumbersSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool PhoneNumbersSpecified
        {
            get
            {
                return this.phoneNumbersSpecified;
            }
            set
            {
                if ((phoneNumbersSpecified.Equals(value) != true))
                {
                    this.phoneNumbersSpecified = value;
                    this.OnPropertyChanged("PhoneNumbersSpecified");
                }
            }
        }

        private bool faxNumbersSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool FaxNumbersSpecified
        {
            get
            {
                return this.faxNumbersSpecified;
            }
            set
            {
                if ((faxNumbersSpecified.Equals(value) != true))
                {
                    this.faxNumbersSpecified = value;
                    this.OnPropertyChanged("FaxNumbersSpecified");
                }
            }
        }

        public override string ToString()
        {
            string result=string.Empty;

            result += !string.IsNullOrEmpty(DistrictName) ? Environment.NewLine
                + "Област:" + Environment.NewLine
                + this.DistrictName.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(MunicipalityName) ? Environment.NewLine
                + "Община:" + Environment.NewLine
                + this.MunicipalityName.ToString() : string.Empty;
            
            result += !string.IsNullOrEmpty(this.SettlementName) ? Environment.NewLine
                + "Населено място:" + Environment.NewLine
                + this.SettlementName.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(PostCode) ? Environment.NewLine
                + "Пощенски код:" + Environment.NewLine
                + this.PostCode.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(AddressDescription) ? Environment.NewLine
                + "Адрес:" + Environment.NewLine
                + this.AddressDescription.ToString() : string.Empty;

            if (PhoneNumbers != null && PhoneNumbers.Count > 0)
            {
                foreach (var item in PhoneNumbers)
                {
                    result += !string.IsNullOrEmpty(item) ? Environment.NewLine
                                    + "Телефон:" + Environment.NewLine
                                    + item : string.Empty;
                }
            }
            
            if (FaxNumbers != null && FaxNumbers.Count > 0)
            {
                foreach (var item in FaxNumbers)
                {
                    result += !string.IsNullOrEmpty(item) ? Environment.NewLine
                                    + "Факс:" + Environment.NewLine
                                    + item : string.Empty;
                }
            }
            
            return result;
        }
    }
}
