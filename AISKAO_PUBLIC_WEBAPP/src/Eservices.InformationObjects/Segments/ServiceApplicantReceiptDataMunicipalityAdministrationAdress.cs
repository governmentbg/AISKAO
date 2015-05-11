using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.Segments;
using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ServiceApplicantReceiptDataMunicipalityAdministrationAdressMD))]
    public partial class ServiceApplicantReceiptDataMunicipalityAdministrationAdress : IInformationObject
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

            result += !string.IsNullOrEmpty(this.Mayoralty) ? Environment.NewLine
                + "Кметство:" + Environment.NewLine
                + this.Mayoralty.ToString() : string.Empty;

            result += !string.IsNullOrEmpty(this.AreaName) ? Environment.NewLine
                + "Район:" + Environment.NewLine
                + this.AreaName.ToString() : string.Empty;

           
            return result;
        }
    }
}
