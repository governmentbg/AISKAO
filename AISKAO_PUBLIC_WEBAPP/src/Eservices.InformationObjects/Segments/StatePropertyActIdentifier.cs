using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(StatePropertyActIdentifierMD))]
    public partial class StatePropertyActIdentifier : IInformationObject
    {
        [SelfValidation]
        public void StatePropertyActIdentifierValidation(ValidationResults results)
        {
            string msg;

            if (!this.IssueDateSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Fields._0008_000285, Resources.Sections._0009_000199);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }
        }
    }
}
