using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.Segments;
using System.ComponentModel.DataAnnotations;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(MunicipalPropertyActIdentifierMD))]
    public partial class MunicipalPropertyActIdentifier : IInformationObject
    {
       [SelfValidation]
       public void MunicipalPropertyActIdentifierValidation(ValidationResults results)
        {
            string msg;

            if (!this.IssueDateSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Fields._0008_000287, Resources.Sections._0009_000200);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }
        }
    }
}
