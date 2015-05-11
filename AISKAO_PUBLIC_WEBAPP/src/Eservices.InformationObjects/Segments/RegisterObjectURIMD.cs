using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace TechnoLogica.Eservices.InformationObjects.Segments
{
    public class RegisterObjectURIMD
    {
        [Integer(
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0707")]
        [MinBoundaryNumber(0,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0707")]
        public object RegisterIndex { get; set; }

        [Integer(
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0707")]
        [MinBoundaryNumber(0,
            FieldNameResourceType = typeof(Resources.Fields),
            FieldNameResourceName = "R0707")]
        public object BatchNumber { get; set; }
    }
}
