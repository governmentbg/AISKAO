using System.ComponentModel.DataAnnotations;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(XMLDigitalSignatureMD))]
    public partial class XMLDigitalSignature : IInformationObject
    {
        public class XMLDigitalSignatureMD
        {
            public SignatureType Signature { get; set; }
        }

        /// <summary>
        /// Връща истина, ако има дефинирани елементи в списъка. Резултатът показва дали стойността на свойството да бъде сериализирана в XML.
        /// </summary>
        /// <returns>Истина, ако има дефинирани елементи в списъка</returns>
        public bool ShouldSerializeSignature()
        {
            return !(this.Signature == null
                || (this.Signature.SignedInfo == null
                    && this.Signature.SignatureValue == null
                    && this.Signature.Object == null
                    && this.Signature.KeyInfo == null));
        }

        public override string ToString()
        {
            return "";
        }

        #region IInformationObject Members

        public string ValidateObject()
        {
            return this.Validate();
        }

        #endregion
    }
}
