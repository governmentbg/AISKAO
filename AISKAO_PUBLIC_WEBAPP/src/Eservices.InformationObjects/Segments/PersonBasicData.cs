using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(PersonBasicDataMD))]
    public partial class PersonBasicData : IInformationObject
    {
        private bool namesFieldSpecified;
        private bool identifierFieldSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool NamesSpecified
        {
            get
            {
                return this.namesFieldSpecified;
            }
            set
            {
                if ((namesFieldSpecified.Equals(value) != true))
                {
                    this.namesFieldSpecified = value;
                    this.OnPropertyChanged("NamesSpecified");
                }
            }
        }

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool IdentifierSpecified
        {
            get
            {
                return this.identifierFieldSpecified;
            }
            set
            {
                if ((identifierFieldSpecified.Equals(value) != true))
                {
                    this.identifierFieldSpecified = value;
                    this.OnPropertyChanged("IdentifierSpecified");
                }
            }
        }

        public override string ToString()
        {
            return Names.ToString();
        }
        public override bool Equals(object obj)
        {
            PersonBasicData personBasicData = obj as PersonBasicData;
            if (personBasicData == null)
            {
                return base.Equals(obj);
            }
            else
            {
                return Identifier != null && 
                       Identifier.Equals(personBasicData.Identifier) &&
                       Names != null &&
                       Names.Equals(personBasicData.Names);
            }
        }

        [SelfValidation]
        public void PersonBasicDataValidation(ValidationResults results)
        {
            string msg;

            if (!this.NamesSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections._0009_000005, Resources.Sections.R0071);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }

            if (!this.IdentifierSpecified)
            {
                msg = string.Format(Resources.Terms._0006_000015, Resources.Sections.R0051, Resources.Sections.R0071);
                results.AddResult(new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(msg, this, "", "0006-000015", null));
            }
        }


        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion
    }
}
