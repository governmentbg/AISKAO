using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(EntityBasicDataMD))]
    public partial class EntityBasicData : IInformationObject
    {      
        public override string ToString()
        {
            return string.Format("{0}, ЕИК/код по БУЛСТАТ {1}", this.Name, this.Identifier);
        }

        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion
    }
}
