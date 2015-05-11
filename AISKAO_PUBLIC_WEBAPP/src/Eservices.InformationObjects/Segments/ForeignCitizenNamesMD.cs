using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using System.ComponentModel;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class ForeignCitizenNamesMD
    {
        [CharsAllowed("^[А-Яа-я]+([' -][А-Яа-я]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0053")]
        [DisplayName("Собствено име на кирилица")]
        public object FirstCyrillic { get; set; }

        [CharsAllowed("^[А-Яа-я]+([' -][А-Яа-я]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0055")]
        [DisplayName("Фамилно име на кирилица")]
        public object LastCyrillic { get; set; }

        [CharsAllowed("^[А-Яа-я]+([' -][А-Яа-я]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0057")]
        [DisplayName("Друго име на кирилица")]
        public object OtherCyrillic { get; set; }

        [CharsAllowed("^[А-Яа-я]+([' -][А-Яа-я]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0059")]
        [DisplayName("Псевдоним на кирилица")]
        public object PseudonimCyrillic { get; set; }

        [CharsAllowed("^[A-za-z]+([' -][A-Za-z]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0061")]
        [DisplayName("Първо име на латинициа")]
        public object FirstLatin { get; set; }

        [CharsAllowed("^[A-za-z]+([' -][A-Za-z]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0063")]
        [DisplayName("Фамилно име на латиница")]
        public object LastLatin { get; set; }

        [CharsAllowed("^[A-za-z]+([' -][A-Za-z]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0065")]
        [DisplayName("Друго име на латиница")]
        public object OtherLatin { get; set; }

        [CharsAllowed("^[A-za-z]+([' -][A-Za-z]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0067")]
        [DisplayName("Псевдоним на латиница")]
        public object PseudonimLatin { get; set; }
    }
}
