using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class ForeignCitizenPlaceOfBirthMD
    {
        [Country("Code",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0150")]
        [DisplayName("Код на държава")]
        public string CountryCode { get; set; }

        [Country("Name",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0152")]
        [DisplayName("Държава")]
        public string CountryName { get; set; }

        [CharsAllowed("^[А-Яа-я]+([' -][А-Яа-я]+)*$",
            "букви на кирилица и символите интервал, ‘ (апостроф) и – (тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0715")]
        [DisplayName("Населено място")]
        public string SettlementName { get; set; }
    }
}
