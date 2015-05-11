using System.ComponentModel.DataAnnotations;
using System;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(AttachedDocumentMD))]
    public partial class AttachedDocument : IInformationObject
    {
        public override string ToString()
        {
            string result = Environment.NewLine;
            result += (!string.IsNullOrEmpty(this.AttachedDocumentDescription) ? AttachedDocumentDescription : string.Empty)
                   +  (!string.IsNullOrEmpty(this.AttachedDocumentFileName) ? "  файл:" + AttachedDocumentFileName : string.Empty)
                   +  (!string.IsNullOrEmpty(this.AttachedDocumentUniqueIdentifier) ? "  уникален идентификатор на файла:" + AttachedDocumentUniqueIdentifier: string.Empty)
                ;
            return result;
        }

        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion
    }
}
