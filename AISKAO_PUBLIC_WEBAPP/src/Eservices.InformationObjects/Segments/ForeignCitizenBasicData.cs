using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using System.ComponentModel;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ForeignCitizenBasicDataMD))]
    public partial class ForeignCitizenBasicData : IInformationObject
    {     
        public override bool Equals(object obj)
        {
            // If parameter is null return false.
            if (obj == null)
            {
                return false;
            }
            
            // If parameter cannot be cast to Point return false.
            ForeignCitizenBasicData foreignCitizen = obj as ForeignCitizenBasicData;
            if ((System.Object)foreignCitizen == null)
            {
                return false;
            }

            return this.BirthDate.Equals(foreignCitizen.BirthDate)
                   &&
                   this.BirthDateSpecified.Equals(foreignCitizen.BirthDateSpecified)
                   &&
                   this.IdentityDocument.Equals(foreignCitizen.IdentityDocument)
                   &&
                   this.Names.Equals(foreignCitizen.Names)
                   &&
                   this.PlaceOfBirth.Equals(foreignCitizen.PlaceOfBirth);
        }

        public string ValidateObject()
        {
            return this.ValidateObject();
        }
    }
}
