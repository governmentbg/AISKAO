using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TechnoLogica.Eservices.Public.Core.IServices
{
    public interface IDocumentsReceptionService
    {
        string LastRecievedDocumentXMLContent(string documentURI);
        string GetXsdRootElementName(string documentURI);
        int GetServiceId(string documentURI);
    }
}
