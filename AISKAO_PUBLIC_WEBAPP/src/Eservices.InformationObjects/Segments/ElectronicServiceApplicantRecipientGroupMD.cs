using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using System.ComponentModel;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class ElectronicServiceApplicantRecipientGroupMD
    {
        [ObjectCollectionValidator]
        public object Author { get; set; }

        [CharsAllowed(
            "^[А-Яа-я0-9 `,.?!:%()\"-]+$",
            "букви на кирилица, цифри и символите интервал, ‘ (апостроф), – (тире) , запетая, . (точка), ? (въпросителна), ! (удивителна), : (двоеточие), % (процент), ( (лява кръгла скоба), ) (дясна кръгла скоба), \" (кавички).",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0083"
        )]
        [DisplayName("Качество, в което авторът действа от името на титуляра и обем на представителната власт")]
        public object AuthorQuality { get; set; }

        [ObjectCollectionValidator]
        public object Recipient { get; set; }
    }
}
