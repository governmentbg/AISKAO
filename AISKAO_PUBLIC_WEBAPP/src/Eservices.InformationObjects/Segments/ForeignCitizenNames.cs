using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.Segments;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ForeignCitizenNamesMD))]
    public partial class ForeignCitizenNames : IInformationObject
    {       
        [SelfValidation]
        public void ForeignCitizenNamesValidation(Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults results)
        {
            string message = string.Empty;

            if (string.IsNullOrEmpty(FirstCyrillic) && string.IsNullOrEmpty(FirstLatin))
            {
                message = string.Format(Resources.Terms._0006_000019, "\"Собствено име на физическо лице, нерегистрирано по българското законодателство\",  \"Собствено име на латиница на физическо лице, нерегистрирано по българското законодателство\"", Resources.Sections.R0069);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(message, this, "", "0006-000019", null));
            }

            if(!string.IsNullOrEmpty(FirstCyrillic) && string.IsNullOrEmpty(LastCyrillic) && string.IsNullOrEmpty(OtherCyrillic))
            {
                message = string.Format(Resources.Terms._0006_000019, "\"Фамилно име на физическо лице, нерегистрирано по българското законодателство\", \"Други имена на физическо лице, нерегистрирано по българското законодателство\"", Resources.Sections.R0069);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(message, this, "", "0006-000019", null));
            }

            if (!string.IsNullOrEmpty(FirstLatin) && string.IsNullOrEmpty(LastLatin) && string.IsNullOrEmpty(OtherLatin))
            {
                message = string.Format(Resources.Terms._0006_000019, "\"Фамилно име на латиница на физическо лице, нерегистрирано по българското законодателство\", \"Други имена на латиница на физическо лице, нерегистрирано по българското законодателство\"", Resources.Sections.R0069);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(message, this, "", "0006-000019", null));
            }
        }
        
        public override bool Equals(object obj)
        {
            // If parameter is null return false.
            if (obj == null)
            {
                return false;
            }

            // If parameter cannot be cast to Point return false.
            ForeignCitizenNames foreignCitizenNames = obj as ForeignCitizenNames;
            if ((System.Object)foreignCitizenNames == null)
            {
                return false;
            }

            return this.FirstCyrillic == foreignCitizenNames.FirstCyrillic
                    &&
                    this.FirstLatin == foreignCitizenNames.FirstLatin
                    &&
                    this.LastCyrillic == foreignCitizenNames.LastCyrillic
                    &&
                    this.LastLatin == foreignCitizenNames.LastLatin
                    &&
                    this.OtherCyrillic == foreignCitizenNames.OtherCyrillic
                    &&
                    this.OtherLatin == foreignCitizenNames.OtherLatin
                    &&
                    this.PseudonimCyrillic == foreignCitizenNames.PseudonimCyrillic
                    &&
                    this.PseudonimLatin == foreignCitizenNames.PseudonimLatin;
        }

        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion
    }
}
