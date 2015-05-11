using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    [HasSelfValidation]
    public class DocumentURIMD
    {
        [Display(ResourceType = typeof(Resources.Fields), Name = "R0013")]
        [MinBoundaryNumber(0,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0013")]
        [Integer(
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0013")]
        [RequiredInSectionAttribute(typeof(DocumentURI),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0013")]
        public object RegisterIndex { get; set; }

        [Display(ResourceType = typeof(Resources.Fields), Name = "R0015")]
        [RequiredInSectionAttribute(typeof(DocumentURI),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0015")]
        public object SequenceNumber
        {
            get;
            set;
        }

        [Display(ResourceType = typeof(Resources.Fields), Name = "R0017")]
        [DateFormatAttribute]
        [RequiredInSectionAttribute(typeof(DocumentURI),
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0017")]
        public object ReceiptOrSigningDate
        {
            get;
            set;
        }

        [ScaffoldColumn(false)]
        public bool ReceiptOrSigningDateSpecified
        {
            get;
            set;
        }
    }
}
