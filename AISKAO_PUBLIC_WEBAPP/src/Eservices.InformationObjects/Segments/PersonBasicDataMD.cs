using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class PersonBasicDataMD
    {
        [ObjectValidator]
        public object Names { get; set; }

        [ObjectValidator]
        public object Identifier { get; set; }
    }
}
