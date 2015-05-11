using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using System.ComponentModel;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class ForeignCitizenBasicDataMD
    {
        [ObjectValidator]
        public object Names { get; set; }

        [DateFormatAttribute]
        [DisplayName("Дата на раждане")]
        public object BirthDate { get; set; }

        [ObjectValidator]
        public object PlaceOfBirth { get; set; }

        [ObjectValidator]
        public object IdentityDocument { get; set; }
    }
}
