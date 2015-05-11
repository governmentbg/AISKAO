using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechnoLogica.Eservices.Public.Core.IServices;
using TechnoLogica.Eservices.Public.Core.Repositories;
using TechnoLogica.Eservices.Public.DataAccess;
using TechnoLogica.Eservices.Public.Infrastructure.Repositories;

namespace TechnoLogica.Eservices.Public.Infrastructure.Services
{
    public class DocumentsReceptionService : IDocumentsReceptionService
    {
        private AISWebEntities Db { get; set; }
        public IRepository<WEB_REGISTERED_DOCUMENTS_V> RegisteredDocumentsRepo { get; set; }
        public IRepository<WEB_CASE_OFFICIAL_DOCUMENTS_V> OfficialDocumentsRepo { get; set; }
        public IRepository<WEB_SERVICE_TYPES_V> ServiceTypeRepo { get; set; }

        public DocumentsReceptionService(AISWebEntities context)
        {
            Db = context;
            RegisteredDocumentsRepo = new SQLRepository<WEB_REGISTERED_DOCUMENTS_V>(context);
            OfficialDocumentsRepo = new SQLRepository<WEB_CASE_OFFICIAL_DOCUMENTS_V>(context);
            ServiceTypeRepo = new SQLRepository<WEB_SERVICE_TYPES_V>(context);
        }

        public string LastRecievedDocumentXMLContent(string documentURI)
        {
            //Документ, иницииращ услуга, който има даденото УРИ
            WEB_REGISTERED_DOCUMENTS_V initDocument = RegisteredDocumentsRepo.FindSingle(reg_doc => reg_doc.URI == documentURI);

            int documentId = initDocument.ID;
            int documentTypeId = initDocument.DOCUMENT_TYPE_ID;

            //Всички документи в препискатa
            IQueryable<WEB_CASE_OFFICIAL_DOCUMENTS_V> allCaseDocuments 
                = OfficialDocumentsRepo.Find(c => c.INITIAL_DOCUMENT_ID == documentId);
            IQueryable<int?> allCaseDocumentsIds = allCaseDocuments.Select(d => d.DOCUMENT_ID);

            //Последно регистрирания документ от преписката, който има тип като на първоначалното заявление
            int lastRecievedDocumentContentId = 
                RegisteredDocumentsRepo.Find(reg_doc => allCaseDocumentsIds.Contains(reg_doc.ID) && reg_doc.DOCUMENT_TYPE_ID == documentTypeId)
                                       .OrderByDescending(reg_doc => reg_doc.REGISTERED_ON)
                                       .First().CONTENT_ID;

            string xmlContent = Db.WEB_GET_DOC_CONTENT(lastRecievedDocumentContentId).FirstOrDefault();

            return xmlContent;
        }

        public string GetXsdRootElementName(string documentURI)
        {
            //string rootElementName = ServiceTypeRepo.FindSingle(s => s.INIT_DOCUMENT_TYPE_URI == documentURI).ROOT_XSD_ELEMENT_NAME;
            int? serviceTypeId = RegisteredDocumentsRepo.FindSingle(reg_doc => reg_doc.URI == documentURI).SERVICE_TYPE_ID;
            string rootElementName = ServiceTypeRepo.FindSingle(s => s.ID == (int)serviceTypeId).ROOT_XSD_ELEMENT_NAME;
 
            return rootElementName;
        }

        public int GetServiceId(string documentURI)
        {
            int serviceId = RegisteredDocumentsRepo.FindSingle(reg_doc => reg_doc.URI == documentURI).ID;
            return serviceId;
        }
    }
}
