using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechnoLogica.Eservices.Public.Core.DTOs;
using TechnoLogica.Eservices.Public.Core.Repositories;
using TechnoLogica.Eservices.Public.DataAccess;

namespace TechnoLogica.Eservices.Public.Core.IServices
{
    public interface IElectronicServiceService
    {
        IRepository<WEB_REGISTERED_DOCUMENTS_V> RegisteredDocumentsRepo { get; set; }
        IRepository<WEB_CASE_OFFICIAL_DOCUMENTS_V> OfficialDocumentsRepo { get; set; }
        IRepository<WEB_SERVICE_STAGES_V> ServiceStagesRepo { get; set; }

        IQueryable<WEB_E_SERVICE_STATUS_V> GetServiceStages(int serviceId);
        IQueryable<OfficialDocumentsDTO> GetOfficialDocuments(int initialDocumentId);

        string GetDocumentContent(int contentId);

        byte[] GetDocumentDownloadContent(int contentId, string docName, string mimeType, int isXml, out string fileType,
            out string encodedFileName);
    }
}
