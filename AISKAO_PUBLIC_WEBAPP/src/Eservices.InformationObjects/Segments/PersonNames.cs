using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using System.ComponentModel;
using System.Text;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(PersonNamesMD))]
    public partial class PersonNames : IInformationObject
    {
        private bool middleSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool MiddleSpecified
        {
            get
            {
                return this.middleSpecified;
            }
            set
            {
                if ((middleSpecified.Equals(value) != true))
                {
                    this.middleSpecified = value;
                    this.OnPropertyChanged("MiddleSpecified");
                }
            }
        }

        private bool lastSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool LastSpecified
        {
            get
            {
                return this.lastSpecified;
            }
            set
            {
                if ((lastSpecified.Equals(value) != true))
                {
                    this.lastSpecified = value;
                    this.OnPropertyChanged("LastSpecified");
                }
            }
        }

        private bool pseudonimSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool PseudonimSpecified
        {
            get
            {
                return this.pseudonimSpecified;
            }
            set
            {
                if ((pseudonimSpecified.Equals(value) != true))
                {
                    this.pseudonimSpecified = value;
                    this.OnPropertyChanged("PseudonimSpecified");
                }
            }
        }

        public override void OnPropertyChanged(string info)
        {
            base.OnPropertyChanged(info);
            if (ValidateOnPropertyChange || HasCustomValidationError)
            {
                Validation.Validate(this);
            }
        }
        
        public override string ToString()
        {
            return string.Format("{0} {1} {2}", First, Middle, Last);
        }

        public override bool Equals(object obj)
        {
            PersonNames personNames = obj as PersonNames;
            if (personNames == null)
            {
                return false;
            }
            else
            {
                return
                    (
                        (First == null && 
                         personNames.First == null) 
                         ||
                        (First != null &&
                         First.Equals(personNames.First))) 
                    &&
                    (
                        (Middle == null && 
                        personNames.Middle == null) 
                        ||
                        (Middle != null &&
                        Middle.Equals(personNames.Middle))) 
                    &&
                    (
                        (Last == null  &&
                        personNames.Last == null) 
                        ||
                        (Last != null &&
                        Last.Equals(personNames.Last))) 
                    &&
                    (
                        (Pseudonim == null && 
                        personNames.Pseudonim == null) 
                        ||
                        (Pseudonim != null &&
                        Pseudonim.Equals(personNames.Pseudonim)));
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
