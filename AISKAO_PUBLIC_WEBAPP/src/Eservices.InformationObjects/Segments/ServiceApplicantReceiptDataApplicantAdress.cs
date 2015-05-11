using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ServiceApplicantReceiptDataApplicantAdressMD))]
    public partial class ServiceApplicantReceiptDataApplicantAdress:IInformationObject
    {
        public override string ToString()
        {
            string result = string.Empty;

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

            return result;
        
        }
    }
}
