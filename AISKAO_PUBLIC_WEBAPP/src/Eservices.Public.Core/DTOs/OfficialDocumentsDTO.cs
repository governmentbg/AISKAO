using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TechnoLogica.Eservices.Public.Core.DTOs
{
    public class OfficialDocumentsDTO
    {
        public int DocumentId { get; set; }
        public string URI { get; set; }
        public string DocumentName { get; set; }
        public DateTime? DocumentCreatedOn { get; set; }
        public int? DocumentTypeId { get; set; }
        public int ContentId { get; set; }
        public int IsXMLDoc { get; set; }
        public string ContentMIMEType { get; set; }
      
    }
}
