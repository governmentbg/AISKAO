using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects
{
    public partial class AISUserNames : IInformationObject
    {
        public PersonNames PersonNames
        {
            get
            {
                return Item as PersonNames;
            }
        }

        public ForeignCitizenNames ForeignCitizenNames
        {
            get
            {
                return Item as ForeignCitizenNames;
            }
        }

        public override string ToString()
        {
            if (PersonNames != null)
            {
                return string.Format("{0} {1} {2}", PersonNames.First, PersonNames.Middle, PersonNames.Last);
            }
            else if (ForeignCitizenNames != null)
            {
                return string.Format("{0} {1} {2}", ForeignCitizenNames.FirstCyrillic, ForeignCitizenNames.OtherCyrillic, ForeignCitizenNames.LastCyrillic);
            }
            else
            {
                return "";
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
