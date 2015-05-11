using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class PersonIdentifierMD
    {
        [DisplayName("ЕГН")]
        [EGN]
        public string EGN { get; set; }

        [DisplayName("ЛНЧ")]
        [PNF]
        public string LNCh { get; set; }
    }
}
