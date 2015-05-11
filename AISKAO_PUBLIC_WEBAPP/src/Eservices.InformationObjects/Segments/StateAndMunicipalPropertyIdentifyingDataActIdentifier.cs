using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace TechnoLogica.Eservices.InformationObjects
{

    [HasSelfValidation]
    public partial class StateAndMunicipalPropertyIdentifyingDataActIdentifier : InformationObject<StateAndMunicipalPropertyIdentifyingDataActIdentifier>
    {
        [SelfValidation]
        public void ActIdentifierValidation(ValidationResults results)
        {
            ValidationResults valResults = null;
            Microsoft.Practices.EnterpriseLibrary.Validation.Validator validator = null;

            if (StateIdentifier != null)
            {
                validator = ValidationFactory.CreateValidator<StatePropertyActIdentifier>();
            }
            else if (MunicipalIdentifier != null)
            {
                validator = ValidationFactory.CreateValidator<MunicipalPropertyActIdentifier>();
            }

            if (validator != null)
            {
                valResults = validator.Validate(Item);
                results.AddAllResults(valResults);
            }
        }

        public void ResetItem()
        {
            OnPropertyChanged("StateIdentifier");
            OnPropertyChanged("MunicipalIdentifier");
        }

        public StatePropertyActIdentifier StateIdentifier
        {
            get { return Item as StatePropertyActIdentifier; }
        }

        public MunicipalPropertyActIdentifier MunicipalIdentifier
        {
            get { return Item as MunicipalPropertyActIdentifier; }
        }
    }
}
