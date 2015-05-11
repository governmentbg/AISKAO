using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class TransferredDocumentMD
    {
        [ObjectValidator]
        [RequiredInSection(typeof(TransferredDocument),
            FieldNameResourceType = typeof(Resources.Sections),
            FieldNameResourceName = "_0009_000001")]
        public object DocumentURI { get; set; }

        [RequiredInSection(typeof(TransferredDocument),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0107")]
        [CharsAllowed("^[А-Яа-я0-9 ‘,.?!:%()\"-]*$", "кирилица, цифри и символите интервал, ‘ (апостроф), – (тире) , запетая, . (точка), ? (въпросителна), ! (удивителна), : (двоеточие), % (процент), ( (лява кръгла скоба), ) (дясна кръгла скоба), \" (кавички\")",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0107")]
        public object ShortTransferDescription { get; set; }

        [RequiredInSection(typeof(TransferredDocument),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0109")]
        [CharsAllowed("^[А-Яа-я0-9 ‘,.?!:%()\"-]*$", "кирилица, цифри и символите интервал, ‘ (апостроф), – (тире) , запетая, . (точка), ? (въпросителна), ! (удивителна), : (двоеточие), % (процент), ( (лява кръгла скоба), ) (дясна кръгла скоба), \" (кавички\")",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0109")]
        public object ExpandedTransferDescription { get; set; }

        [CharsAllowed("^[A-Za-z0-9+./-]*$", "букви на латиница, цифри и символите \"/\", \"-\", \"+\", \".\"",
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000041")]
        public object FileType { get; set; }
        
        [RequiredInSection(typeof(TransferredDocument),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "_0008_000040")]
        public object FileContent { get; set; }
    }
}
