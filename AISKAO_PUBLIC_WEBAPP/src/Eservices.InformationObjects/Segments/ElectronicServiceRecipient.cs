using System.ComponentModel.DataAnnotations;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System.ComponentModel;

namespace TechnoLogica.Eservices.InformationObjects
{
    [HasSelfValidation]
    public partial class ElectronicServiceRecipient : IInformationObject
    {
        [SelfValidation]
        public void ElectronicServiceRecepientValidation(Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResults results)
        {
            ValidationResults valResults = null;
            Microsoft.Practices.EnterpriseLibrary.Validation.Validator validator = null;

            if (Entity != null)
            {
                validator = ValidationFactory.CreateValidator<EntityBasicData>();
            }
            else if (ForeignEntity != null)
            {
                validator = ValidationFactory.CreateValidator<ForeignEntityBasicData>();
            }
            else if (ForeignCitizen != null)
            {
                validator = ValidationFactory.CreateValidator<ForeignCitizenBasicData>();
            }
            else if (Person != null)
            {
                validator = ValidationFactory.CreateValidator<PersonBasicData>();
            }

            if (validator != null)
            {
                valResults = validator.Validate(Item);
                results.AddAllResults(valResults);
            }
        }

        public EntityBasicData Entity
        {
            get{ return Item as EntityBasicData;}
        }

        public ForeignEntityBasicData ForeignEntity
        {
            get{ return Item as ForeignEntityBasicData;}
        }

        public ForeignCitizenBasicData ForeignCitizen
        {
            get { return Item as ForeignCitizenBasicData; }
        }

        public PersonBasicData Person
        {
            get{ return Item as PersonBasicData;}
        }

        public void ResetItem()
        {
            OnPropertyChanged("Person");
            OnPropertyChanged("ForeignCitizen");
            OnPropertyChanged("ForeignEntity");
            OnPropertyChanged("Entity");
        }

        public override string ToString()
        {
            if (Person != null)
            {
                return Person.ToString();
            }
            else if (Entity != null)
            {
                return Entity.ToString();
            }
            else if (ForeignCitizen != null)
            {
                return ForeignCitizen.ToString();
            }
            else if (ForeignEntity != null)
            {
                return ForeignEntity.ToString();
            }
            else
            {
                return string.Empty;
            }
        }
        public bool Equals(ElectronicStatementAuthor author)
        {
            if (Person != null && author != null)
            {
                return Person.Equals(author.Person);
            }
            else if (ForeignCitizen != null && author != null && author.ForeignCitizen != null)
            {
                return ForeignCitizen.Equals(author.ForeignCitizen);
            }
            else
            {
                return false;
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
