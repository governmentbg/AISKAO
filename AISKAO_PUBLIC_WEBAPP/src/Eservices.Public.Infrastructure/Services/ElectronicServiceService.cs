using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TechnoLogica.Eservices.Public.Core.DTOs;
using TechnoLogica.Eservices.Public.Core.IServices;
using TechnoLogica.Eservices.Public.Core.Repositories;
using TechnoLogica.Eservices.Public.DataAccess;
using TechnoLogica.Eservices.Public.Infrastructure.Repositories;
using TechnoLogica.Eservices.Public.Infrastructure.Site;

namespace TechnoLogica.Eservices.Public.Infrastructure.Services
{
    public class ElectronicServiceService : IElectronicServiceService
    {
        private AISWebEntities Db { get; set; }
        public IRepository<WEB_REGISTERED_DOCUMENTS_V> RegisteredDocumentsRepo { get; set; }
        public IRepository<WEB_CASE_OFFICIAL_DOCUMENTS_V> OfficialDocumentsRepo { get; set; }
        public IRepository<WEB_SERVICE_STAGES_V> ServiceStagesRepo { get; set; }
        public IRepository<WEB_E_SERVICE_STATUS_V> ServiceStatusRepo { get; set; }

        public ElectronicServiceService(AISWebEntities context)
        {
            Db = context;
            RegisteredDocumentsRepo = new SQLRepository<WEB_REGISTERED_DOCUMENTS_V>(context);
            OfficialDocumentsRepo = new SQLRepository<WEB_CASE_OFFICIAL_DOCUMENTS_V>(context);
            ServiceStagesRepo = new SQLRepository<WEB_SERVICE_STAGES_V>(context);
            ServiceStatusRepo = new SQLRepository<WEB_E_SERVICE_STATUS_V>(context);
        }

        public IQueryable<WEB_E_SERVICE_STATUS_V> GetServiceStages(int serviceId)
        {
            return ServiceStatusRepo.Find(s => s.SERVICE_ID.Equals(serviceId));
        }

        public IQueryable<OfficialDocumentsDTO> GetOfficialDocuments(int initialDocumentId)
        {

            var officialDocuments = OfficialDocumentsRepo.GetAll();
            var registeredDocuments = RegisteredDocumentsRepo.GetAll();

            var officialDocumentsDetails = from odoc in officialDocuments
                                           join rdoc in registeredDocuments
                                               on odoc.DOCUMENT_ID equals rdoc.ID
                                           where odoc.INITIAL_DOCUMENT_ID.Equals(initialDocumentId)
                                           select new OfficialDocumentsDTO()
                                           {
                                               DocumentId = rdoc.ID,
                                               URI = rdoc.URI,
                                               DocumentName = rdoc.NAME,
                                               DocumentCreatedOn = rdoc.CREATED_ON,
                                               DocumentTypeId = rdoc.DOCUMENT_TYPE_ID,
                                               ContentId = rdoc.CONTENT_ID,
                                               ContentMIMEType = rdoc.CONTENT_MIME_TYPE,
                                               IsXMLDoc = rdoc.IS_XML_DOC

                                           };
            return officialDocumentsDetails;
        }

        public string GetDocumentContent(int contentId)
        {
            string docContext = Db.WEB_GET_DOC_CONTENT(contentId).FirstOrDefault();
            return docContext;
        }


        public byte[] GetDocumentDownloadContent(int contentId, string docName, string mimeType, int isXml, out string fileType, out string encodedFileName)
        {
            string content = GetDocumentContent(contentId);
            fileType = mimeType ?? "text/xml";
            var fileName = Utils.EnsureFileNameExtension(docName, fileType);
            encodedFileName = Utils.GetBrowserEncodedString(fileName);

            if (isXml == 1 && content != null)
                return Utils.GetByteArrayFromDocumentContent(content);

            else
                return Utils.GetByteArrayFromDocumentContent(content, false);

        }
    }
}
