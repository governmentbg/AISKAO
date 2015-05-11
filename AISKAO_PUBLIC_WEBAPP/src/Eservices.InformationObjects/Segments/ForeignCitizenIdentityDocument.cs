using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using TechnoLogica.Eservices.InformationObjects.Segments;

namespace TechnoLogica.Eservices.InformationObjects
{
    [MetadataType(typeof(ForeignCitizenIdentityDocumentMD))]
    public partial class ForeignCitizenIdentityDocument:IInformationObject
    {
        public override bool Equals(object obj)
        {
            // If parameter is null return false.
            if (obj == null)
            {
                return false;
            }

            // If parameter cannot be cast to Point return false.
            ForeignCitizenIdentityDocument identityDocument = obj as ForeignCitizenIdentityDocument;
            if ((System.Object)identityDocument == null)
            {
                return false;
            }

            return this.DocumentNumber == identityDocument.DocumentNumber
                    &&
                    this.DocumentType == identityDocument.DocumentType;
        }
    }
}
