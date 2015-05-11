using System.ComponentModel.DataAnnotations;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System.ComponentModel;

namespace TechnoLogica.Eservices.InformationObjects
{
    [HasSelfValidation]
    public partial class ElectronicStatementAuthor : IInformationObject, INotifyPropertyChanged
    {
        [SelfValidation]
        public void ElectronicStatementAuthorValidation(Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults results)
        {
            Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults authorResults = null;
            Microsoft.Practices.EnterpriseLibrary.Validation.Validator validator = null;

            if ((Item as PersonBasicData) != null)
            {
                validator = ValidationFactory.CreateValidator<PersonBasicData>();
            }
            else if((Item as ForeignCitizenBasicData) != null)
            {
                validator = ValidationFactory.CreateValidator<ForeignCitizenBasicData>();
            }

            if (validator != null)
            {
                authorResults = validator.Validate(Item);
                results.AddAllResults(authorResults);
            }
        }

        public ForeignCitizenBasicData ForeignCitizen
        {
            get 
            {
                return Item as ForeignCitizenBasicData;
            }
        }

        public PersonBasicData Person
        {
            get
            {
                return Item as PersonBasicData;
            }
        }


        public void ResetItem()
        {
            OnPropertyChanged("Person");
            OnPropertyChanged("ForeignCitizen");
        }

        public override string ToString()
        {
            if (Person != null)
            {
                return Person.ToString();
            }
            else if (ForeignCitizen != null)
            {
                return ForeignCitizen.ToString();
            }
            else
            {
                return string.Empty;
            }
        }


        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion
    }
}
