using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using StructureMap;
using TechnoLogica.Eservices.AIS.Core.IServices;
using TechnoLogica.Eservices.InformationObjects.Nomenclatures;
using TechnoLogica.Eservices.AIS.Core.Common;
using TechnoLogica.Eservices.AIS.Core.DTOs;


namespace Eservices.AISClient
{
    public class Service
    {
        public string Initiate(string requestDocumentContent)
        {
            IElectronicServicesService electronicServiceService = ObjectFactory.GetInstance<IElectronicServicesService>();
            int documentID;
            int? serviceID;
            string resultDocumentContent = electronicServiceService.Initiate(out documentID,
                out serviceID,
                requestDocumentContent,
                DocumentElectronicTransportType.WebBasedApplication);

            return resultDocumentContent;
        }

        public string SubmitAdditionalDocument(string additionalDocument, int electronicServiceID)
        {
            IElectronicServicesService electronicServiceService = ObjectFactory.GetInstance<IElectronicServicesService>();
            string responseMessage = electronicServiceService.SubmitAdditionalDocument(additionalDocument, 
                                                    electronicServiceID, DocumentElectronicTransportType.WebBasedApplication);

            return responseMessage;
        }

        public string RemoveFooterElementWithEmptySignature(string xmlContent)
        {
            IDocumentsReceptionService documentsReceptionService = ObjectFactory.GetInstance<IDocumentsReceptionService>();
            return documentsReceptionService.RemoveFooterElementWithEmptySignature(xmlContent);
        }

        public string RemoveFooterElement(string xmlContent)
        {
            IDocumentsReceptionService documentsReceptionService = ObjectFactory.GetInstance<IDocumentsReceptionService>();
            return documentsReceptionService.RemoveFooterElement(xmlContent);
        }

        public bool ContainsDocumentURIElement(string xmlContent)
        {
            IDocumentsReceptionService documentsReceptionService = ObjectFactory.GetInstance<IDocumentsReceptionService>();
            return documentsReceptionService.ContainsDocumentURIElement(xmlContent);
        }

        public string GetXmlRootElementName(string xmlContent)
        {
            IDocumentsReceptionService documentsReceptionService = ObjectFactory.GetInstance<IDocumentsReceptionService>();
            return documentsReceptionService.GetXmlRootElementName(xmlContent);
        }

        public string ChangeApplicationType(string xmlContent)
        {
            IDocumentsReceptionService documentsReceptionService = ObjectFactory.GetInstance<IDocumentsReceptionService>();
            return documentsReceptionService.ChangeApplicationType(xmlContent);
        }

        public string WriteUriInDocContent(string xmlContent, int serviceId)
        {
            IDocumentService documentService = ObjectFactory.GetInstance<IDocumentService>();
            IDocumentsReceptionService documentsReceptionService = ObjectFactory.GetInstance<IDocumentsReceptionService>();

            DocumentUriDTO uri = documentService.GetRegisteredDocumentURI(serviceId);

            string uriPath = documentsReceptionService.GetDocumentTypeXPath(serviceId);

            return documentService.WriteUriInDocContent(xmlContent, uri.RegisteredIndex, uri.SequenceNumber, uri.ReceiptOrSigningDate, uriPath);
        }
    }
}
