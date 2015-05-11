using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using System.ComponentModel;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ForeignCitizenPlaceOfBirthMD))]
    public partial class ForeignCitizenPlaceOfBirth : IInformationObject
    {
        public override bool Equals(object obj)
        {
            // If parameter is null return false.
            if (obj == null)
            {
                return false;
            }

            // If parameter cannot be cast to Point return false.
            ForeignCitizenPlaceOfBirth placeOfBirth = obj as ForeignCitizenPlaceOfBirth;
            if ((System.Object)placeOfBirth == null)
            {
                return false;
            }

            return this.CountryCode == placeOfBirth.CountryCode
                    &&
                    this.CountryName == placeOfBirth.CountryName
                    &&
                    this.SettlementName == placeOfBirth.SettlementName;
        }
    }
}
