using System.ComponentModel.DataAnnotations;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using System.ComponentModel;
using System.Xml.Serialization;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(PersonIdentifierMD))]
    public partial class PersonIdentifier : IInformationObject
    {
        public override void OnPropertyChanged(string info)
        {
            base.OnPropertyChanged(info);
            if (ValidateOnPropertyChange || HasCustomValidationError)
            {
                Validation.Validate(this);
            }
        }

        [SelfValidation]
        public void PersonBasicDataValidation(ValidationResults results)
        {
            //if (string.IsNullOrWhiteSpace(EGN) && string.IsNullOrWhiteSpace(LNCh))
            //{
            //    string message = string.Format("Точно едно от полетата {0} в секцията {1} трябва да бъде попълнено.", "\"ЕГН\",\"ЛНЧ\"", Resources.Sections.R0051);
            //    var error = new Microsoft.Practices.EnterpriseLibrary.Validation.ValidationResult(message, this, "", "", null);
            //    results.AddResult(error);
            //    if (CustomErrors.Count == 0)
            //    {
            //        CustomErrors.Add(error);
            //        HasCustomValidationError = true;
            //    }
            //}
            //else if (HasCustomValidationError)
            //{
            //    CustomErrors.Clear();
            //    HasCustomValidationError = false;
            //}
        }

        [XmlIgnore]
        public string EGN
        {
            get
            {
                if (ItemElementName == ItemChoiceTypeIdentificationNum.EGN)
                {
                    return Item;
                }
                else 
                {
                    return string.Empty;
                }
            }
            set
            {
                if (ItemElementName == ItemChoiceTypeIdentificationNum.EGN)
                {
                    Item = value;
                }                
            }
        }

        [XmlIgnore]
        public string LNCh
        {
            get
            {
                if (ItemElementName == ItemChoiceTypeIdentificationNum.LNCh)
                {
                    return Item;
                }
                else
                {
                    return string.Empty;
                }
            }
            set
            {
                if (ItemElementName == ItemChoiceTypeIdentificationNum.LNCh)
                {
                    Item = value;
                }                
            }
        }

        public void ResetItem()
        {
            Item = string.Empty;
            OnPropertyChanged("LNCh");
            OnPropertyChanged("EGN");            
        }


        public override bool Equals(object obj)
        {
            PersonIdentifier personIdentifier = obj as PersonIdentifier;
            if (Item != null && personIdentifier != null)
            {
                return Item.Equals(personIdentifier.Item);
            }
            else if (Item == null && personIdentifier != null && personIdentifier.Item == null)
            {
                return true;
            }
            else
            {
                return base.Equals(obj);
            }
        }
    }
}
