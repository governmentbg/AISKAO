using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.Segments;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects
{
    [HasSelfValidation]
    public partial class StateAndMunicipalPropertyIdentifyingDataLandPropertyOldIdentifier : IInformationObject
    {
        [SelfValidation]
        public void LandPropertyOldIdentifierValidation(ValidationResults results)
        {
            string msg;
            ValidationResults valResults = null;
            Microsoft.Practices.EnterpriseLibrary.Validation.Validator validator = null;

            if (UrbanIdentifier != null)
            {
                validator = ValidationFactory.CreateValidator<UrbanLandPropertyOldIdentifier>();
            }
            else if (FarmlandIdentifier != null)
            {
                validator = ValidationFactory.CreateValidator<FarmlandAndForestLandPropertyOldIdentifier>();
            }

            if (validator != null)
            {
                valResults = validator.Validate(Item);
                results.AddAllResults(valResults);
            }
        }

        public void ResetItem()
        {
            OnPropertyChanged("UrbanIdentifier");
            OnPropertyChanged("FarmlandIdentifier");
        }

        public UrbanLandPropertyOldIdentifier UrbanIdentifier
        {
            get { return Item as UrbanLandPropertyOldIdentifier; }
        }

        public FarmlandAndForestLandPropertyOldIdentifier FarmlandIdentifier
        {
            get { return Item as FarmlandAndForestLandPropertyOldIdentifier; }
        }
    }
}
