using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(TransferredDocumentMD))]
    public partial class TransferredDocument : IInformationObject
    {
        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion
    }
}
