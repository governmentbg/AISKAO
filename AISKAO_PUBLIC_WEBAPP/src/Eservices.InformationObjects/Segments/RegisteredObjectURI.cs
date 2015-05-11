using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(RegisterObjectURIMD))]
    public partial class RegisterObjectURI : IInformationObject
    {
        public override string ToString()
        {
            return string.Format("{0}-{1}", this.RegisterIndex, this.BatchNumber);
        }
    }
}
