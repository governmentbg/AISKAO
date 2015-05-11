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
    [RequiredOneOfGroupInSectionAttribute(
        "Middle",
        "Last",
        FieldNameResourceType = typeof(Resources.Sections),
        FieldNameResourceName = "_0009_000005")]
    public class PersonNamesMD
    {
        [MaxStringLength(
            30,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0037")]
        [CharsAllowed(
            "^[А-Яа-я]+([' -][А-Яа-я]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0037")]
        [RequiredInSection(
            typeof(PersonNames),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0037")]
        [DisplayName("Собствено име")]
        public string First
        {
            get;
            set;
        }

        [MaxStringLength(
            30,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0039")]
        [CharsAllowed(
            "^[А-Яа-я]+([' -][А-Яа-я]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0039")]
        [DisplayName("Бащино име")]
        public string Middle
        {
            get;
            set;
        }

        [MaxStringLength(
            50,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0041")]
        [CharsAllowed(
            "^[А-Яа-я]+([' -][А-Яа-я]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0041")]
        [DisplayName("Фамилно име")]
        public string Last
        {
            get;
            set;
        }

        [CharsAllowed(
            "^[А-Яа-я]+([' -][А-Яа-я]+)*$",
            "букви на кирилица, интервал '(апостроф) и -(тире)",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0043")]
        [DisplayName("Псевдоним")]
        public string Pseudonim
        {
            get;
            set;
        }
    }
}
