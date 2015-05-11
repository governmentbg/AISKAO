using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using TechnoLogica.Eservices.InformationObjects.Nomenclatures;
using System.Collections.Generic;
using TechnoLogica.Eservices.InformationObjects.Segments;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(DocumentURIMD))]
    public partial class DocumentURI : IInformationObject
    {

        [SelfValidation]
        public void DocumentURIValidation(ValidationResults results)
        {
            string msg;

            if (!this.ReceiptOrSigningDateSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Fields.R0017, Resources.Sections.R0019);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }
        }
        
        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion

        public override string ToString()
        {
            return string.Format("{0}-{1}-{2:dd.MM.yyyy}", RegisterIndex, SequenceNumber, ReceiptOrSigningDate);
        }
    }
}
