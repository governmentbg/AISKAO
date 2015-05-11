using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Collections.Generic;
using TechnoLogica.Eservices.InformationObjects.DataAnnotation;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ElectronicServiceApplicantMD))]
    public partial class ElectronicServiceApplicant : IInformationObject
    {
        private bool emailAddressSpecified;

        [System.Xml.Serialization.XmlIgnoreAttribute()]
        public bool EmailAddressSpecified
        {
            get
            {
                return this.emailAddressSpecified;
            }
            set
            {
                if ((emailAddressSpecified.Equals(value) != true))
                {
                    this.emailAddressSpecified = value;
                    this.OnPropertyChanged("EmailAddressSpecified");
                }
            }
        }

        public void ResetRecipientGroup()
        {
            OnPropertyChanged("RecipientGroup");
        }

        #region IInformationObject Members

        public string ValidateObject()
        {
            throw new System.NotImplementedException();
        }

        #endregion

        public override string ToString()
        {
            if (RecipientGroup.Count == 1)
            {
                if (RecipientGroup.First().Author.Count == 1 &&
                    RecipientGroup.First().Recipient.Count == 1 )
                {
                    if (RecipientGroup.First().Recipient.First().Equals(RecipientGroup.First().Author.First()))
                    {   // Когато авторът на електронното изявление е и титулярът, получател на електронната 
                        // административна услуга, поредността на визуализация едно под друго е 
                        string result = Resources.Visualisation.ElectronicServiceApplicantSamAuthorAndRecipient;
                        result = result.Replace(
                            ":Recipient:",
                            RecipientGroup.First().Recipient.First().ToString());
                        result = result.Replace(
                            ":EmailAddress:",
                            EmailAddress);
                        return result;
                    }
                    else
                    {
                        //Авторът на изявлението се визуализира само ако е различен от получателя на електронната административна услуга. 
                        //В този случай поредността на визуализация едно под друго е:
                        string result = Resources.Visualisation.ElectronicServiceApplicantDifferentAuthorAndRecipient;
                        result = result.Replace(
                            ":Author:",
                            RecipientGroup.First().Author.First().ToString());
                        result = result.Replace(
                            ":Recipient:",
                            RecipientGroup.First().Recipient.First().ToString());
                        result = result.Replace(
                            ":AuthorQuality:",
                            (string.IsNullOrEmpty(RecipientGroup.First().AuthorQuality))? Resources.Visualisation.EmptyAuthorQuality :RecipientGroup.First().AuthorQuality);
                        result = result.Replace(
                            ":EmailAddress:",
                            EmailAddress);
                        return result;                     
                    }
                }
                //TODO: Да се допишат останалите случаи...                            
            }
            else if (RecipientGroup.Count > 1 )
            {
                
            }
            return "";
        }

        public override string ToHtml()
        {

            if (RecipientGroup.Count == 1)
            {
                if (RecipientGroup.First().Author.Count == 1 &&
                    RecipientGroup.First().Recipient.Count == 1)
                {
                    if (RecipientGroup.First().Recipient.First().Equals(RecipientGroup.First().Author.First()))
                    {   // Когато авторът на електронното изявление е и титулярът, получател на електронната 
                        // административна услуга, поредността на визуализация едно под друго е 
                        string result = Resources.Visualisation.HtmlElectronicServiceApplicantSamAuthorAndRecipient;
                        result = result.Replace(
                            ":Recipient:",
                            RecipientGroup.First().Recipient.First().ToString());
                        result = result.Replace(
                            ":EmailAddress:",
                            EmailAddress);
                        return result;
                    }
                    else
                    {
                        //Авторът на изявлението се визуализира само ако е различен от получателя на електронната административна услуга. 
                        //В този случай поредността на визуализация едно под друго е:
                        string result = Resources.Visualisation.HtmlElectronicServiceApplicantDifferentAuthorAndRecipient;
                        result = result.Replace(
                            ":Author:",
                            RecipientGroup.First().Author.First().ToString());
                        result = result.Replace(
                            ":Recipient:",
                            RecipientGroup.First().Recipient.First().ToString());
                        result = result.Replace(
                            ":AuthorQuality:",
                            (string.IsNullOrEmpty(RecipientGroup.First().AuthorQuality)) ? Resources.Visualisation.EmptyAuthorQuality : RecipientGroup.First().AuthorQuality);
                        result = result.Replace(
                            ":EmailAddress:",
                            EmailAddress);
                        return result;
                    }
                }
                //TODO: Да се допишат останалите случаи...                            
            }
            else if (RecipientGroup.Count > 1)
            {

            }
            return "";
        }
    }
}
