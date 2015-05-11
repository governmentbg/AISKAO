using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechnoLogica.Eservices.Public.Core.Repositories;
using TechnoLogica.Eservices.Public.DataAccess;

namespace TechnoLogica.Eservices.Public.Core.IServices
{
    public interface IServiceService
    {
        IRepository<WEB_SRVC_TYPE_PUBLIC_INFO> ServiceTypePublicInfoRepo { get; set; }
        IRepository<WEB_SERVICE_TYPES_V> ServiceTypeRepo { get; set; }
        IRepository<WEB_SRVC_INF_BIT_TYPES> ServiceInfoBitTypes { get; set; }
        IRepository<WEB_SRVC_TYPE_INF_BITS> ServiceTypeInfoBits { get; set; }

        IQueryable<WEB_SRVC_TYPE_INF_BITS> GetServiceTypesInfo(int serviceId);
        IQueryable<WEB_SERVICE_TYPES_V> GetServices();
        WEB_SRVC_TYPE_PUBLIC_INFO GetServiceDetails(int serviceId);
        IQueryable<WEB_SERVICE_TYPES_V> ListServices(string serviceName);

    }
}
